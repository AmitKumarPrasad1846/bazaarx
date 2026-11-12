'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface SegmentOption<T extends string = string> {
  id: T;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

interface SegmentedControlProps<T extends string = string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  name?: string;
}

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  className,
  name = 'segmented-control',
}: SegmentedControlProps<T>) {
  return (
    <div
      role="tablist"
      className={cn(
        'relative inline-flex p-1 bg-surface border hairline-border rounded-input select-none items-center',
        className
      )}
    >
      {options.map((option) => {
        const isSelected = option.id === value;
        return (
          <button
            key={option.id}
            role="tab"
            type="button"
            aria-selected={isSelected}
            onClick={() => onChange(option.id)}
            className={cn(
              'relative z-10 px-3 py-1.5 text-small font-medium transition-colors duration-150 flex items-center gap-1.5 rounded-[4px]',
              isSelected ? 'text-text' : 'text-text-muted hover:text-text'
            )}
          >
            {isSelected && (
              <motion.div
                layoutId={`segment-active-${name}`}
                className="absolute inset-0 bg-surface-elevated border hairline-border rounded-[4px] shadow-subtle -z-10"
                transition={{
                  type: 'spring',
                  stiffness: 450,
                  damping: 35,
                  duration: 0.2,
                }}
              />
            )}
            {option.icon && <span className="w-3.5 h-3.5 flex items-center">{option.icon}</span>}
            <span>{option.label}</span>
            {typeof option.count === 'number' && (
              <span
                className={cn(
                  'text-[11px] px-1.5 py-0.2 rounded-[4px] tabular-nums',
                  isSelected ? 'bg-primary/10 text-primary' : 'bg-surface border hairline-border text-text-muted'
                )}
              >
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

