'use client';
import * as React from 'react';
import { cn } from './cn';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select({ className, ...props }, ref){
  return (
    <select ref={ref} className={cn('h-11 rounded-xl border border-[var(--border)] bg-white px-3 text-[var(--text)] outline-none focus:ring-2 focus:ring-[var(--primary)]', className)} {...props} />
  );
});
