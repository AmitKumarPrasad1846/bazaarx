import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center my-16">
      <div className="w-16 h-16 rounded-full bg-surface-elevated border hairline-border flex items-center justify-center text-primary mb-4 shadow-subtle">
        <Compass className="w-8 h-8 stroke-[1.5]" />
      </div>
      <h1 className="text-h1 font-bold text-text font-heading">
        404 · Page Not Found
      </h1>
      <p className="text-base text-text-secondary max-w-md mt-2 mb-6 leading-relaxed">
        The link you followed may be broken, expired, or the page may have been moved to another location.
      </p>
      <div className="flex gap-3">
        <Link href="/">
          <Button variant="primary" size="md">
            Go to Home
          </Button>
        </Link>
        <Link href="/listings">
          <Button variant="secondary" size="md">
            Browse Listings
          </Button>
        </Link>
      </div>
    </div>
  );
}

