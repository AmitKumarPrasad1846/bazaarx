'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { Listing } from '@/data/listings';
import { formatPrice, formatTimeAgo } from '@/lib/format';
import { useListingsStore } from '@/lib/store/listingsStore';
import { PaymentBadge } from '@/components/ui/PaymentBadge';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  listing: Listing;
  className?: string;
  priority?: boolean;
}

export function ProductCard({ listing, className, priority = false }: ProductCardProps) {
  const { isSaved, toggleSave } = useListingsStore();
  const [mounted, setMounted] = React.useState(false);
  const [imgError, setImgError] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const saved = mounted ? isSaved(listing.id) : false;

  const handleHeartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const nowSaved = toggleSave(listing.id);
    if (nowSaved) {
      toast.success('Listing saved to your wishlist', {
        description: listing.title,
      });
    } else {
      toast('Listing removed from wishlist', {
        description: listing.title,
      });
    }
  };

  return (
    <div
      className={cn(
        'group relative flex flex-col rounded-card border hairline-border bg-surface overflow-hidden transition-all duration-150',
        'hover:-translate-y-0.5 hover:shadow-subtle-hover hover:border-border-strong',
        className
      )}
    >
      {/* 4:3 Image Container */}
      <Link href={`/product/${listing.id}`} className="relative aspect-[4/3] w-full overflow-hidden bg-surface-elevated">
        {!imgError ? (
          <Image
            src={listing.images[0]}
            alt={listing.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-text-muted bg-surface-elevated">
            <span className="text-micro font-medium uppercase tracking-wider">{listing.category}</span>
          </div>
        )}

        {/* Top-Left Tag: SELL / RENT */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <Badge
            variant={listing.listingType === 'rent' ? 'accent' : 'primary'}
            className="shadow-sm font-semibold tracking-wider text-[10px]"
          >
            {listing.listingType.toUpperCase()}
          </Badge>
        </div>

        {/* Top-Right Heart / Save Button */}
        <button
          type="button"
          onClick={handleHeartClick}
          aria-pressed={saved}
          aria-label={saved ? 'Remove from saved' : 'Save listing'}
          className={cn(
            'absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150',
            'backdrop-blur-md focus-ring',
            saved
              ? 'bg-danger text-white shadow-sm'
              : 'bg-black/40 text-white/90 hover:bg-black/60 hover:text-white'
          )}
        >
          <Heart
            className={cn('w-4 h-4 transition-transform duration-150', saved && 'fill-current scale-110')}
            strokeWidth={2}
          />
        </button>

        {listing.status === 'sold' && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center z-10">
            <span className="px-3 py-1 bg-surface text-text font-bold text-small uppercase tracking-wider rounded-[4px] shadow">
              Sold Out
            </span>
          </div>
        )}
      </Link>

      {/* Content Area */}
      <div className="flex flex-1 flex-col p-4 justify-between">
        <div>
          {/* Price & Payment Badge */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-h3 font-semibold text-text tabular-nums font-heading">
              {formatPrice(
                listing.listingType === 'rent' && listing.rentPerDay ? listing.rentPerDay : listing.price,
                listing.listingType === 'rent'
              )}
            </span>
            <PaymentBadge mode={listing.paymentMode} />
          </div>

          {/* Title (2-line clamp) */}
          <Link href={`/product/${listing.id}`} className="block focus-ring rounded-[2px]">
            <h3 className="text-base font-medium text-text line-clamp-2 hover:text-primary transition-colors leading-snug">
              {listing.title}
            </h3>
          </Link>
        </div>

        {/* Footer: City + Time Ago */}
        <div className="mt-3 pt-3 border-t hairline-border flex items-center justify-between text-small text-text-muted">
          <span className="flex items-center gap-1 truncate max-w-[55%]">
            <MapPin className="w-3.5 h-3.5 shrink-0 stroke-[1.5]" />
            <span className="truncate">{listing.city} · {listing.area}</span>
          </span>
          <span className="flex items-center gap-1 shrink-0 text-micro">
            <Clock className="w-3 h-3 stroke-[1.5]" />
            <span>{mounted ? formatTimeAgo(listing.createdAt) : 'recently'}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-card border hairline-border bg-surface overflow-hidden animate-pulse">
      <div className="aspect-[4/3] w-full bg-surface-elevated" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-5 w-24 bg-surface-elevated rounded" />
          <div className="h-4 w-14 bg-surface-elevated rounded" />
        </div>
        <div className="space-y-1.5">
          <div className="h-4 w-full bg-surface-elevated rounded" />
          <div className="h-4 w-2/3 bg-surface-elevated rounded" />
        </div>
        <div className="pt-3 border-t hairline-border flex justify-between">
          <div className="h-3.5 w-28 bg-surface-elevated rounded" />
          <div className="h-3.5 w-16 bg-surface-elevated rounded" />
        </div>
      </div>
    </div>
  );
}

