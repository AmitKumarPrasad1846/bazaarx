import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, MapPin, Eye, Clock, Users, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Safety & Verification Guidelines · BazaarX',
  description: 'Essential guidelines for safe in-person handovers and scams prevention on BazaarX.',
};

export default function SafetyPage() {
  return (
    <div className="max-w-prose mx-auto px-4 sm:px-6 py-12 w-full space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] bg-primary/10 text-primary text-micro font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 stroke-[2]" />
          <span>Trust & Verification</span>
        </div>
        <h1 className="text-h1 font-bold text-text font-heading">
          Safe In-Person Handover Guidelines
        </h1>
        <p className="text-base text-text-secondary leading-relaxed">
          BazaarX exists to connect students and local neighbors directly. Because our platform never touches your money or provides shipping, these physical safety rules ensure every transaction remains 100% scam-free.
        </p>
      </div>

      <div className="h-px bg-border" />

      {/* Core Rules */}
      <div className="space-y-6">
        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-input bg-surface-elevated border hairline-border flex items-center justify-center text-primary shrink-0">
            <MapPin className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-h3 font-semibold text-text font-heading">
              1. Choose Busy, Well-Lit Public Spaces
            </h3>
            <p className="text-base text-text-secondary leading-relaxed">
              Never invite strangers to your private hostel room or secluded house for high-value exchanges. Always agree on crowded campus cafeterias, student union hubs, metro station gates, or popular coffee shops.
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-input bg-surface-elevated border hairline-border flex items-center justify-center text-primary shrink-0">
            <Clock className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-h3 font-semibold text-text font-heading">
              2. Inspect During Daylight Hours
            </h3>
            <p className="text-base text-text-secondary leading-relaxed">
              Schedule meetings during natural daylight. Scratches on camera lenses, dead pixels on laptop screens, hairline fractures on bike frames, and fabric tears are easy to miss in dim evening lighting.
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-input bg-surface-elevated border hairline-border flex items-center justify-center text-primary shrink-0">
            <Eye className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-h3 font-semibold text-text font-heading">
              3. Verify Working Condition Before Any Payment
            </h3>
            <p className="text-base text-text-secondary leading-relaxed">
              Turn on smartphones and check IMEI, test Wi-Fi connectivity, check Apple battery health, and test camera autofocus. Never scan a UPI QR code or hand over cash until you are fully satisfied with the physical condition.
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-input bg-surface-elevated border hairline-border flex items-center justify-center text-primary shrink-0">
            <Users className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-h3 font-semibold text-text font-heading">
              4. Bring a Peer Along
            </h3>
            <p className="text-base text-text-secondary leading-relaxed">
              If you are buying or selling expensive gadgets (MacBooks, DSLR cameras, motorcycles), bring a friend or classmate along. Two pairs of eyes are always better when checking item specifics.
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-start">
          <div className="w-10 h-10 rounded-input bg-danger/10 border border-danger/20 flex items-center justify-center text-danger shrink-0">
            <AlertTriangle className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-h3 font-semibold text-danger font-heading">
              5. The Golden Rule: Zero Advance Payments
            </h3>
            <p className="text-base text-text-secondary leading-relaxed">
              If a buyer or seller asks you to pay an &ldquo;advance reservation token&rdquo;, claims an &ldquo;army courier courier charge&rdquo;, or asks you to enter your UPI PIN to &ldquo;receive money&rdquo;, it is always a scam. Stop communicating and report the user immediately.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-card border hairline-border bg-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-semibold text-text">Found a suspicious listing?</h4>
          <p className="text-small text-text-muted">Our community moderation team reviews all flagged items.</p>
        </div>
        <Link href="/listings">
          <Button variant="secondary" size="md">
            Return to Marketplace
          </Button>
        </Link>
      </div>
    </div>
  );
}

