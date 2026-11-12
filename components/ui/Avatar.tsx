import * as React from 'react';
import Image from 'next/image';
import { cn, getAvatarColor, getInitials } from '@/lib/utils';

interface AvatarProps {
  name: string;
  image?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  status?: 'online' | 'offline' | 'away';
}

export function Avatar({ name, image, size = 'md', className, status }: AvatarProps) {
  const sizeMap = {
    sm: 'w-7 h-7 text-[11px]',
    md: 'w-9 h-9 text-[13px]',
    lg: 'w-11 h-11 text-base',
    xl: 'w-16 h-16 text-h3',
  };

  const statusSizeMap = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-3.5 h-3.5',
  };

  const colorClass = getAvatarColor(name);
  const initials = getInitials(name);

  return (
    <div className={cn('relative inline-flex flex-shrink-0 select-none', className)}>
      <div
        className={cn(
          'rounded-full overflow-hidden flex items-center justify-center font-medium font-heading border hairline-border',
          sizeMap[size],
          !image && colorClass
        )}
      >
        {image ? (
          <Image
            src={image}
            alt={name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full ring-2 ring-bg',
            statusSizeMap[size],
            status === 'online' && 'bg-success',
            status === 'offline' && 'bg-text-muted',
            status === 'away' && 'bg-accent'
          )}
        />
      )}
    </div>
  );
}

