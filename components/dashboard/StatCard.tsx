'use client';

import * as React from 'react';
import { useReducedMotion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
  colorClass?: string;
}

export function StatCard({
  label,
  value,
  suffix = '',
  icon: Icon,
  colorClass = 'text-primary',
}: StatCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = React.useState(shouldReduceMotion ? value : 0);

  React.useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    let start = 0;
    const duration = 200; // 200ms
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = value / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, shouldReduceMotion]);

  return (
    <div className="rounded-card border hairline-border bg-surface p-5 shadow-subtle flex items-center justify-between">
      <div className="space-y-1">
        <span className="text-micro font-medium uppercase tracking-wider text-text-muted">
          {label}
        </span>
        <div className="text-h1 font-bold text-text tabular-nums font-heading">
          {displayValue.toLocaleString('en-IN')}
          {suffix}
        </div>
      </div>
      <div
        className={cn(
          'w-12 h-12 rounded-input bg-surface-elevated border hairline-border flex items-center justify-center shrink-0',
          colorClass
        )}
      >
        <Icon className="w-5 h-5 stroke-[1.5]" />
      </div>
    </div>
  );
}

