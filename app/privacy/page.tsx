import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy · BazaarX',
  description: 'How BazaarX handles your local storage data and session credentials.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-prose mx-auto px-4 sm:px-6 py-12 w-full space-y-8">
      <div className="space-y-3">
        <span className="text-micro font-semibold uppercase tracking-[0.06em] text-text-muted">
          Your Data
        </span>
        <h1 className="text-h1 font-bold text-text font-heading">
          Privacy Policy
        </h1>
        <p className="text-base text-text-secondary leading-relaxed">
          At BazaarX, privacy is our baseline standard. We operate on a frontend-complete architecture that stores all your user data directly on your device.
        </p>
      </div>

      <div className="h-px bg-border" />

      <div className="space-y-6 text-base text-text-secondary leading-relaxed">
        <h3 className="text-h3 font-semibold text-text font-heading">
          1. Local-First Storage
        </h3>
        <p>
          Your authentication session, posted ads, saved wishlist items, and chat messages are persisted locally in your web browser&apos;s <code>localStorage</code>. They are never sold to data brokers or transmitted to third-party ad trackers.
        </p>

        <h3 className="text-h3 font-semibold text-text font-heading">
          2. No Analytics Tracking
        </h3>
        <p>
          We do not inject invasive Google Analytics or Facebook Pixel tracking scripts into our pages. Your browsing history across electronics, bikes, and furniture remains private to your machine.
        </p>

        <h3 className="text-h3 font-semibold text-text font-heading">
          3. Clearing Your Data
        </h3>
        <p>
          You have complete ownership over your data. Simply clearing your browser cache or localStorage instantly purges all saved listings, chat threads, and mock sessions from your device.
        </p>
      </div>
    </div>
  );
}

