'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  Smartphone,
  Car,
  Armchair,
  Home,
  Shirt,
  BookOpen,
  MessageSquare,
  Users,
  HandCoins,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/listing/ProductCard';
import { useListingsStore } from '@/lib/store/listingsStore';
import { CITIES, CATEGORIES } from '@/data/cities';

export default function HomePage() {
  const router = useRouter();
  const { listings } = useListingsStore();

  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedCity, setSelectedCity] = React.useState('all');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (selectedCity !== 'all') params.set('city', selectedCity);
    router.push(`/listings?${params.toString()}`);
  };

  // Fresh listings: top 8 active listings
  const freshListings = React.useMemo(() => {
    return listings.filter((l) => l.status === 'active').slice(0, 8);
  }, [listings]);

  const categoryIcons: Record<string, React.ReactNode> = {
    Electronics: <Smartphone className="w-5 h-5 stroke-[1.5]" />,
    Vehicles: <Car className="w-5 h-5 stroke-[1.5]" />,
    Furniture: <Armchair className="w-5 h-5 stroke-[1.5]" />,
    Property: <Home className="w-5 h-5 stroke-[1.5]" />,
    Fashion: <Shirt className="w-5 h-5 stroke-[1.5]" />,
    Books: <BookOpen className="w-5 h-5 stroke-[1.5]" />,
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section with subtle 3% teal tint background */}
      <section className="relative overflow-hidden border-b hairline-border bg-primary/[0.03] dark:bg-primary/[0.04] py-14 sm:py-20 lg:py-24">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 8 columns: Left-aligned Hero Headline & Search */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] border hairline-border bg-surface text-micro font-medium uppercase tracking-[0.06em] text-text-muted">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>Zero Commission · In-Person Handover</span>
              </div>

              <h1 className="text-hero font-bold tracking-[-0.03em] text-text font-heading max-w-2xl">
                Buy, Sell, Rent. Directly with People Near You.
              </h1>

              <p className="text-base sm:text-lg text-text-secondary max-w-xl leading-relaxed">
                A calm, direct marketplace connecting local students and neighbors. No shipping delays, no payment cuts, meet safely in person.
              </p>

              {/* Integrated Search Box with Category and City Select */}
              <form
                onSubmit={handleHeroSearch}
                className="p-2 sm:p-2.5 rounded-card border hairline-border bg-surface shadow-subtle flex flex-col sm:flex-row gap-2 max-w-2xl"
              >
                <div className="flex-1 flex items-center px-3 gap-2 border-b sm:border-b-0 sm:border-r hairline-border pb-2 sm:pb-0">
                  <Search className="w-4 h-4 text-text-muted shrink-0 stroke-[1.5]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search iPhone, bikes, textbooks, furniture..."
                    className="w-full bg-transparent text-base text-text placeholder:text-text-muted focus:outline-none"
                  />
                </div>

                <div className="flex gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    aria-label="Filter by category"
                    className="h-10 px-2.5 text-small bg-surface-elevated text-text rounded-input border hairline-border focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    aria-label="Filter by city"
                    className="h-10 px-2.5 text-small bg-surface-elevated text-text rounded-input border hairline-border focus:outline-none focus:border-primary cursor-pointer"
                  >
                    <option value="all">All Cities</option>
                    {CITIES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>

                  <Button type="submit" variant="primary" size="md" className="shrink-0 font-medium px-5">
                    Search
                  </Button>
                </div>
              </form>
            </div>

            {/* Right 4 columns: Quiet Stat Column */}
            <div className="lg:col-span-4 lg:border-l hairline-border lg:pl-10 space-y-6">
              <div className="space-y-1">
                <span className="text-micro uppercase tracking-wider text-text-muted font-semibold">
                  Marketplace Pulse
                </span>
                <div className="text-h1 font-bold font-heading tabular-nums text-text">
                  12,400+
                </div>
                <p className="text-small text-text-secondary">
                  Active listings across colleges and neighborhoods.
                </p>
              </div>

              <div className="h-px bg-border" />

              <div className="space-y-1">
                <span className="text-micro uppercase tracking-wider text-text-muted font-semibold">
                  Coverage
                </span>
                <div className="text-h1 font-bold font-heading tabular-nums text-text">
                  38 Cities
                </div>
                <p className="text-small text-text-secondary">
                  Local meetups in Mumbai, Delhi, Bangalore, Pune, and beyond.
                </p>
              </div>

              <div className="h-px bg-border" />

              <div className="space-y-1">
                <span className="text-micro uppercase tracking-wider text-text-muted font-semibold">
                  Direct Agreement
                </span>
                <div className="text-h1 font-bold font-heading tabular-nums text-text">
                  ₹0 Cuts
                </div>
                <p className="text-small text-text-secondary">
                  The platform never touches your money. Cash or UPI agreed directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="py-12 sm:py-16 border-b hairline-border bg-surface">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-micro font-semibold uppercase tracking-[0.06em] text-text-muted block mb-1">
                Browse By Department
              </span>
              <h2 className="text-h2 font-semibold text-text font-heading">
                Popular Categories
              </h2>
            </div>
            <Link
              href="/listings"
              className="inline-flex items-center gap-1.5 text-small font-medium text-primary hover:text-primary-hover group"
            >
              <span>Explore all listings</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/listings?category=${cat.id}`}
                className="group p-4 rounded-card border hairline-border bg-bg hover:bg-surface-elevated hover:border-border-strong hover:shadow-subtle transition-all duration-150 flex flex-col justify-between"
              >
                <div className="w-10 h-10 rounded-input bg-surface border hairline-border flex items-center justify-center text-text group-hover:text-primary group-hover:border-primary/30 transition-colors mb-4">
                  {categoryIcons[cat.name] || <Smartphone className="w-5 h-5 stroke-[1.5]" />}
                </div>
                <div>
                  <h3 className="text-base font-medium text-text group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-micro text-text-muted tabular-nums">
                    {cat.count.toLocaleString('en-IN')} ads
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Fresh Listings (8 cards with 30ms stagger fade-up) */}
      <section className="py-12 sm:py-16 bg-bg">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-micro font-semibold uppercase tracking-[0.06em] text-text-muted block mb-1">
                Recently Added
              </span>
              <h2 className="text-h2 font-semibold text-text font-heading">
                Fresh Listings Near You
              </h2>
            </div>
            <Link
              href="/listings?sort=newest"
              className="inline-flex items-center gap-1.5 text-small font-medium text-primary hover:text-primary-hover group"
            >
              <span>View all fresh ads</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {freshListings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(index * 0.03, 0.24), // cap stagger at 8 items
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <ProductCard listing={listing} priority={index < 4} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works: Editorial Numbered Layout (Post -> Chat -> Meet) */}
      <section className="py-16 sm:py-20 border-t border-b hairline-border bg-surface">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-prose mb-12">
            <span className="text-micro font-semibold uppercase tracking-[0.06em] text-text-muted block mb-1">
              Frictionless Exchange
            </span>
            <h2 className="text-h2 font-semibold text-text font-heading">
              How BazaarX Works
            </h2>
            <p className="mt-2 text-base text-text-secondary leading-relaxed">
              We took out payment gateways, shipping delays, and platform middleman fees. Peer-to-peer means genuine local handovers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-6 rounded-card border hairline-border bg-bg space-y-4 relative">
              <span className="text-h1 font-bold text-primary/40 font-heading">
                01
              </span>
              <h3 className="text-h3 font-semibold text-text font-heading">
                Post in 60 Seconds
              </h3>
              <p className="text-small text-text-secondary leading-relaxed">
                Take a few photos on your phone, choose Sell or Rent, set your price, and describe the condition honestly.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-card border hairline-border bg-bg space-y-4 relative">
              <span className="text-h1 font-bold text-primary/40 font-heading">
                02
              </span>
              <h3 className="text-h3 font-semibold text-text font-heading">
                Direct Buyer Chat
              </h3>
              <p className="text-small text-text-secondary leading-relaxed">
                Chat directly with verified peers. Negotiate pricing, clarify specifications, and settle on Cash or UPI.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-card border hairline-border bg-bg space-y-4 relative">
              <span className="text-h1 font-bold text-primary/40 font-heading">
                03
              </span>
              <h3 className="text-h3 font-semibold text-text font-heading">
                Meet & Hand Over
              </h3>
              <p className="text-small text-text-secondary leading-relaxed">
                Meet in a well-lit public spot or campus cafeteria. Inspect the product with your own hands before exchanging funds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner: No middleman. No delivery fees. Meet in person. */}
      <section className="py-12 bg-bg border-b hairline-border">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-card border hairline-border bg-surface p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2 text-primary font-semibold text-small">
                <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
                <span>The BazaarX Promise</span>
              </div>
              <h3 className="text-h2 font-semibold text-text font-heading">
                No middleman. No delivery fees. Meet in person.
              </h3>
              <p className="text-small text-text-secondary leading-relaxed">
                We believe the safest and cleanest way to buy, sell, or rent used goods is seeing the item in real life before any transaction takes place.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
              <Link href="/post">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Post Your First Ad
                </Button>
              </Link>
              <Link href="/safety">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Read Safety Tips
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
