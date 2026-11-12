import * as React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/layout/Logo';
import { ShieldCheck, MapPin, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto border-t hairline-border bg-surface text-text-secondary text-small">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b hairline-border">
          {/* Brand col */}
          <div className="md:col-span-5 space-y-4">
            <Logo showTagline />
            <p className="text-text-muted text-base max-w-sm">
              A calm, direct peer-to-peer marketplace to buy, sell, and rent items within your local community.
            </p>
            <div className="flex items-center gap-2 text-micro text-text-muted">
              <ShieldCheck className="w-4 h-4 text-primary stroke-[1.5]" />
              <span>Zero middleman commission · 100% direct handover</span>
            </div>
          </div>

          {/* Categories */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-micro font-semibold text-text uppercase tracking-wider">
              Browse Categories
            </p>
            <ul className="space-y-2 text-text-muted">
              <li>
                <Link href="/listings?category=electronics" className="hover:text-text transition-colors">
                  Electronics & Gadgets
                </Link>
              </li>
              <li>
                <Link href="/listings?category=vehicles" className="hover:text-text transition-colors">
                  Bikes & Vehicles
                </Link>
              </li>
              <li>
                <Link href="/listings?category=furniture" className="hover:text-text transition-colors">
                  Home & Furniture
                </Link>
              </li>
              <li>
                <Link href="/listings?category=property" className="hover:text-text transition-colors">
                  Property & Rentals
                </Link>
              </li>
              <li>
                <Link href="/listings?category=fashion" className="hover:text-text transition-colors">
                  Fashion & Wearables
                </Link>
              </li>
              <li>
                <Link href="/listings?category=books" className="hover:text-text transition-colors">
                  Books & Study Material
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Static Pages */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-micro font-semibold text-text uppercase tracking-wider">
              Trust & Safety
            </p>
            <ul className="space-y-2 text-text-muted">
              <li>
                <Link href="/safety" className="hover:text-text transition-colors">
                  Safety Guidelines
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-text transition-colors">
                  About BazaarX
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-text transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-text transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Cities shortcut */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-micro font-semibold text-text uppercase tracking-wider">
              Popular Cities
            </p>
            <ul className="space-y-2 text-text-muted">
              <li>
                <Link href="/listings?city=Mumbai" className="hover:text-text transition-colors flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 stroke-[1.5]" /> Mumbai
                </Link>
              </li>
              <li>
                <Link href="/listings?city=Delhi" className="hover:text-text transition-colors flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 stroke-[1.5]" /> Delhi NCR
                </Link>
              </li>
              <li>
                <Link href="/listings?city=Bangalore" className="hover:text-text transition-colors flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 stroke-[1.5]" /> Bangalore
                </Link>
              </li>
              <li>
                <Link href="/listings?city=Pune" className="hover:text-text transition-colors flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 stroke-[1.5]" /> Pune
                </Link>
              </li>
              <li>
                <Link href="/listings?city=Hyderabad" className="hover:text-text transition-colors flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 stroke-[1.5]" /> Hyderabad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer banner required on every page */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-small text-text-muted">
          <p className="max-w-2xl leading-relaxed text-micro sm:text-small">
            <span className="font-semibold text-text">Platform Disclaimer:</span> BazaarX only connects people. Payments and delivery happen directly between buyer and seller. We never hold funds or provide escrow.
          </p>
          <div className="flex items-center gap-4 text-micro shrink-0">
            <span>© {new Date().getFullYear()} BazaarX</span>
            <span>·</span>
            <span>Crafted for college peer exchange</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

