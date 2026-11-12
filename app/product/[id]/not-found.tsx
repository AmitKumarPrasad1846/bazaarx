import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ShoppingBag } from 'lucide-react';

export default function ProductNotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center my-16">
      <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
        <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
      </div>
      <h2 className="text-h2 font-bold text-text font-heading">
        Listing Not Found
      </h2>
      <p className="text-base text-text-secondary max-w-md mt-2 mb-6">
        This listing may have been sold, deleted by the seller, or the URL link is invalid.
      </p>
      <Link href="/listings">
        <Button variant="primary" size="md">
          Browse Active Marketplace Ads
        </Button>
      </Link>
    </div>
  );
}

