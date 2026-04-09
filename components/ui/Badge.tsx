'use client';
import * as React from 'react';
import { cn } from './cn';

export function Badge({ children, className='' }: { children: React.ReactNode; className?: string }){
  return (
    <span className={cn('inline-flex items-center h-7 px-2.5 rounded-full text-sm border border-[var(--border)] bg-white', className)}>{children}</span>
  );
}
