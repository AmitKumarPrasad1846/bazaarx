import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

export function Logo({ className, showTagline }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn('inline-flex items-center gap-2 group select-none', className)}
      aria-label="BazaarX Home"
    >
      <div className="flex items-center">
        <span className="font-heading font-bold text-xl tracking-[-0.03em] text-text transition-colors">
          Bazaar
        </span>
        {/* Signature teal square X mark */}
        <span className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-[4px] bg-primary text-primary-foreground font-heading font-extrabold text-[12px] leading-none tracking-tight shadow-sm transition-transform duration-150 group-hover:scale-105">
          X
        </span>
      </div>
      {showTagline && (
        <span className="hidden sm:inline-block text-micro text-text-muted border-l hairline-border pl-2 uppercase tracking-wider">
          Peer-to-Peer
        </span>
      )}
    </Link>
  );
}

