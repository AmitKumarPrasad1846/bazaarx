import * as React from 'react';
import { Banknote, Smartphone, ArrowLeftRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type PaymentMode = 'cash' | 'online' | 'both';

interface PaymentBadgeProps {
  mode: PaymentMode;
  className?: string;
}

export function PaymentBadge({ mode, className }: PaymentBadgeProps) {
  const configs = {
    cash: {
      label: 'Cash',
      icon: Banknote,
      classes: 'bg-success/10 text-success border-success/20',
    },
    online: {
      label: 'Online',
      icon: Smartphone,
      classes: 'bg-info/10 text-info border-info/20',
    },
    both: {
      label: 'Both',
      icon: ArrowLeftRight,
      classes: 'bg-surface text-text-secondary border-border',
    },
  };

  const config = configs[mode] || configs.both;
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[4px] border text-[11px] font-medium tracking-[0.05em] uppercase select-none',
        config.classes,
        className
      )}
    >
      <Icon className="w-3 h-3 stroke-[1.5]" />
      <span>{config.label}</span>
    </span>
  );
}

