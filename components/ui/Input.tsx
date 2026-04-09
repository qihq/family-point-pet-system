'use client';
import * as React from 'react';
import { cn } from './cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input({ className, ...props }, ref){
  return (
    <input ref={ref} className={cn('h-11 w-full rounded-xl border border-[var(--border)] bg-white px-3 text-[var(--text)] outline-none focus:ring-2 focus:ring-[var(--primary)]', className)} {...props} />
  );
});
