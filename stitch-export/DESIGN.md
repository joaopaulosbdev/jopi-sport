---
name: Pitch Volt
colors:
  surface: '#121415'
  surface-dim: '#121415'
  surface-bright: '#37393b'
  surface-container-lowest: '#0c0e10'
  surface-container-low: '#1a1c1d'
  surface-container: '#1e2021'
  surface-container-high: '#282a2c'
  surface-container-highest: '#333537'
  on-surface: '#e2e2e4'
  on-surface-variant: '#c6c9ac'
  inverse-surface: '#e2e2e4'
  inverse-on-surface: '#2f3132'
  outline: '#909378'
  outline-variant: '#454932'
  surface-tint: '#b7d300'
  primary: '#ffffff'
  on-primary: '#2c3400'
  primary-container: '#d2f100'
  on-primary-container: '#5c6b00'
  inverse-primary: '#576500'
  secondary: '#c8c5ca'
  on-secondary: '#303033'
  secondary-container: '#47464a'
  on-secondary-container: '#b7b4b8'
  tertiary: '#ffffff'
  on-tertiary: '#2f3035'
  tertiary-container: '#e3e2e8'
  on-tertiary-container: '#64646a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d2f100'
  primary-fixed-dim: '#b7d300'
  on-primary-fixed: '#191e00'
  on-primary-fixed-variant: '#414c00'
  secondary-fixed: '#e4e1e6'
  secondary-fixed-dim: '#c8c5ca'
  on-secondary-fixed: '#1b1b1e'
  on-secondary-fixed-variant: '#47464a'
  tertiary-fixed: '#e3e2e8'
  tertiary-fixed-dim: '#c7c6cc'
  on-tertiary-fixed: '#1a1b20'
  on-tertiary-fixed-variant: '#46464c'
  background: '#121415'
  on-background: '#e2e2e4'
  surface-variant: '#333537'
typography:
  display-xl:
    fontFamily: Oswald
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 76px
    letterSpacing: -0.02em
  display-xl-mobile:
    fontFamily: Oswald
    fontSize: 44px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Oswald
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Oswald
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: 0em
  headline-md:
    fontFamily: Oswald
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: 0em
  headline-md-mobile:
    fontFamily: Oswald
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  headline-sm:
    fontFamily: Oswald
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: 0.02em
  title-md:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.1em
spacing:
  gutter: 1.25rem
  gutter-mobile: 0.75rem
  gutter-desktop: 1.5rem
  margin: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system channels the raw kinetic energy of stadium floodlights and modern soccer kit culture, fusing high-performance athletics with premium streetwear fashion. The aesthetic speaks directly to kit collectors, casual players, and football fashion obsessives who view club jerseys as core lifestyle apparel rather than mere matchday replica wear.

The emotional signature is electric, uncompromising, and aspirational. The UI leans heavily into a refined dark-mode aesthetic with surgical strikes of high-voltage neon yellow that replicate pitch perimeter LED boards, referee card flashes, and technical boot trims. The visual language blends High-Contrast / Bold styling with technical Brutalism: stark jet blacks, deep charcoal graphite planes, sharp rectilinear containers, monospaced tech specifications, and high-impact condensed typography. 

Contrast is dialed to the maximum threshold to command immediate attention, treating every kit drop like an exclusive high-fashion release. Micro-interactions are snappy and assertive, evoking the immediate response of elite football boots planting on firm ground.

## Colors

The palette is engineered around high luminance contrast against deep, carbon-inspired surfaces to mimic the look of floodlit night matches.

- **Primary (`#D8F800` - Electric Volt):** The explosive highlight tone. Reserved strictly for primary callouts, purchase buttons, live stock status indicators, sale badges, and focus rings. Never dilute this color by using it across large background fills; treat it like an electric strike.
- **Secondary (`#0F0F12` - Pitch Obsidian):** The foundational backdrop. A deeply tuned black that provides superior depth and reduces OLED power draw while avoiding flat, dead `#000000`.
- **Tertiary (`#1E1F24` - Carbon Charcoal):** Surface containers, card backgrounds, elevated sheets, and drawer panels. Delivers structural zoning without resorting to stark border separations.
- **Neutral (`#F4F4F6` - Stadium White):** Crisp, readable text elements, primary headlines, active icons, and structural divider lines when dialed to lower opacities (10–20%).
- **Support Accents:**
  - `Surface Accent` (`#2A2B33`): Hover states and interactive boundaries.
  - `Muted Slate` (`#8C8F9A`): Meta labels, secondary specs, sizing charts, and kit year tags.
  - `Match Red` (`#FF3344`): Final whistle alerts, low inventory warning counts (<5 kits remaining), and form errors.

## Typography

The type system pairs the condensed, commanding swagger of stadium scoreboards and jersey name sets (`Oswald`) with the technical, angular precision of high-spec garment design (`Space Grotesk`).

- **Display & Headlines (`Oswald`):** All-caps treatment should be standard for kit titles, marquee collection drops, score alerts, and price tags. It provides an immediate editorial punch reminiscent of football zines and high-performance kit packaging. Line heights are tightly managed to ensure stacked phrases feel monolithic.
- **Body & Product Metadata (`Space Grotesk`):** Provides a balanced, slightly geometric aesthetic that brings modern techwear sensibilities into descriptions, kit specifications, fabric compositions, and sizing tables.
- **Labels & Badging:** Always set in uppercase with increased letter spacing (`0.05em` to `0.1em`). This applies to kit editions (e.g., "AUTHENTIC MATCH ISSUE", "REPLICA", "ARCHIVE '98"), countdown timers, sizing indicators, and stock chips.

## Layout & Spacing

The layout is constructed on an assertive 12-column fluid grid system on desktop, reflowing to a 6-column system on tablet and a 2-column or 4-column system on mobile devices. 

- **Grid Alignment:** Product cards and banner modules utilize sharp, edge-to-edge alignment with minimal gaps to evoke editorial matchday lookbooks. On desktop, product grids standardise across 3 or 4 columns; on mobile, kit drops default to a dense 2-column browse or an immersive single-column full-width view.
- **Outer Canvas Margins:** Fluidly step from `1rem` on mobile to `3rem` on ultra-wide desktop breakpoints (1440px+), keeping the viewport tightly framed.
- **Internal Component Spacing:** Strict adherence to an 8-point base rhythm. Padding inside product and badge containers remains dense (`space-xs` and `space-sm`) to maximize visible photographic real estate. Generous vertical section dividers (`space-xl` and above) separate marquee drops, jersey customization modules, and club archive showcases.

## Elevation & Depth

This design system avoids soft, traditional drop shadows in favor of **Tonal Layers** accented with razor-sharp borders and focused neon chromatic glow effects.

- **Base Floor (`#0F0F12`):** Primary canvas background on which uncontained components sit.
- **Container Surfaces (`#1E1F24`):** Cards, collection pods, and utility drawers sit directly on this layer, separated by a `1px` high-contrast outline (`rgba(244, 244, 246, 0.08)`).
- **Interactive Depth & Focus:** Active or focused states discard drop shadows in favor of a `1px` or `2px` solid `#D8F800` border, supplemented exclusively on primary CTAs by an intense neon aura: `0px 0px 24px rgba(216, 248, 0, 0.35)`.
- **Modals, Flyouts & Drawers:** High z-index surfaces (Cart Drawer, Filter Sheet, Player Print Customizer) employ a deep carbon background with a 100% black backdrop blur filter (`backdrop-filter: blur(16px); background: rgba(15, 15, 18, 0.85)`), producing a stadium floodlight vignette effect.

## Shapes

The design system employs a **Sharp (`0`)** shape language. All corners—spanning product tiles, primary action buttons, input fields, kit badges, and countdown timers—are set to `0px` radius.

This strict geometric discipline enforces an athletic, high-octane technical feel, avoiding casual softness. Sharp angles mimic the cut of athletic kit panels, technical collar ribbings, and matchday pitch markings. Angled chamfers (`clip-path: polygon(...)`) may optionally be applied to specific limited-edition drop badges and player number personalization tags to replicate jersey patch geometry.

## Components

### Buttons
- **Primary Button ("Add to Bag" / "Drop Access"):** Solid `#D8F800` background, rich `#0F0F12` text, `0px` border radius, uppercase `Oswald` bold typography with subtle letter spacing. Hover shifts background to white (`#F4F4F6`) with an instant 0.15s cubic-bezier ease; active state scales down to `0.98`.
- **Secondary Button ("View Kit Details"):** Transparent background, `1px` solid `#F4F4F6` border, `#F4F4F6` text. Hover inverts the button with a solid `#F4F4F6` background and `#0F0F12` text.
- **Ghost/Tertiary:** Understated text link accented by a sliding `#D8F800` underline indicator.

### Badges, Counters & Micro-Chips
- **Stock Counter:** Pitch black pill or square tag with a pulsing `6px` circular LED indicator in `#D8F800` (In Stock) or `#FF3344` (Final Few / Sold Out). Monospaced sizing.
- **Edition Tags ("Match Authentic", "Archive Deadstock"):** High-contrast micro-chips with `1px` solid `#D8F800`, transparent fill, and uppercase `label-sm` volt typography.
- **Size Selector Chips:** Boxy square containers (`48px x 48px`). Inactive has a dark charcoal border; selected state fills `#D8F800` with black text. Out-of-stock items feature a subtle diagonal slash through the tile.

### Product Cards
- Flat surfaces (`#1E1F24`) framed by hairline borders. The jersey imagery dominates the top aspect (4:5 vertical athletic crop).
- Card footer displays club name, kit type (Home / Away / Third / Special Edition), and release price in bold condensed type.
- A quick-add drawer or hover reveal triggers an instant size breakdown overlay without navigating away from the grid.

### Input Fields & Selectors
- Background set to `#16171B`, border set to `1px` solid `#2A2B33`.
- Input text rendered in `#F4F4F6` with `#8C8F9A` placeholder cues.
- On focus, border snaps instantly to `#D8F800` with no rounding.

### Customization Bar (Jersey Personalization Module)
- Dedicated interactive block allowing shoppers to input player name and squad number.
- Provides a real-time kit badge preview with monospaced typography, font style selections (Cup Font vs. League Font), and sleeve patch toggles (Champions League / Domestic League badges).