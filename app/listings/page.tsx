import { Suspense } from 'react';
import { Metadata } from 'next';
import { ListingsClient } from '@/components/listing/ListingsClient';
import { ProductCardSkeleton } from '@/components/listing/ProductCardSkeleton';

export const metadata: Metadata = {
  title: 'Browse Listings · BazaarX',
  description: 'Search and filter second-hand electronics, vehicles, furniture, and more near you.',
};

export default function ListingsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <div className="h-10 w-48 bg-surface-elevated rounded mb-6 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      }
    >
      <ListingsClient />
    </Suspense>
  );
}

