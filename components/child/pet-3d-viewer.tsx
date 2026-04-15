"use client";

import { useMemo } from 'react';
import { Pet3D } from '@/components/three/Pet3D';

export default function Pet3DViewer({ pet, action }: { pet: any; action?: 'feed'|'water'|'clean'|'play' }) {
  const mood = useMemo(()=> pet?.mood ?? 80, [pet]);
  const health = useMemo(()=> pet?.health ?? 80, [pet]);
  const hunger = useMemo(()=> pet?.hunger ?? 80, [pet]);
  const stage = useMemo(()=> pet?.stage ?? 'baby', [pet]);
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="text-sm text-[var(--muted)] mb-2">3D 预览（原型）</div>
      <Pet3D name={pet?.name} mood={mood} health={health} hunger={hunger} stage={stage} action={action} childId={pet?.childId} />
    </div>
  );
}