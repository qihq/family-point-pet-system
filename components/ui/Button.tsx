'use client';
import * as React from 'react';
import { cn } from './cn';

type Variant = 'default' | 'primary' | 'outline' | 'success' | 'warn' | 'danger';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const base = 'inline-flex items-center justify-center gap-2 rounded-xl border transition disabled:opacity-60 active:scale-[.98]';
const sizes: Record<Size, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-5 text-base',
};
const variants: Record<Variant, string> = {
  default: 'bg-white border-[var(--border)] text-[var(--text)] hover:bg-[var(--primary-50)]',
  primary: 'bg-[var(--primary)] border-[var(--primary)] text-white hover:bg-[var(--primary-600)]',
  outline: 'bg-transparent border-[var(--primary-100)] text-[var(--text)] hover:bg-[var(--primary-100)]',
  success: 'bg-[var(--color-success,#62C29B)] border-[var(--color-success,#62C29B)] text-white hover:brightness-105',
  warn: 'bg-[var(--color-warn,#E3A44D)] border-[var(--color-warn,#E3A44D)] text-white hover:brightness-105',
  danger: 'bg-[var(--color-error,#E07A73)] border-[var(--color-error,#E07A73)] text-white hover:brightness-105',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'default', size = 'md', fullWidth, ...props }, ref
) {
  return (
    <button ref={ref} className={cn(base, sizes[size], variants[variant], fullWidth && 'w-full', className)} {...props} />
  );
});
