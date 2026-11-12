'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronRight,
  Heart,
  Share2,
  Flag,
  Phone,
  MessageSquare,
  ShieldCheck,
  Eye,
  Clock,
  MapPin,
  ChevronLeft,
  HandCoins,
} from 'lucide-react';
import { toast } from 'sonner';
import { Listing } from '@/data/listings';
import { formatPrice, formatTimeAgo } from '@/lib/format';
import { useListingsStore } from '@/lib/store/listingsStore';
import { useChatStore } from '@/lib/store/chatStore';
import { GalleryLightbox } from '@/components/listing/GalleryLightbox';
import { SellerCard } from '@/components/listing/SellerCard';
import { RentCalculator } from '@/components/listing/RentCalculator';
import { SafetyTipsDialog } from '@/components/listing/SafetyTipsDialog';
import { ReportDialog } from '@/components/listing/ReportDialog';
import { MakeOfferDialog } from '@/components/listing/MakeOfferDialog';
import { ProductCard } from '@/components/listing/ProductCard';
import { PaymentBadge } from '@/components/ui/PaymentBadge';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface ProductDetailClientProps {
  listing: Listing;
  similarListings: Listing[];
}

export function ProductDetailClient({
  listing,
  similarListings,
}: ProductDetailClientProps) {
  const router = useRouter();
  const { isSaved, toggleSave, incrementViews } = useListingsStore();
  const { getOrCreateConversationForListing } = useChatStore();

  const [mounted, setMounted] = React.useState(false);
  const [safetyOpen, setSafetyOpen] = React.useState(false);
  const [reportOpen, setReportOpen] = React.useState(false);
  const [offerOpen, setOfferOpen] = React.useState(false);

  // Increment view count on mount
  React.useEffect(() => {
    setMounted(true);
    incrementViews(listing.id);
  }, [listing.id, incrementViews]);

  const saved = mounted ? isSaved(listing.id) : false;

  const handleToggleSave = () => {
    const nowSaved = toggleSave(listing.id);
    if (nowSaved) {
      toast.success('Listing saved to your wishlist');
    } else {
      toast('Listing removed from wishlist');
    }
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Listing link copied to clipboard!');
    }
  };

  const handleChat = () => {
    getOrCreateConversationForListing(listing.id, listing.sellerId, listing.sellerName);
    router.push(`/chat?listing=${listing.id}`);
  };

  // Carousel ref for similar listings
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 320;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center space-x-2 text-small text-text-muted">
        <Link href="/" className="hover:text-text transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 stroke-[1.5]" />
        <Link href="/listings" className="hover:text-text transition-colors">
          Marketplace
        </Link>
        <ChevronRight className="w-3.5 h-3.5 stroke-[1.5]" />
        <Link
          href={`/listings?category=${listing.category}`}
          className="hover:text-text capitalize transition-colors"
        >
          {listing.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 stroke-[1.5]" />
        <span className="text-text font-medium truncate max-w-xs">{listing.title}</span>
      </nav>

      {/* 55 / 45 Two-Column Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left 55% Column: Gallery & Description */}
        <div className="lg:col-span-7 space-y-8">
          <GalleryLightbox images={listing.images} title={listing.title} />

          {/* Description Block */}
          <div className="rounded-card border hairline-border bg-surface p-6 space-y-4 shadow-subtle">
            <h3 className="text-h3 font-semibold text-text font-heading">
              Product Overview & Details
            </h3>
            <p className="text-base text-text-secondary leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>

            <div className="pt-4 border-t hairline-border grid grid-cols-2 sm:grid-cols-4 gap-4 text-small">
              <div>
                <span className="text-micro font-medium uppercase tracking-wider text-text-muted block">
                  Condition
                </span>
                <span className="font-semibold text-text">{listing.condition}</span>
              </div>
              <div>
                <span className="text-micro font-medium uppercase tracking-wider text-text-muted block">
                  Category
                </span>
                <span className="font-semibold text-text capitalize">{listing.category}</span>
              </div>
              <div>
                <span className="text-micro font-medium uppercase tracking-wider text-text-muted block">
                  Handover Area
                </span>
                <span className="font-semibold text-text truncate block">{listing.area}</span>
              </div>
              <div>
                <span className="text-micro font-medium uppercase tracking-wider text-text-muted block">
                  Verification
                </span>
                <span className="font-semibold text-success flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 stroke-[1.5]" /> Direct
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 45% Column: Price, Actions, Rent/Offer, Safety Banner, Seller Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-card border hairline-border bg-surface p-6 space-y-5 shadow-subtle">
            {/* Badges & Actions row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge
                  variant={listing.listingType === 'rent' ? 'accent' : 'primary'}
                  className="font-bold text-[11px]"
                >
                  FOR {listing.listingType.toUpperCase()}
                </Badge>
                <PaymentBadge mode={listing.paymentMode} />
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleToggleSave}
                  aria-pressed={saved}
                  aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
                  className={`p-2 rounded-btn border hairline-border transition-colors focus-ring ${
                    saved
                      ? 'bg-danger text-white border-danger'
                      : 'bg-surface hover:bg-surface-elevated text-text-secondary hover:text-text'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Share listing link"
                  className="p-2 rounded-btn border hairline-border bg-surface hover:bg-surface-elevated text-text-secondary hover:text-text transition-colors focus-ring"
                >
                  <Share2 className="w-4 h-4 stroke-[1.5]" />
                </button>
                <button
                  type="button"
                  onClick={() => setReportOpen(true)}
                  aria-label="Report listing"
                  className="p-2 rounded-btn border hairline-border bg-surface hover:bg-surface-elevated text-text-secondary hover:text-danger transition-colors focus-ring"
                >
                  <Flag className="w-4 h-4 stroke-[1.5]" />
                </button>
              </div>
            </div>

            {/* Title & Price */}
            <div className="space-y-2">
              <h1 className="text-h2 sm:text-h1 font-bold text-text font-heading leading-tight">
                {listing.title}
              </h1>

              <div className="flex items-baseline gap-2">
                <span className="text-h1 sm:text-[36px] font-bold text-text tabular-nums font-heading tracking-tight">
                  {formatPrice(
                    listing.listingType === 'rent' && listing.rentPerDay
                      ? listing.rentPerDay
                      : listing.price,
                    listing.listingType === 'rent'
                  )}
                </span>
                {listing.listingType === 'rent' && (
                  <span className="text-small text-text-muted">refundable deposit agreed on meetup</span>
                )}
              </div>
            </div>

            {/* City, Timestamp, Views */}
            <div className="flex flex-wrap items-center gap-4 text-small text-text-muted pt-2 border-t hairline-border">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 stroke-[1.5]" />
                <span>{listing.city}, {listing.area}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 stroke-[1.5]" />
                <span>{mounted ? formatTimeAgo(listing.createdAt) : 'recently'}</span>
              </span>
              <span className="flex items-center gap-1 tabular-nums">
                <Eye className="w-3.5 h-3.5 stroke-[1.5]" />
                <span>{listing.views} views</span>
              </span>
            </div>

            {/* Primary Action Buttons (Desktop) */}
            <div className="space-y-2.5 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleChat}
                  className="gap-2 font-semibold w-full"
                >
                  <MessageSquare className="w-4 h-4 stroke-[2]" />
                  <span>Chat with Seller</span>
                </Button>
                <a href="tel:+919876543210" className="w-full">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="gap-2 w-full font-medium"
                  >
                    <Phone className="w-4 h-4 stroke-[1.5]" />
                    <span>Call Seller</span>
                  </Button>
                </a>
              </div>

              {listing.listingType === 'sell' && (
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setOfferOpen(true)}
                  className="w-full gap-2 text-primary border-primary/30 hover:bg-primary/5"
                >
                  <HandCoins className="w-4 h-4 stroke-[1.5]" />
                  <span>Make an Offer</span>
                </Button>
              )}
            </div>
          </div>

          {/* Conditional Rent Calculator */}
          {listing.listingType === 'rent' && listing.rentPerDay && (
            <RentCalculator
              listingId={listing.id}
              listingTitle={listing.title}
              rentPerDay={listing.rentPerDay}
              sellerId={listing.sellerId}
              sellerName={listing.sellerName}
            />
          )}

          {/* Safety Notice Banner (accent 10% tint, 8px radius, 16px padding) */}
          <div className="rounded-card border border-accent/30 bg-accent/10 p-4 space-y-2 text-small">
            <div className="flex items-center gap-2 font-semibold text-accent-foreground dark:text-accent">
              <ShieldCheck className="w-4 h-4 stroke-[2]" />
              <span>In-Person Verification Required</span>
            </div>
            <p className="text-text-secondary leading-relaxed text-small">
              Meet in person to verify the product. BazaarX does not handle payments or delivery. Never send money in advance.
            </p>
            <button
              type="button"
              onClick={() => setSafetyOpen(true)}
              className="text-primary font-medium hover:underline inline-block pt-1 text-small"
            >
              Read our safe meetup guidelines →
            </button>
          </div>

          {/* Seller Profile Card */}
          <SellerCard sellerId={listing.sellerId} sellerName={listing.sellerName} />
        </div>
      </div>

      {/* Similar Listings Carousel (Scroll-Snap with Navigation Arrows) */}
      {similarListings.length > 0 && (
        <section className="mt-16 pt-12 border-t hairline-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-micro font-semibold uppercase tracking-[0.06em] text-text-muted block mb-1">
                More in {listing.category}
              </span>
              <h2 className="text-h2 font-semibold text-text font-heading">
                Similar Listings Near You
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollCarousel('left')}
                className="w-9 h-9 rounded-btn border hairline-border bg-surface hover:bg-surface-elevated text-text flex items-center justify-center focus-ring"
                aria-label="Previous items"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2]" />
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel('right')}
                className="w-9 h-9 rounded-btn border hairline-border bg-surface hover:bg-surface-elevated text-text flex items-center justify-center focus-ring"
                aria-label="Next items"
              >
                <ChevronRight className="w-4 h-4 stroke-[2]" />
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {similarListings.map((simListing) => (
              <div
                key={simListing.id}
                className="w-[280px] sm:w-[320px] shrink-0 snap-start"
              >
                <ProductCard listing={simListing} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Mobile Sticky Bottom Bar (Chat + Call with Safe-Area Padding) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t hairline-border p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lg flex items-center gap-3">
        <a href="tel:+919876543210" className="flex-1">
          <Button variant="secondary" size="md" className="w-full gap-2">
            <Phone className="w-4 h-4 stroke-[1.5]" />
            <span>Call</span>
          </Button>
        </a>
        <Button
          variant="primary"
          size="md"
          onClick={handleChat}
          className="flex-1 gap-2 font-semibold"
        >
          <MessageSquare className="w-4 h-4 stroke-[2]" />
          <span>Chat</span>
        </Button>
      </div>

      {/* Modals & Dialogs */}
      <SafetyTipsDialog open={safetyOpen} onOpenChange={setSafetyOpen} />
      <ReportDialog
        open={reportOpen}
        onOpenChange={setReportOpen}
        listingTitle={listing.title}
      />
      <MakeOfferDialog
        open={offerOpen}
        onOpenChange={setOfferOpen}
        listingId={listing.id}
        listingTitle={listing.title}
        originalPrice={listing.price}
        sellerId={listing.sellerId}
        sellerName={listing.sellerName}
      />
    </div>
  );
}

