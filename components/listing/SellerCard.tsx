import * as React from 'react';
import Link from 'next/link';
import { Star, ShieldCheck, Clock, ArrowRight } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { USERS } from '@/data/users';

interface SellerCardProps {
  sellerId: string;
  sellerName: string;
}

export function SellerCard({ sellerId, sellerName }: SellerCardProps) {
  const profile = USERS[sellerId] || {
    id: sellerId,
    name: sellerName,
    memberSince: 'Jan 2024',
    rating: 4.9,
    reviewCount: 22,
    responseTime: 'within 30 mins',
    verified: true,
    city: 'India',
    bio: 'Verified BazaarX marketplace member.',
  };

  return (
    <div className="rounded-card border hairline-border bg-surface p-5 space-y-4 shadow-subtle">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={profile.name} size="lg" status="online" />
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-base font-semibold text-text font-heading">
                {profile.name}
              </h4>
              {profile.verified && (
                <ShieldCheck className="w-4 h-4 text-primary stroke-[1.5]" />
              )}
            </div>
            <p className="text-small text-text-muted">
              Member since {profile.memberSince}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 px-2 py-1 rounded-[4px] bg-accent/10 text-accent-foreground dark:text-accent font-semibold text-small tabular-nums">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>{profile.rating.toFixed(1)}</span>
          <span className="text-micro text-text-muted font-normal">({profile.reviewCount})</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-small text-text-secondary">
        <Clock className="w-4 h-4 text-text-muted stroke-[1.5]" />
        <span>Typically replies {profile.responseTime}</span>
      </div>

      {profile.bio && (
        <p className="text-small text-text-muted line-clamp-2 italic">
          &ldquo;{profile.bio}&rdquo;
        </p>
      )}

      <div className="pt-2 border-t hairline-border">
        <Link
          href={`/listings?q=${encodeURIComponent(profile.name)}`}
          className="text-small font-medium text-primary hover:text-primary-hover flex items-center justify-between group"
        >
          <span>View all ads by this seller</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

