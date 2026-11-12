# BazaarX Design System & Architecture

> "OLX's usefulness with Linear's design quality." Calm, precise, trustworthy.

---

## 1. Principles

1. **Restraint over excess**: No gratuitous gradients, no neon glassmorphism, no bouncy springs. Surfaces and hairline borders provide depth instead of heavy drop shadows.
2. **Direct Peer-to-Peer**: The platform connects buyers and sellers directly. Payment and physical exchange occur in person. The design communicates safety, clarity, and trust at every touchpoint.
3. **Motion with purpose**: 100ms / 150ms / 200ms / 300ms durations only. Animate transform and opacity only. Respect `prefers-reduced-motion`.

---

## 2. Color Tokens

Implemented as CSS variables in `styles/globals.css` with dark mode support via `.dark` class:

| Token | Light | Dark | Purpose |
|---|---|---|---|
| `--bg` | `#FAFAF7` | `#0C0C0E` | Main application background |
| `--surface` | `#FFFFFF` | `#18181B` | Primary cards, panels, inputs |
| `--surface-elevated` | `#FFFFFF` | `#1F1F23` | Dropdowns, popovers, hover states |
| `--text` | `#0A0A0A` | `#FAFAFA` | Primary high-contrast text |
| `--text-secondary` | `#52525B` | `#A1A1AA` | Secondary body text and labels |
| `--text-muted` | `#71717A` | `#71717A` | Captions, timestamps, disabled items |
| `--border` | `#E4E4E7` | `#27272A` | Standard 1px structural borders |
| `--border-strong` | `#D4D4D8` | `#3F3F46` | Emphasized dividers and active borders |
| `--primary` | `#0D7377` | `#14B8A6` | Brand teal accent, primary action buttons |
| `--primary-hover` | `#0A5F63` | `#2DD4BF` | Hover state for primary actions |
| `--accent` | `#E8A33D` | `#F59E0B` | Warm attention calls, safety notices |
| `--success` | `#15803D` | `#22C55E` | Cash payment badge, active status |
| `--danger` | `#DC2626` | `#EF4444` | Destructive actions, validation errors |
| `--info` | `#2563EB` | `#60A5FA` | Online payment badge |

---

## 3. Typography

- **Headings & Brand**: Satoshi (Fontshare local woff2, weights 500/600/700)
- **Body & Controls**: Inter (Google Fonts)
- **Numbers & Prices**: Always with `tabular-nums` and formatted with `formatPrice()` using Indian numbering system (`₹1,45,000`).

Fluid Scale:
- Hero: `clamp(2.25rem, 5vw, 3.5rem)`
- H1: `32px` / -0.025em / 1.2
- H2: `24px` / -0.02em / 1.25
- H3: `18px` / -0.015em / 1.3
- Body: `15px` / 1.6
- Small: `13px` / 1.5
- Micro: `11px` / uppercase / tracking 0.05em

---

## 4. Radii & Geometry

- **Inputs**: `6px` (`rounded-input`)
- **Cards**: `8px` (`rounded-card`)
- **Buttons**: `10px` (`rounded-btn`)
- **Modals / Drawers**: `12px` (`rounded-modal`)
- **Rule**: No pill buttons. Avatars and status indicators are the only circular elements.

---

## 5. Motion Rules

- `--ease-out`: `cubic-bezier(0.16, 1, 0.3, 1)`
- `--ease-sheet`: `cubic-bezier(0.32, 0.72, 0, 1)`
- Page transition: `fade + translateY(8px)` in 200ms ease-out via `template.tsx`.
- Header: backdrop-blur toggles after 20px window scroll.
- Theme switch: 300ms transition class added to `<html>` to ensure flicker-free switching.

