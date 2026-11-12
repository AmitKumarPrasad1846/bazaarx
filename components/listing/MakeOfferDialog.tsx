'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { formatPrice } from '@/lib/format';
import { useChatStore } from '@/lib/store/chatStore';
import { toast } from 'sonner';
import { HandCoins } from 'lucide-react';

interface MakeOfferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listingId: string;
  listingTitle: string;
  originalPrice: number;
  sellerId: string;
  sellerName: string;
}

export function MakeOfferDialog({
  open,
  onOpenChange,
  listingId,
  listingTitle,
  originalPrice,
  sellerId,
  sellerName,
}: MakeOfferDialogProps) {
  const router = useRouter();
  const { getOrCreateConversationForListing, sendMessage } = useChatStore();
  const [offerPrice, setOfferPrice] = React.useState<number>(Math.round(originalPrice * 0.9));
  const [note, setNote] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerPrice || offerPrice <= 0) {
      toast.error('Please enter a valid offer amount');
      return;
    }

    setSubmitting(true);
    const conv = getOrCreateConversationForListing(listingId, sellerId, sellerName);
    const offerMessage = `Offer sent: ${formatPrice(offerPrice)} for "${listingTitle}". ${
      note ? `Note: "${note}"` : 'Can we close this in person?'
    }`;

    sendMessage(conv.id, offerMessage);

    setTimeout(() => {
      setSubmitting(false);
      onOpenChange(false);
      toast.success('Offer delivered to seller!', {
        description: `Offered ${formatPrice(offerPrice)} to ${sellerName}`,
      });
      router.push(`/chat?listing=${listingId}`);
    }, 400);
  };

  const discountPercentages = [5, 10, 15, 20];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <div className="w-10 h-10 rounded-input bg-primary/10 text-primary flex items-center justify-center mb-2">
              <HandCoins className="w-5 h-5 stroke-[1.5]" />
            </div>
            <DialogTitle>Make an Offer</DialogTitle>
            <DialogDescription>
              Propose a fair cash/online price to {sellerName}. Listed price is{' '}
              <span className="font-semibold text-text tabular-nums font-heading">
                {formatPrice(originalPrice)}
              </span>
              .
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            {/* Quick discount buttons */}
            <div className="space-y-1.5">
              <label className="text-small font-medium text-text-muted">Quick Offer</label>
              <div className="grid grid-cols-4 gap-2">
                {discountPercentages.map((pct) => {
                  const targetPrice = Math.round(originalPrice * (1 - pct / 100));
                  return (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setOfferPrice(targetPrice)}
                      className={`py-1.5 px-2 rounded-input border hairline-border text-small text-center transition-colors ${
                        offerPrice === targetPrice
                          ? 'bg-primary/10 border-primary text-primary font-semibold'
                          : 'bg-surface hover:bg-surface-elevated text-text'
                      }`}
                    >
                      <span className="block text-[11px] text-text-muted">-{pct}%</span>
                      <span className="text-small tabular-nums font-heading font-medium">
                        {formatPrice(targetPrice)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <Input
              label="Your Offer Amount (₹)"
              type="number"
              value={offerPrice || ''}
              onChange={(e) => setOfferPrice(Number(e.target.value))}
              placeholder="Enter amount"
              required
              className="text-h3 font-semibold tabular-nums font-heading"
            />

            <Input
              label="Optional Note to Seller"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Can collect today in person with cash"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={submitting}>
              Send Offer in Chat
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

