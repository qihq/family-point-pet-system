"use client";
import { useEffect, useMemo, useRef, useState } from 'react';

export interface LevelBadgeProps {
  totalEarned: number;                // 总累计积分（用于进度）
  thresholds?: number[];              // 升级阈值：到达即升级，如 [100,300,600,1000]
  levelNames?: Record<number,string>; // 等级名映射（1 开始）
  onLevelUp?: (newLevel: number)=>void;
}

function calcLevel(total: number, ths: number[]) {
  let lvl = 1;
  for (let i = 0; i < ths.length; i++) if (total >= ths[i]) lvl = i + 2; else break;
  return lvl; // 1..N
}

export default function LevelBadge({ totalEarned, thresholds = [100,300,600,1000], levelNames, onLevelUp }: LevelBadgeProps){
  const names = levelNames || { 1:'新手', 2:'学徒', 3:'达人', 4:'高手', 5:'大师', 6:'宗师' };
  const [celebrate, setCelebrate] = useState(false);
  const prevLevelRef = useRef<number>(1);

  const { level, prev, next, percent } = useMemo(()=>{
    const lvl = calcLevel(totalEarned, thresholds);
    const idx = Math.max(0, Math.min(lvl - 2, thresholds.length - 1));
    const prevTh = lvl === 1 ? 0 : thresholds[lvl - 2];
    const nextTh = lvl - 1 < thresholds.length ? thresholds[lvl - 1] : Infinity;
    const span = isFinite(nextTh) ? (nextTh - prevTh) : 1;
    const prog = Math.max(0, Math.min(1, (totalEarned - prevTh) / (span || 1)));
    return { level: lvl, prev: prevTh, next: nextTh, percent: prog };
  },[totalEarned, thresholds]);

  useEffect(()=>{
    const old = prevLevelRef.current;
    if(level > old){
      setCelebrate(true);
      onLevelUp?.(level);
      const t = setTimeout(()=>setCelebrate(false), 1600);
      prevLevelRef.current = level;
      return ()=>clearTimeout(t);
    }
  },[level, onLevelUp]);

  return (
    <div className="relative w-full bg-white rounded-xl shadow p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--primary-100)] text-amber-700 font-bold">Lv.{level}</span>
          <div className="text-[var(--text)] font-semibold">{names[level] || `等级 ${level}`}</div>
        </div>
        <div className="text-sm text-[var(--muted)]">累计 {totalEarned} 分</div>
      </div>
      <div className="mt-3">
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div className="h-2 bg-[var(--primary-50)]0" style={{ width: `${Math.round(percent*100)}%` }} />
        </div>
        <div className="mt-1 text-xs text-gray-600 flex items-center justify-between">
          <span>Lv.{level}</span>
          <span>{isFinite(next)? `下一级还差 ${Math.max(0, next - totalEarned)} 分` : '已满级'}</span>
        </div>
      </div>

      {celebrate && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* 简单彩带粒子 */}
            {Array.from({length:18}).map((_,i)=> (
              <span key={i} className="absolute block w-2 h-2 rounded-full animate-[confetti_1.6s_ease-out_forwards]"
                style={{
                  left: `${(i*7)%100}%`,
                  top: '40%',
                  background: ["#F59E0B","#10B981","#3B82F6","#EF4444","#8B5CF6"][i%5],
                  transform: `translateY(-20px) rotate(${i*20}deg)`
                }} />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur text-amber-700 font-bold shadow animate-[pop_500ms_ease]">升级啦！</div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes confetti{ 0%{ opacity:0; transform: translateY(-20px) scale(0.8)} 10%{opacity:1} 100%{ opacity:0; transform: translateY(120px) scale(1)} }
        @keyframes pop{ 0%{ transform: scale(.8); opacity: 0 } 100%{ transform: scale(1); opacity: 1 } }
      `}</style>
    </div>
  );
}
