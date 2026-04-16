"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

(GLTFLoader as any).setMeshoptDecoder && (GLTFLoader as any).setMeshoptDecoder(MeshoptDecoder);
try {
  (globalThis as any).MeshoptDecoder = MeshoptDecoder;
} catch {}

export type PetActionName = "feed" | "water" | "clean" | "play" | undefined;

export interface Pet3DProps {
  name?: string;
  mood?: number;
  health?: number;
  hunger?: number;
  stage?: "egg" | "baby" | "growth" | "final";
  action?: PetActionName;
  childId?: string;
  modelPath?: string;
  scaleFactor?: number;
}

function PetBody({ color, action }: { color: THREE.ColorRepresentation; action?: PetActionName }) {
  const group = useRef<THREE.Group>(null!);
  const remaining = useRef(0);

  useFrame((_state, delta) => {
    if (!group.current) return;
    if (remaining.current > 0) {
      remaining.current = Math.max(0, remaining.current - delta);
      const progress = remaining.current;
      switch (action) {
        case "feed":
          group.current.position.y = 0.2 * Math.sin((1 - progress) * Math.PI * 4) * progress;
          break;
        case "water":
          group.current.rotation.z = 0.15 * Math.sin((1 - progress) * Math.PI * 5) * progress;
          break;
        case "clean":
          group.current.rotation.y += 2.5 * progress * delta * 10;
          break;
        case "play":
          group.current.position.x = 0.12 * Math.sin((1 - progress) * Math.PI * 2) * progress;
          group.current.rotation.x = 0.08 * Math.sin((1 - progress) * Math.PI * 2) * progress;
          break;
      }
      return;
    }

    group.current.position.y *= 0.9;
    group.current.rotation.z *= 0.9;
    group.current.position.x *= 0.9;
    group.current.rotation.x *= 0.9;
    const scale = group.current.scale.x;
    if (Math.abs(scale - 1) > 0.001) {
      const next = THREE.MathUtils.lerp(scale, 1, 0.2);
      group.current.scale.setScalar(next);
    }
  });

  useEffect(() => {
    if (action) remaining.current = 1;
  }, [action]);

  return (
    <group ref={group}>
      <mesh castShadow receiveShadow position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
      </mesh>
      <mesh castShadow position={[-0.35, 1.1, 0]} rotation={[0, 0, Math.PI / 6]}>
        <coneGeometry args={[0.12, 0.25, 12]} />
        <meshStandardMaterial color="#fff1b3" />
      </mesh>
      <mesh castShadow position={[0.35, 1.1, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <coneGeometry args={[0.12, 0.25, 12]} />
        <meshStandardMaterial color="#fff1b3" />
      </mesh>
      <mesh position={[-0.18, 0.75, 0.5]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[0.18, 0.75, 0.5]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[0, 0.55, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.09, 0.02, 12, 24]} />
        <meshStandardMaterial color="#ffb4b4" />
      </mesh>
    </group>
  );
}

function useGLTFCompressed(src: string) {
  const gl = useThree((state) => state.gl);
  return useLoader(GLTFLoader as any, src, (loader: any) => {
    const draco = new DRACOLoader();
    draco.setDecoderPath("/vendor/draco/gltf/");
    loader.setDRACOLoader(draco);

    try {
      const ktx2 = new KTX2Loader();
      ktx2.setTranscoderPath("/vendor/basis/");
      ktx2.detectSupport(gl);
      loader.setKTX2Loader?.(ktx2);
    } catch {}

    try {
      loader.setMeshoptDecoder(MeshoptDecoder);
    } catch {}
  }) as any;
}

function Model({ src, scale = 1 }: { src: string; scale?: number }) {
  const group = useRef<THREE.Group>(null!);
  const { scene } = useGLTFCompressed(src);

  useEffect(() => {
    if (group.current) group.current.scale.setScalar(scale);
  }, [scale]);

  return <primitive ref={group as any} object={scene} />;
}

export function Pet3D({ mood = 80, action, childId, modelPath, scaleFactor = 1 }: Pet3DProps) {
  const color = useMemo(() => new THREE.Color().setHSL(0.1 + (mood / 100) * 0.1, 0.6, 0.6), [mood]);
  const [srcLite, setSrcLite] = useState<string | null>(null);
  const [srcHD, setSrcHD] = useState<string | null>(null);
  const [useHD, setUseHD] = useState(false);
  const [envReady, setEnvReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function probe(url: string) {
      try {
        const response = await fetch(url, { method: "HEAD", cache: "no-cache" });
        return response.ok;
      } catch {
        return false;
      }
    }

    async function pick(candidates: string[]) {
      for (const candidate of candidates) {
        if (await probe(candidate)) return candidate;
      }
      return null;
    }

    (async () => {
      const hdCandidates = [
        ...(modelPath ? [modelPath] : []),
        ...(childId ? [`/uploads/pets/${childId}.glb`, `/models/pets/${childId}.glb`] : []),
        "/models/pet.glb",
      ];
      const liteCandidates = [
        ...(modelPath ? [modelPath.replace(/\.glb$/i, ".lite.glb")] : []),
        ...(childId ? [`/uploads/pets/${childId}-lite.glb`, `/models/pets/${childId}-lite.glb`] : []),
        "/models/pet-lite.glb",
      ];

      const lite = await pick(liteCandidates);
      const hd = await pick(hdCandidates);
      if (cancelled) return;

      setSrcLite(lite);
      setSrcHD(hd || "/models/pet.glb");
      if (hd) {
        const swap = () => setUseHD(true);
        if ("requestIdleCallback" in window) (window as any).requestIdleCallback(() => setTimeout(swap, 100));
        else setTimeout(swap, 400);
      }
      setTimeout(() => setEnvReady(true), 600);
    })();

    return () => {
      cancelled = true;
    };
  }, [childId, modelPath]);

  return (
    <Canvas dpr={[1, 1.25]} gl={{ antialias: false, powerPreference: "low-power" }} camera={{ position: [2.2, 1.6, 2.2], fov: 45 }} style={{ height: 360, borderRadius: 12 }}>
      <ambientLight intensity={0.7} />
      <directionalLight castShadow intensity={0.9} position={[2, 3, 2]} />
      <Suspense fallback={<PetBody color={color} action={action} />}>
        {useHD && srcHD ? <Model src={srcHD} scale={scaleFactor} /> : srcLite ? <Model src={srcLite} scale={scaleFactor * 0.98} /> : <PetBody color={color} action={action} />}
      </Suspense>
      {envReady ? <OrbitControls enablePan={false} enableDamping autoRotate={false} minDistance={1.6} maxDistance={4.2} /> : null}
    </Canvas>
  );
}
