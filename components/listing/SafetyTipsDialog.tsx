'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/Dialog';
import { ShieldCheck, MapPin, Sun, Users, Search, AlertCircle } from 'lucide-react';

interface SafetyTipsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SafetyTipsDialog({ open, onOpenChange }: SafetyTipsDialogProps) {
  const tips = [
    {
      icon: MapPin,
      title: 'Meet in Busy Public Places',
      desc: 'Choose well-lit, crowded locations like campus cafeterias, metro stations, coffee shops, or shopping malls.',
    },
    {
      icon: Sun,
      title: 'Prefer Daytime Meetups',
      desc: 'Schedule handovers during daylight hours so you can thoroughly inspect cosmetic details and serial numbers.',
    },
    {
      icon: Users,
      title: 'Bring a Friend Along',
      desc: 'Whenever meeting someone new for high-value items (laptops, phones, bikes), bring a peer or classmate with you.',
    },
    {
      icon: Search,
      title: 'Inspect Before Exchanging Money',
      desc: 'Turn on electronics, verify IMEI/battery health, test bike gears, and check authenticity before handing over cash or scanning UPI.',
    },
    {
      icon: AlertCircle,
      title: 'Never Send Advance Payments',
      desc: 'BazaarX never asks for advance booking deposits, shipping charges, or QR code verification fees. Pay only in person.',
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="w-10 h-10 rounded-input bg-primary/10 text-primary flex items-center justify-center mb-2">
            <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
          </div>
          <DialogTitle>Safe In-Person Handover Guidelines</DialogTitle>
          <DialogDescription>
            BazaarX is a peer exchange. Follow these simple steps for a safe and hassle-free transaction.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2">
          {tips.map((tip, idx) => {
            const Icon = tip.icon;
            return (
              <div key={idx} className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-input bg-surface-elevated border hairline-border flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-small font-semibold text-text">{tip.title}</h4>
                  <p className="text-small text-text-secondary leading-snug">{tip.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

