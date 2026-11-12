'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SlidersHorizontal,
  X,
  Search,
  ArrowUpDown,
  RotateCcw,
  Tag,
  MapPin,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/Sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { ProductCard, ProductCardSkeleton } from '@/components/listing/ProductCard';
import { useListingsStore } from '@/lib/store/listingsStore';
import { CITIES, CATEGORIES } from '@/data/cities';
import { Listing, Condition, ListingType } from '@/data/listings';
import { cn } from '@/lib/utils';

export function ListingsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { listings } = useListingsStore();

  const [mounted, setMounted] = React.useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = React.useState(false);

  // Read URL query parameters
  const currentQ = searchParams.get('q') || '';
  const currentType = (searchParams.get('type') || 'all') as 'all' | 'sell' | 'rent';
  const currentCategory = searchParams.get('category') || 'all';
  const currentCity = searchParams.get('city') || 'all';
  const currentMinPrice = searchParams.get('min') || '';
  const currentMaxPrice = searchParams.get('max') || '';
  const currentSort = searchParams.get('sort') || 'newest';
  const currentConditions = React.useMemo(() => {
    const raw = searchParams.get('condition');
    return raw ? raw.split(',') : [];
  }, [searchParams]);

  // Local debounced search
  const [searchInput, setSearchInput] = React.useState(currentQ);
  const [pageSize, setPageSize] = React.useState(12);

  React.useEffect(() => {
    setMounted(true);
    setSearchInput(currentQ);
  }, [currentQ]);

  // Helper to update URL params
  const updateParams = React.useCallback(
    (newParams: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(newParams).forEach(([key, val]) => {
        if (val === null || val === '' || val === 'all') {
          params.delete(key);
        } else {
          params.set(key, val);
        }
      });
      router.push(`/listings?${params.toString()}`);
    },
    [router, searchParams]
  );

  // Debounced search effect (200ms)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== currentQ) {
        updateParams({ q: searchInput });
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [searchInput, currentQ, updateParams]);

  // Clear all filters
  const clearAllFilters = () => {
    router.push('/listings');
  };

  // Condition toggle helper
  const toggleCondition = React.useCallback(
    (cond: Condition) => {
      const exists = currentConditions.includes(cond);
      const updated = exists
        ? currentConditions.filter((c) => c !== cond)
        : [...currentConditions, cond];
      updateParams({
        condition: updated.length > 0 ? updated.join(',') : null,
      });
    },
    [currentConditions, updateParams]
  );

  // Filter listings based on URL params
  const filteredListings = React.useMemo(() => {
    return listings.filter((item) => {
      if (item.status !== 'active') return false;

      // Type filter
      if (currentType !== 'all' && item.listingType !== currentType) {
        return false;
      }

      // Category filter
      if (currentCategory !== 'all' && item.category !== currentCategory) {
        return false;
      }

      // City filter
      if (currentCity !== 'all' && item.city.toLowerCase() !== currentCity.toLowerCase()) {
        return false;
      }

      // Condition filter
      if (currentConditions.length > 0 && !currentConditions.includes(item.condition)) {
        return false;
      }

      // Price min/max
      const priceToCheck = item.listingType === 'rent' && item.rentPerDay ? item.rentPerDay : item.price;
      if (currentMinPrice && priceToCheck < Number(currentMinPrice)) {
        return false;
      }
      if (currentMaxPrice && priceToCheck > Number(currentMaxPrice)) {
        return false;
      }

      // Search query q
      if (currentQ) {
        const query = currentQ.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchArea = item.area.toLowerCase().includes(query);
        const matchCity = item.city.toLowerCase().includes(query);
        if (!matchTitle && !matchDesc && !matchArea && !matchCity) {
          return false;
        }
      }

      return true;
    });
  }, [listings, currentType, currentCategory, currentCity, currentConditions, currentMinPrice, currentMaxPrice, currentQ]);

  // Sorted listings
  const sortedListings = React.useMemo(() => {
    const sorted = [...filteredListings];
    if (currentSort === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else {
      // Newest
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return sorted;
  }, [filteredListings, currentSort]);

  // Active filters list for removable chips
  const activeChips = React.useMemo(() => {
    const chips: Array<{ label: string; onRemove: () => void }> = [];
    if (currentType !== 'all') {
      chips.push({
        label: `Type: ${currentType.toUpperCase()}`,
        onRemove: () => updateParams({ type: null }),
      });
    }
    if (currentCategory !== 'all') {
      const cat = CATEGORIES.find((c) => c.id === currentCategory);
      chips.push({
        label: `Category: ${cat ? cat.name : currentCategory}`,
        onRemove: () => updateParams({ category: null }),
      });
    }
    if (currentCity !== 'all') {
      chips.push({
        label: `City: ${currentCity}`,
        onRemove: () => updateParams({ city: null }),
      });
    }
    if (currentMinPrice) {
      chips.push({
        label: `Min: ₹${currentMinPrice}`,
        onRemove: () => updateParams({ min: null }),
      });
    }
    if (currentMaxPrice) {
      chips.push({
        label: `Max: ₹${currentMaxPrice}`,
        onRemove: () => updateParams({ max: null }),
      });
    }
    currentConditions.forEach((cond) => {
      chips.push({
        label: `Condition: ${cond}`,
        onRemove: () => toggleCondition(cond as Condition),
      });
    });
    if (currentQ) {
      chips.push({
        label: `"${currentQ}"`,
        onRemove: () => updateParams({ q: null }),
      });
    }
    return chips;
  }, [currentType, currentCategory, currentCity, currentMinPrice, currentMaxPrice, currentConditions, currentQ, updateParams, toggleCondition]);

  // Sidebar filter markup reusable for desktop sidebar and mobile drawer
  const renderFilterControls = (isMobile = false) => (
    <div className="space-y-6">
      {/* Buy/Sell/Rent Segmented Control */}
      <div className="space-y-2">
        <label className="text-small font-semibold text-text uppercase tracking-wider block">
          Deal Type
        </label>
        <SegmentedControl
          name={isMobile ? 'mobile-deal-type' : 'desktop-deal-type'}
          options={[
            { id: 'all', label: 'All' },
            { id: 'sell', label: 'Buy/Sell' },
            { id: 'rent', label: 'Rent' },
          ]}
          value={currentType}
          onChange={(val) => updateParams({ type: val === 'all' ? null : val })}
          className="w-full justify-between"
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="text-small font-semibold text-text uppercase tracking-wider block">
          Category
        </label>
        <div className="flex flex-col space-y-1">
          <button
            type="button"
            onClick={() => updateParams({ category: null })}
            className={cn(
              'px-2.5 py-1.5 rounded-[4px] text-small text-left flex items-center justify-between transition-colors',
              currentCategory === 'all'
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-text-secondary hover:text-text hover:bg-surface-elevated'
            )}
          >
            <span>All Categories</span>
            <span className="text-micro text-text-muted">{listings.length}</span>
          </button>
          {CATEGORIES.map((cat) => {
            const count = listings.filter((l) => l.category === cat.id).length;
            const isSelected = currentCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => updateParams({ category: cat.id })}
                className={cn(
                  'px-2.5 py-1.5 rounded-[4px] text-small text-left flex items-center justify-between transition-colors',
                  isSelected
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-text-secondary hover:text-text hover:bg-surface-elevated'
                )}
              >
                <span>{cat.name}</span>
                <span className="text-micro text-text-muted">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* City */}
      <div className="space-y-2">
        <label className="text-small font-semibold text-text uppercase tracking-wider block">
          Location
        </label>
        <select
          value={currentCity}
          onChange={(e) => updateParams({ city: e.target.value === 'all' ? null : e.target.value })}
          aria-label="Filter listings by city"
          className="h-10 w-full px-3 text-small bg-surface text-text rounded-input border hairline-border focus:outline-none focus:border-primary"
        >
          <option value="all">All Cities</option>
          {CITIES.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <label className="text-small font-semibold text-text uppercase tracking-wider block">
          Price Range (₹)
        </label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={currentMinPrice}
            onChange={(e) => updateParams({ min: e.target.value || null })}
            className="h-9 text-small tabular-nums"
          />
          <span className="text-text-muted text-small">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={currentMaxPrice}
            onChange={(e) => updateParams({ max: e.target.value || null })}
            className="h-9 text-small tabular-nums"
          />
        </div>
      </div>

      {/* Condition Checkboxes */}
      <div className="space-y-2.5">
        <label className="text-small font-semibold text-text uppercase tracking-wider block">
          Condition
        </label>
        {(['Brand New', 'Like New', 'Good', 'Fair'] as Condition[]).map((cond) => {
          const isChecked = currentConditions.includes(cond);
          return (
            <label
              key={cond}
              className="flex items-center gap-2.5 text-small text-text-secondary hover:text-text cursor-pointer select-none"
            >
              <Checkbox
                checked={isChecked}
                onCheckedChange={() => toggleCondition(cond)}
              />
              <span>{cond}</span>
            </label>
          );
        })}
      </div>

      {/* Clear All */}
      {activeChips.length > 0 && (
        <div className="pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="w-full text-danger hover:text-danger hover:bg-danger/10 gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Clear all filters</span>
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Top Header Row: Page Title, Search & Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b hairline-border">
        <div>
          <h1 className="text-h1 font-bold text-text font-heading">
            Browse Marketplace
          </h1>
          <p
            aria-live="polite"
            className="text-small text-text-muted mt-1 tabular-nums"
          >
            Showing {sortedListings.length} {sortedListings.length === 1 ? 'item' : 'items'} available for direct handover
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Sheet Trigger Button */}
          <div className="lg:hidden">
            <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="secondary" size="md" className="gap-2">
                  <SlidersHorizontal className="w-4 h-4 stroke-[1.5]" />
                  <span>Filters</span>
                  {activeChips.length > 0 && (
                    <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-micro flex items-center justify-center font-bold">
                      {activeChips.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="px-6 py-6" showHandle>
                <SheetHeader className="mb-4">
                  <SheetTitle>Filter Listings</SheetTitle>
                </SheetHeader>
                {renderFilterControls(true)}
                <SheetFooter className="mt-6 border-t hairline-border pt-4">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full font-semibold"
                    onClick={() => setMobileFilterOpen(false)}
                  >
                    Apply ({filteredListings.length} results)
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="md" className="gap-2">
                <ArrowUpDown className="w-4 h-4 stroke-[1.5]" />
                <span className="capitalize">
                  {currentSort === 'price-asc'
                    ? 'Price: Low to High'
                    : currentSort === 'price-desc'
                    ? 'Price: High to Low'
                    : 'Newest First'}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => updateParams({ sort: 'newest' })}>
                <span>Newest First</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateParams({ sort: 'price-asc' })}>
                <span>Price: Low to High</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => updateParams({ sort: 'price-desc' })}>
                <span>Price: High to Low</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Active Filter Chips Row (square 6px radius) */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-micro font-medium uppercase tracking-wider text-text-muted mr-1">
            Active:
          </span>
          {activeChips.map((chip, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-input border hairline-border bg-surface text-small text-text font-medium shadow-sm transition-colors hover:border-border-strong"
            >
              <span>{chip.label}</span>
              <button
                type="button"
                onClick={chip.onRemove}
                className="text-text-muted hover:text-danger rounded-[2px] p-0.5 focus-ring"
                aria-label={`Remove filter ${chip.label}`}
              >
                <X className="w-3.5 h-3.5 stroke-[2]" />
              </button>
            </span>
          ))}
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-micro uppercase tracking-wider font-semibold text-danger hover:underline ml-2"
          >
            Reset
          </button>
        </div>
      )}

      {/* Main Grid Layout: 240px Sticky Sidebar + 3/2/1 Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sticky 240px Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-24 rounded-card border hairline-border bg-surface p-5 shadow-subtle">
          <div className="flex items-center justify-between pb-4 mb-4 border-b hairline-border">
            <span className="text-base font-semibold text-text font-heading flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 stroke-[1.5]" />
              <span>Filters</span>
            </span>
            {activeChips.length > 0 && (
              <span className="text-micro text-primary font-medium">
                {activeChips.length} active
              </span>
            )}
          </div>
          {renderFilterControls(false)}
        </aside>

        {/* Listings Grid (9 cols on lg, 3/2/1 responsive columns) */}
        <div className="lg:col-span-9 min-h-[500px]">
          {!mounted ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : sortedListings.length === 0 ? (
            /* Empty State: Line SVG illustration + clear button */
            <div className="flex flex-col items-center justify-center p-12 text-center border hairline-border rounded-card bg-surface my-8 space-y-4">
              <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center border hairline-border mb-2">
                <svg
                  className="w-10 h-10 text-text-muted stroke-[1.5]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <path d="M11 8v6M8 11h6" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-h3 font-semibold text-text font-heading">
                No listings found
              </h3>
              <p className="text-small text-text-secondary max-w-md">
                We couldn&apos;t find any items matching your current filters. Try adjusting price limits, selecting another city, or resetting filters.
              </p>
              <Button variant="secondary" size="md" onClick={clearAllFilters} className="mt-2">
                Reset All Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Animated Grid: Cross-fade 100ms out / 150ms in */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentType}-${currentCategory}-${currentCity}-${currentSort}-${currentQ}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {sortedListings.slice(0, pageSize).map((listing, idx) => (
                    <ProductCard
                      key={listing.id}
                      listing={listing}
                      priority={idx < 6}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Load more pagination (12 at a time) */}
              {pageSize < sortedListings.length && (
                <div className="flex justify-center pt-4 pb-8">
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => setPageSize((prev) => prev + 12)}
                    className="min-w-[180px]"
                  >
                    Load More ({sortedListings.length - pageSize} left)
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
