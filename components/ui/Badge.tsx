import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'danger' | 'outline' | 'muted';
}

export function Badge({ className, variant = 'secondary', ...props }: BadgeProps) {
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground border-transparent',
    secondary: 'bg-surface border-border text-text-secondary',
    accent: 'bg-accent/15 text-accent-foreground dark:text-accent border-accent/20',
    success: 'bg-success/10 text-success border-success/20',
    danger: 'bg-danger/10 text-danger border-danger/20',
    outline: 'border-border text-text bg-transparent',
    muted: 'bg-surface-elevated text-text-muted border-border',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-[4px] border text-[11px] font-medium tracking-[0.05em] uppercase select-none transition-colors',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

