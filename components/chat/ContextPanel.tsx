'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Calendar,
  MapPin,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';
import { Listing } from '@/data/listings';
import { formatPrice } from '@/lib/format';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useChatStore } from '@/lib/store/chatStore';

interface ContextPanelProps {
  listing?: Listing;
  conversationId: string;
  meetingScheduled?: {
    date: string;
    location: string;
  };
}

export function ContextPanel({
  listing,
  conversationId,
  meetingScheduled,
}: ContextPanelProps) {
  const { setMeetingSchedule } = useChatStore();

  const [date, setDate] = React.useState('Tomorrow, 5:00 PM');
  const [location, setLocation] = React.useState('Campus Cafeteria, Central Point');
  const [isEditing, setIsEditing] = React.useState(false);

  const handleSaveMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date.trim() || !location.trim()) {
      toast.error('Please enter both date/time and meeting place');
      return;
    }
    setMeetingSchedule(conversationId, { date, location });
    setIsEditing(false);
    toast.success('Meeting scheduled!', {
      description: `${date} at ${location}`,
    });
  };

  return (
    <div className="w-full h-full flex flex-col bg-surface border-l hairline-border p-5 space-y-6 overflow-y-auto">
      <div>
        <span className="text-micro font-semibold uppercase tracking-[0.06em] text-text-muted block mb-1">
          Listing Context
        </span>
        <h3 className="text-base font-semibold text-text font-heading">
          Deal Information
        </h3>
      </div>

      {listing ? (
        <div className="space-y-4">
          <Link
            href={`/product/${listing.id}`}
            className="group block space-y-3 focus-ring rounded-card"
          >
            <div className="relative aspect-[4/3] w-full rounded-card border hairline-border overflow-hidden bg-surface-elevated shadow-subtle">
              <Image
                src={listing.images[0]}
                alt={listing.title}
                fill
                sizes="280px"
                className="object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>

            <div>
              <span className="text-h3 font-bold text-text tabular-nums font-heading block">
                {formatPrice(
                  listing.listingType === 'rent' && listing.rentPerDay
                    ? listing.rentPerDay
                    : listing.price,
                  listing.listingType === 'rent'
                )}
              </span>
              <p className="text-small font-medium text-text line-clamp-2 group-hover:text-primary transition-colors">
                {listing.title}
              </p>
            </div>
          </Link>

          <Link href={`/product/${listing.id}`}>
            <Button variant="secondary" size="sm" className="w-full gap-1.5 text-micro">
              <span>View Full Listing Page</span>
              <ExternalLink className="w-3.5 h-3.5 stroke-[1.5]" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="p-4 rounded-card border hairline-border bg-surface-elevated text-small text-text-muted">
          Direct peer inquiry
        </div>
      )}

      {/* Safety Reminder */}
      <div className="p-3.5 rounded-card border border-accent/30 bg-accent/10 space-y-1.5 text-small">
        <div className="flex items-center gap-1.5 font-semibold text-accent-foreground dark:text-accent">
          <ShieldCheck className="w-4 h-4 stroke-[2]" />
          <span>Handover Reminder</span>
        </div>
        <p className="text-micro text-text-secondary leading-relaxed">
          Inspect product before paying. Settle cash or online transfer in person.
        </p>
      </div>

      {/* Meeting Scheduler */}
      <div className="pt-4 border-t hairline-border space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-micro font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Meetup Details</span>
          </span>
          {meetingScheduled && !isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="text-micro text-primary hover:underline font-semibold"
            >
              Change
            </button>
          )}
        </div>

        {meetingScheduled && !isEditing ? (
          <div className="p-3.5 rounded-card border border-success/30 bg-success/10 space-y-1.5">
            <div className="flex items-center gap-1.5 text-success font-semibold text-small">
              <CheckCircle2 className="w-4 h-4 stroke-[2]" />
              <span>Meeting Scheduled</span>
            </div>
            <p className="text-small font-medium text-text">{meetingScheduled.date}</p>
            <p className="text-micro text-text-secondary flex items-center gap-1">
              <MapPin className="w-3 h-3 stroke-[1.5]" />
              <span>{meetingScheduled.location}</span>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSaveMeeting} className="space-y-3">
            <Input
              label="Date & Time"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="e.g. Tomorrow 5 PM"
              className="text-small"
            />
            <Input
              label="Public Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Bandra Starbucks"
              className="text-small"
            />
            <div className="flex gap-2">
              {isEditing && (
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsEditing(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              )}
              <Button type="submit" variant="primary" size="sm" className="flex-1">
                Save Meetup
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

