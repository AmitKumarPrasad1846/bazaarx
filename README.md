# BazaarX

> A calm, direct peer-to-peer marketplace (buy, sell, rent) crafted with the interaction smoothness and design restraint of Linear, Vercel, and Raycast.

---

## Overview

BazaarX connects students, colleagues, and neighbors directly to buy, sell, and rent items within their local community:
- **Zero Middleman Taxes**: The platform never touches money. Settlement (Cash or UPI) is agreed directly between users.
- **In-Person Verification**: No platform delivery. Both parties meet safely in well-lit public areas to inspect items in person.
- **Frontend-Complete Architecture**: Fully functional typed data layer with Zustand and localStorage persistence for mock sessions, user-posted ads, chat threads, and saved wishlists. Everything persists across page reloads.

---

## Tech Stack & Versions

- **Framework**: Next.js 14 (`14.2.15`), React 18 (`18.3.1`), TypeScript (`5.6.3`) in strict mode.
- **Styling**: Tailwind CSS (`3.4.14`) configured with strict CSS variables matching the design token table.
- **Typography**: Local Satoshi font (`woff2` weights 500, 600, 700) + Inter loaded locally with zero layout shift and zero external CDN dependency.
- **State & Storage**: Zustand (`4.5.5`) with `persist` middleware to `localStorage`.
- **Form Management**: React Hook Form (`7.53.0`) + Zod (`3.23.8`).
- **Icons & Motion**: Lucide React (`0.453.0`), Framer Motion (`11.11.9`), Sonner (`1.5.0`), Next-Themes (`0.3.0`).
- **Command Palette**: `cmdk` (`1.0.0`) via Radix dialog primitives.

---

## 7 Core Routes

| Route | Purpose | Key Features |
|---|---|---|
| `/` | Home | Hero with 3% teal tint, search with category/city selects, pulse stats, category grid, fresh listings stagger, editorial how-it-works, trust banner, disclaimer footer. |
| `/listings` | Marketplace | Shareable URL-param filters (`type`, `category`, `city`, `min`, `max`, `condition`, `sort`, `q`), 240px sticky sidebar, mobile bottom sheet, active chips, empty state illustration, 12-item pagination. |
| `/product/[id]` | Product Detail | 55/45 two-column layout, lightbox gallery (keyboard arrows, 150ms swap), live rental calculator, make an offer dialog, safety banner, seller profile card, similar listings carousel, mobile sticky bottom bar. |
| `/post` | Post Ad | 3-step wizard with Zod validation, drag-and-drop uploader with cover tag and reordering, Sell/Rent sliding toggle, real-time live preview `ProductCard`, draft autosave & restore. |
| `/login` | Auth | 400px centered card on 4% dot pattern, login/register tabs, show/hide password, password strength meter, Google OAuth mock, forgot password dialog, mock session store. |
| `/chat` | Messaging | 3-pane layout, 4+ seeded chats, day separators, read receipts, quick reply chips, simulated seller typing indicator with 1.2-2.0s auto-replies, meeting scheduler date/time picker, `/chat?listing=ID` link handler. |
| `/dashboard` | Management | 4 stat cards with 200ms count-up, tabs for My Ads, Saved Wishlist, and Messages. Ad status badges, mark as sold, delete with confirm dialog and 5-second Undo toast. |

### Auxiliary Routes
- `/safety`: Safe in-person handover rules and scam avoidance guide.
- `/about`: The philosophy of direct peer exchange and design restraint.
- `/terms`: Terms of service and platform intermediary disclaimer.
- `/privacy`: Local-first data storage and privacy commitment.

---

## Design Decisions & Polish

1. **Hairline Border Language**: Avoided muddy multi-layered drop shadows in favor of crisp 1px borders (`hairline-border`) on subtle surfaces (`--surface`, `--surface-elevated`).
2. **Strict Radii Hierarchy**: Inputs: `6px`, Cards: `8px`, Buttons: `10px`, Modals: `12px`. Zero pill buttons. Circles are strictly reserved for avatars and status dots.
3. **Restrained Color Tokens**: Single primary teal (`#0D7377` light, `#14B8A6` dark), warm accent amber (`#E8A33D` / `#F59E0B`), and semantic tints (`bg-success/10`, `bg-info/10`). Zero purple gradients, no neon glassmorphism.
4. **Flicker-Free Theme Switching**: Toggling theme injects a temporary `theme-switching` class on `<html>` for 300ms smooth CSS variable transitions without hydration mismatch.
5. **Reduced Motion**: Full support for `prefers-reduced-motion` across page transitions, count-ups, and dialog animations.

---

## Folder Structure

```
/app
  /about, /chat, /dashboard, /listings, /login, /post, /privacy, /product, /safety, /terms
  layout.tsx, template.tsx, loading.tsx, error.tsx, not-found.tsx
/components
  /auth         AuthGuard, LoginClient
  /chat         ConversationList, Thread, ContextPanel, ChatClient
  /dashboard    StatCard, DashboardClient
  /layout       Header, Footer, Logo, ThemeToggle, ThemeProvider, CommandPalette
  /listing      ProductCard, ProductCardSkeleton, ListingsClient, GalleryLightbox,
                SellerCard, RentCalculator, SafetyTipsDialog, ReportDialog, MakeOfferDialog
  /post         StepIndicator, PhotoUploader, PostAdClient
  /ui           Button, Input, Badge, PaymentBadge, SegmentedControl,
                Dialog, Sheet, Select, Checkbox, RadioGroup, DropdownMenu, Command
/data
  listings.ts (24 realistic Indian items), users.ts, conversations.ts, cities.ts
/docs
  DESIGN.md
/lib
  fonts.ts, format.ts, utils.ts, store (listingsStore, chatStore, authStore)
/public
  /fonts (Satoshi local woff2 files + Inter ttf files)
/styles
  globals.css (Tailwind layers, CSS tokens, reduced motion, hairline borders)
```

---

## Setup & Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production (verifies TypeScript strictness and SSG pages)
npm run build

# 4. Run ESLint checks
npm run lint
```

---

## Known Scope & Limitations

- **Simulated Backend**: Per specifications, there is no physical PostgreSQL or MongoDB instance. All state is modeled with typed Zustand stores and backed by browser `localStorage`.
- **Payment Settlement**: BazaarX does not integrate Stripe, Razorpay, or escrow wallets. In accordance with product philosophy, buyers and sellers settle directly in cash or UPI during their in-person meetup.
- **SMS / Push Notifications**: Simulated in-app via Sonner toast notifications and typing status indicators.

