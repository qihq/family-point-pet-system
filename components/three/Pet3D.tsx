"use client";

import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
// Ensure Meshopt is registered globally for this module version
(GLTFLoader as any).setMeshoptDecoder && (GLTFLoader as any).setMeshoptDecoder(MeshoptDecoder); try{ (globalThis as any).MeshoptDecoder = MeshoptDecoder; }catch{}

export type PetActionName = 'feed' | 'water' | 'clean' | 'play' | undefined;

export interface Pet3DProps {
  name?: string;
  mood?: number;
  health?: number;
  hunger?: number;
  stage?: 'egg'|'baby'|'growth'|'final';
  action?: PetActionName;
  childId?: string;
  modelPath?: string;
  scaleFactor?: number;
}

function PetBody({ color, action }: { color: THREE.ColorRepresentation; action?: PetActionName }) {
  const group = useRef<THREE.Group>(null!);
  const tRef = useRef(0);
  useFrame((_s, dt)=>{
    if(!group.current) return;
    if (tRef.current > 0) {
      tRef.current = Math.max(0, tRef.current - dt);
      const k = tRef.current;
      switch(action){
        case 'feed': group.current.position.y = 0.2 * Math.sin((1-k) * Math.PI * 4) * k; break;
        case 'water': group.current.rotation.z = 0.15 * Math.sin((1-k) * Math.PI * 5) * k; break;
        case 'clean': group.current.rotation.y += 2.5 * k * dt * 10; break;
        case 'play': {
          const sway = 0.12 * Math.sin((1 - k) * Math.PI * 2) * k;
          group.current.position.x = sway;
          group.current.rotation.x = 0.08 * Math.sin((1 - k) * Math.PI * 2) * k;
          break;
        }
      }
    } else {
      group.current.position.y *= 0.9;
      group.current.rotation.z *= 0.9;
      group.current.position.x *= 0.9;
      group.current.rotation.x *= 0.9;
      const s = group.current.scale.x;
      if (Math.abs(s-1) > 0.001) {
        const ns = THREE.MathUtils.lerp(s, 1, 0.2); group.current.scale.setScalar(ns);
      }
    }
  });
  useEffect(()=>{ if(action){ tRef.current = 1; } }, [action]);
  return (
    <group ref={group}>
      <mesh castShadow receiveShadow position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
      </mesh>
      <mesh castShadow position={[-0.35, 1.1, 0]} rotation={[0,0,Math.PI/6]}>
        <coneGeometry args={[0.12, 0.25, 12]} />
        <meshStandardMaterial color={'#fff1b3'} />
      </mesh>
      <mesh castShadow position={[0.35, 1.1, 0]} rotation={[0,0,-Math.PI/6]}>
        <coneGeometry args={[0.12, 0.25, 12]} />
        <meshStandardMaterial color={'#fff1b3'} />
      </mesh>
      <mesh position={[-0.18, 0.75, 0.5]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={'#222'} />
      </mesh>
      <mesh position={[0.18, 0.75, 0.5]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color={'#222'} />
      </mesh>
      <mesh position={[0, 0.55, 0.6]} rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[0.09, 0.02, 12, 24]} />
        <meshStandardMaterial color={'#ffb4b4'} />
      </mesh>
    </group>
  );
}

function useGLTFCompressed(src: string): GLTF {
  const gl = useThree((s)=> s.gl);
  return useLoader(GLTFLoader, src, (loader: GLTFLoader)=>{
    const draco = new DRACOLoader();
    draco.setDecoderPath('/vendor/draco/gltf/');
    loader.setDRACOLoader(draco);
    try{
      const ktx2 = new KTX2Loader();
      ktx2.setTranscoderPath('/vendor/basis/');
      ktx2.detectSupport(gl);
      (loader as any).setKTX2Loader && (loader as any).setKTX2Loader(ktx2);
    }catch{}
    // Meshopt（gltfpack 默认几何压缩）
    try{ loader.setMeshoptDecoder(MeshoptDecoder); }catch{}
  });
}

function Model({ src, scale=1 }: { src: string; scale?: number }){
  const group = useRef<THREE.Group>(null!);
  const { scene } = useGLTFCompressed(src);
  useEffect(()=>{ if(group.current){ group.current.scale.setScalar(scale); } },[scale]);
  return <primitive ref={group as any} object={scene} />
}

export function Pet3D({ name, mood=80, health=80, hunger=80, stage='baby', action, childId, modelPath, scaleFactor=1 }: Pet3DProps){
  const color = useMemo(()=> new THREE.Color().setHSL(0.1 + (mood/100)*0.1, 0.6, 0.6), [mood]);
  const [srcLite, setSrcLite] = useState<string | null>(null);
  const [srcHD, setSrcHD] = useState<string | null>(null);
  const [useHD, setUseHD] = useState(false);
  const [envReady, setEnvReady] = useState(false);

  useEffect(()=>{
    let cancelled = false;
    async function probe(url: string){ try{ const r = await fetch(url, { method:'HEAD', cache:'no-cache' }); return r.ok; } catch { return false; } }
    (async()=>{
      // 候选路径（优先 uploads → 兼容旧 models/pets → 默认）
      const hdCandidates = [
        ...(modelPath? [modelPath] : []),
        ...(childId? [`/uploads/pets/${childId}.glb`, `/models/pets/${childId}.glb`] : []),
        '/models/pet.glb',
      ];
      const liteCandidates = [
        ...(modelPath? [modelPath.replace(/\.glb$/i, '.lite.glb')] : []),
        ...(childId? [`/uploads/pets/${childId}-lite.glb`, `/models/pets/${childId}-lite.glb`] : []),
        '/models/pet-lite.glb'
      ];
      async function pick(arr:string[]){ for(const u of arr){ if(await probe(u)) return u; } return null; }
      const lite = await pick(liteCandidates);
      const hd = await pick(hdCandidates);
      if(cancelled) return;
      setSrcLite(lite);
      setSrcHD(hd||'/models/pet.glb');
      if(hd){
        const swap = ()=> setUseHD(true);
        if('requestIdleCallback' in window){ (window as any).requestIdleCallback(()=> setTimeout(swap, 100)); }
        else { setTimeout(swap, 400); }
      }
      setTimeout(()=> setEnvReady(true), 600);
    })();
    return ()=>{ cancelled = true; };
  },[childId, modelPath]);

  return (
    <Canvas dpr={[1,1.25]} gl={{ antialias:false, powerPreference:'low-power' }} camera={{ position: [2.2, 1.6, 2.2], fov: 45 }} style={{ height: 360, borderRadius: 12 }}>
      <ambientLight intensity={0.7} />
      <directionalLight castShadow intensity={0.9} position={[2, 3, 2]} />
      <Suspense fallback={<PetBody color={color} action={action} />}>
        {useHD && srcHD ? <Model src={srcHD} scale={scaleFactor} /> : (srcLite? <Model src={srcLite} scale={scaleFactor*0.98} /> : <PetBody color={color} action={action} />)}
      </Suspense>
      {envReady && <OrbitControls enablePan={false} enableDamping={true} autoRotate={false} minDistance={1.6} maxDistance={4.2} />}
    </Canvas>
  );
}

// 预加载默认模型（若存在）
//@ts-ignore
try { /* loaders cache by URL; no-op */ } catch {}


