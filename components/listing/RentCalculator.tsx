'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/format';
import { useChatStore } from '@/lib/store/chatStore';
import { toast } from 'sonner';

interface RentCalculatorProps {
  listingId: string;
  listingTitle: string;
  rentPerDay: number;
  sellerId: string;
  sellerName: string;
}

export function RentCalculator({
  listingId,
  listingTitle,
  rentPerDay,
  sellerId,
  sellerName,
}: RentCalculatorProps) {
  const router = useRouter();
  const { getOrCreateConversationForListing, sendMessage } = useChatStore();

  // Simple start and end date defaults (today + 3 days)
  const today = new Date().toISOString().split('T')[0];
  const nextThreeDays = new Date(Date.now() + 3 * 86400 * 1000).toISOString().split('T')[0];

  const [startDate, setStartDate] = React.useState(today);
  const [endDate, setEndDate] = React.useState(nextThreeDays);

  const days = React.useMemo(() => {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const diff = Math.ceil((end - start) / (1000 * 3600 * 24));
    return diff > 0 ? diff : 1;
  }, [startDate, endDate]);

  const total = days * rentPerDay;

  const handleRequestRent = () => {
    const conv = getOrCreateConversationForListing(listingId, sellerId, sellerName);
    const rentMessage = `Rental Inquiry: Interested in renting "${listingTitle}" from ${startDate} to ${endDate} (${days} days). Estimated total: ${formatPrice(
      total
    )}. Can we meet to inspect and confirm?`;

    sendMessage(conv.id, rentMessage);
    toast.success('Rental inquiry sent to seller!', {
      description: `${days} days (${formatPrice(total)})`,
    });
    router.push(`/chat?listing=${listingId}`);
  };

  return (
    <div className="rounded-card border hairline-border bg-surface p-4 space-y-4 shadow-subtle">
      <div className="flex items-center gap-2 text-primary font-semibold text-small">
        <Calendar className="w-4 h-4 stroke-[1.5]" />
        <span>Rental Calculator & Booking Dates</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-micro font-medium uppercase tracking-wider text-text-muted">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            min={today}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full h-9 px-2.5 rounded-input border hairline-border bg-surface text-small text-text focus:outline-none focus:border-primary"
          />
        </div>
        <div className="space-y-1">
          <label className="text-micro font-medium uppercase tracking-wider text-text-muted">
            Return Date
          </label>
          <input
            type="date"
            value={endDate}
            min={startDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full h-9 px-2.5 rounded-input border hairline-border bg-surface text-small text-text focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Live Computation */}
      <div className="p-3 rounded-input bg-surface-elevated border hairline-border flex items-center justify-between text-small">
        <span className="text-text-secondary tabular-nums">
          {days} {days === 1 ? 'day' : 'days'} × {formatPrice(rentPerDay)}/day
        </span>
        <span className="text-h3 font-bold text-text tabular-nums font-heading">
          {formatPrice(total)}
        </span>
      </div>

      <Button
        variant="primary"
        size="md"
        onClick={handleRequestRent}
        className="w-full gap-2 font-semibold"
      >
        <span>Request Rental Dates in Chat</span>
        <ArrowRight className="w-4 h-4 stroke-[1.5]" />
      </Button>
    </div>
  );
}

