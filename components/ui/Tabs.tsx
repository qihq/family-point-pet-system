'use client';
import * as React from 'react';
import { cn } from './cn';

export function TabsPills({
  tabs,
  active,
  onChange,
  className=''
}:{
  tabs: string[];
  active: string;
  onChange: (t: string) => void;
  className?: string;
}){
  return (
    <div className={cn('flex rounded-lg bg-[var(--primary-50)] p-1 gap-1', className)}>
      {tabs.map(t => (
        <button key={t}
          onClick={()=>onChange(t)}
          className={cn('flex-1 py-2 text-sm rounded-md transition', active===t ? 'bg-[var(--primary-100)] text-[var(--text)] font-semibold' : 'text-[var(--muted)] hover:text-[var(--text)]')}
        >{t}</button>
      ))}
    </div>
  );
}
