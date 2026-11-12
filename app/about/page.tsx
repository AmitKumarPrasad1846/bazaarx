import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'About BazaarX · Direct Peer-to-Peer Marketplace',
  description: 'Learn about the philosophy, origins, and design ethos behind BazaarX.',
};

export default function AboutPage() {
  return (
    <div className="max-w-prose mx-auto px-4 sm:px-6 py-12 w-full space-y-8">
      <div className="space-y-3">
        <span className="text-micro font-semibold uppercase tracking-[0.06em] text-text-muted">
          Our Philosophy
        </span>
        <h1 className="text-h1 font-bold text-text font-heading">
          OLX&apos;s Utility, Linear&apos;s Design Precision
        </h1>
        <p className="text-base text-text-secondary leading-relaxed">
          BazaarX started as a student project to eliminate the clutter, advertising spam, and sketchy courier scams plaguing modern peer-to-peer marketplaces.
        </p>
      </div>

      <div className="h-px bg-border" />

      <div className="space-y-6 text-base text-text-secondary leading-relaxed">
        <h3 className="text-h3 font-semibold text-text font-heading">
          Why Direct In-Person Handovers Matter
        </h3>
        <p>
          Online marketplaces have grown increasingly complex. They impose heavy seller commission fees, force convoluted escrow schemes, and make sellers pack cardboard boxes for couriers that lose packages.
        </p>
        <p>
          Within university campuses and city neighborhoods, the person who needs your study table or used textbook lives 10 minutes away. By keeping the exchange strictly between buyer and seller, we restore trust, eliminate platform taxes, and protect both parties from parcel fraud.
        </p>

        <h3 className="text-h3 font-semibold text-text font-heading">
          Design Restraint Over Bloat
        </h3>
        <p>
          Every pixel in BazaarX has been crafted with the design discipline seen at Linear, Vercel, and Raycast. We don&apos;t use garish neon gradients, annoying popups, or fake urgency timers.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-text-secondary">
          <li><strong>Zero advertising banners:</strong> Your browsing flow is never interrupted by intrusive ads.</li>
          <li><strong>Instant interaction:</strong> Micro-animations strictly adhere to 100-300ms durations for snappy responsiveness.</li>
          <li><strong>Respect for accessibility:</strong> True WCAG AA contrast tokens across both daylight and obsidian dark modes.</li>
        </ul>
      </div>

      <div className="pt-6 border-t hairline-border flex gap-4">
        <Link href="/listings">
          <Button variant="primary" size="md">
            Explore Listings
          </Button>
        </Link>
        <Link href="/post">
          <Button variant="secondary" size="md">
            Post an Item
          </Button>
        </Link>
      </div>
    </div>
  );
}

