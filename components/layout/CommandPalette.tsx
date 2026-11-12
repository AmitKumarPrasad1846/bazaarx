'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/Command';
import {
  Search,
  PlusCircle,
  MessageSquare,
  LayoutDashboard,
  ShieldCheck,
  Moon,
  Sun,
  Laptop,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';
import { useListingsStore } from '@/lib/store/listingsStore';
import { formatPrice } from '@/lib/format';

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const { setTheme } = useTheme();
  const { listings } = useListingsStore();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  const runCommand = (command: () => void) => {
    onOpenChange(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search listings, pages, or toggle theme..." />
      <CommandList>
        <CommandEmpty>No matching results.</CommandEmpty>

        {/* Dynamic Listings Search (Top Matches) */}
        <CommandGroup heading="Featured Listings">
          {listings.slice(0, 5).map((listing) => (
            <CommandItem
              key={listing.id}
              value={`${listing.title} ${listing.city} ${listing.category}`}
              onSelect={() => runCommand(() => router.push(`/product/${listing.id}`))}
            >
              <ShoppingBag className="mr-2 h-4 w-4 text-primary stroke-[1.5]" />
              <div className="flex-1 min-w-0 flex items-center justify-between">
                <span className="truncate">{listing.title}</span>
                <span className="text-micro font-semibold text-text-muted ml-2 tabular-nums">
                  {formatPrice(
                    listing.listingType === 'rent' && listing.rentPerDay
                      ? listing.rentPerDay
                      : listing.price,
                    listing.listingType === 'rent'
                  )}
                </span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        {/* Main Navigation */}
        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() => runCommand(() => router.push('/listings'))}
          >
            <Search className="mr-2 h-4 w-4 stroke-[1.5]" />
            <span>Browse All Marketplace Ads</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/post'))}
          >
            <PlusCircle className="mr-2 h-4 w-4 stroke-[1.5]" />
            <span>Post New Ad (Sell / Rent)</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/chat'))}
          >
            <MessageSquare className="mr-2 h-4 w-4 stroke-[1.5]" />
            <span>Direct Chat Messages</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/dashboard'))}
          >
            <LayoutDashboard className="mr-2 h-4 w-4 stroke-[1.5]" />
            <span>User Dashboard & Ads</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/safety'))}
          >
            <ShieldCheck className="mr-2 h-4 w-4 stroke-[1.5]" />
            <span>Safety Guidelines & Handover Tips</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Categories */}
        <CommandGroup heading="Categories">
          <CommandItem
            onSelect={() => runCommand(() => router.push('/listings?category=electronics'))}
          >
            <span>Electronics & Tech</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/listings?category=vehicles'))}
          >
            <span>Bikes & Vehicles</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/listings?category=furniture'))}
          >
            <span>Furniture & Study Tables</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push('/listings?category=books'))}
          >
            <span>Books & Course Material</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Theme Switching */}
        <CommandGroup heading="Appearance">
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                document.documentElement.classList.add('theme-switching');
                setTheme('light');
                setTimeout(() => document.documentElement.classList.remove('theme-switching'), 300);
              })
            }
          >
            <Sun className="mr-2 h-4 w-4 stroke-[1.5]" />
            <span>Switch to Light Theme</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                document.documentElement.classList.add('theme-switching');
                setTheme('dark');
                setTimeout(() => document.documentElement.classList.remove('theme-switching'), 300);
              })
            }
          >
            <Moon className="mr-2 h-4 w-4 stroke-[1.5]" />
            <span>Switch to Dark Theme</span>
          </CommandItem>
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                document.documentElement.classList.add('theme-switching');
                setTheme('system');
                setTimeout(() => document.documentElement.classList.remove('theme-switching'), 300);
              })
            }
          >
            <Laptop className="mr-2 h-4 w-4 stroke-[1.5]" />
            <span>Match System Theme</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
