'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup';
import { toast } from 'sonner';
import { AlertTriangle } from 'lucide-react';

interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listingTitle: string;
}

export function ReportDialog({ open, onOpenChange, listingTitle }: ReportDialogProps) {
  const [reason, setReason] = React.useState('misleading');
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onOpenChange(false);
      toast.success('Report submitted to safety moderation', {
        description: `Thank you for keeping BazaarX trustworthy. We are reviewing "${listingTitle}".`,
      });
    }, 600);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <div className="w-10 h-10 rounded-input bg-danger/10 text-danger flex items-center justify-center mb-2">
              <AlertTriangle className="w-5 h-5 stroke-[1.5]" />
            </div>
            <DialogTitle>Report This Listing</DialogTitle>
            <DialogDescription>
              Help us protect the community. Select the primary reason for reporting this ad.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-3">
            <RadioGroup value={reason} onValueChange={setReason}>
              <label className="flex items-center space-x-3 p-3 rounded-input border hairline-border hover:bg-surface-elevated cursor-pointer">
                <RadioGroupItem value="misleading" id="r-misleading" />
                <div className="text-small">
                  <p className="font-medium text-text">Misleading or inaccurate details</p>
                  <p className="text-text-muted">Item condition or photos don&apos;t match description.</p>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-3 rounded-input border hairline-border hover:bg-surface-elevated cursor-pointer">
                <RadioGroupItem value="fraud" id="r-fraud" />
                <div className="text-small">
                  <p className="font-medium text-text">Suspicious or fraudulent activity</p>
                  <p className="text-text-muted">Seller asking for advance deposit or QR code payment.</p>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-3 rounded-input border hairline-border hover:bg-surface-elevated cursor-pointer">
                <RadioGroupItem value="prohibited" id="r-prohibited" />
                <div className="text-small">
                  <p className="font-medium text-text">Prohibited or illegal item</p>
                  <p className="text-text-muted">Weapons, counterfeit items, or illegal substances.</p>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-3 rounded-input border hairline-border hover:bg-surface-elevated cursor-pointer">
                <RadioGroupItem value="other" id="r-other" />
                <div className="text-small">
                  <p className="font-medium text-text">Other violation</p>
                  <p className="text-text-muted">Spam, duplicate listing, or harassment.</p>
                </div>
              </label>
            </RadioGroup>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="danger" isLoading={submitting}>
              Submit Report
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

