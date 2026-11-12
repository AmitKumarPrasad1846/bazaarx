import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service · BazaarX',
  description: 'Terms of service and peer platform responsibilities on BazaarX.',
};

export default function TermsPage() {
  return (
    <div className="max-w-prose mx-auto px-4 sm:px-6 py-12 w-full space-y-8">
      <div className="space-y-3">
        <span className="text-micro font-semibold uppercase tracking-[0.06em] text-text-muted">
          Legal Agreement
        </span>
        <h1 className="text-h1 font-bold text-text font-heading">
          Terms of Service
        </h1>
        <p className="text-base text-text-secondary leading-relaxed">
          Last revised: November 2026. Please read these terms carefully before posting or buying on BazaarX.
        </p>
      </div>

      <div className="h-px bg-border" />

      <div className="space-y-6 text-base text-text-secondary leading-relaxed">
        <h3 className="text-h3 font-semibold text-text font-heading">
          1. Platform Disclaimer & Intermediary Role
        </h3>
        <p>
          BazaarX is strictly an informational peer discovery network. We are not an auctioneer, escrow service, shipping agent, or payment processor. We never take possession of any items, nor do we process, verify, or guarantee monetary transfers between users.
        </p>

        <h3 className="text-h3 font-semibold text-text font-heading">
          2. Physical Handover Requirement
        </h3>
        <p>
          All transactions must take place through direct in-person handovers. Buyers are solely responsible for inspecting products, testing electronics, verifying serial numbers, and confirming condition prior to completing payment.
        </p>

        <h3 className="text-h3 font-semibold text-text font-heading">
          3. Prohibited Items
        </h3>
        <p>
          Users may not list weapons, illegal substances, prescription medication, counterfeit trademarks, hazardous chemicals, stolen merchandise, or adult content. Violation results in immediate account suspension.
        </p>

        <h3 className="text-h3 font-semibold text-text font-heading">
          4. Limitation of Liability
        </h3>
        <p>
          Under no circumstances shall BazaarX, its student contributors, or maintainers be liable for disputes, counterfeit goods, lost items, or physical damages arising from offline peer meetups.
        </p>
      </div>
    </div>
  );
}

