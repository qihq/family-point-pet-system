'use client';
import * as React from 'react';
import { cn } from './cn';

export function Card({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-4', className)}>{children}</div>
  );
}

export function CardTitle({ children, className='' }: { children: React.ReactNode; className?: string }){
  return <div className={cn('font-semibold mb-2', className)}>{children}</div>;
}

export function CardMeta({ children, className='' }: { children: React.ReactNode; className?: string }){
  return <div className={cn('text-sm text-[var(--muted)]', className)}>{children}</div>;
}
