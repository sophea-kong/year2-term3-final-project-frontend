---
name: Academic Vitality
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3d4a42'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#6d7a72'
  outline-variant: '#bccac0'
  surface-tint: '#006c4a'
  primary: '#006948'
  on-primary: '#ffffff'
  primary-container: '#00855d'
  on-primary-container: '#f5fff7'
  inverse-primary: '#68dba9'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#96928b'
  on-secondary-container: '#684000'
  tertiary: '#0051d5'
  on-tertiary: '#ffffff'
  tertiary-container: '#316bf3'
  on-tertiary-container: '#fefcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#85f8c4'
  primary-fixed-dim: '#68dba9'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#005137'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#dbe1ff'
  tertiary-fixed-dim: '#b4c5ff'
  on-tertiary-fixed: '#00174b'
  on-tertiary-fixed-variant: '#003ea8'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Source Serif 4
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Source Serif 4
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Source Serif 4
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Source Serif 4
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  container-max: 1280px
---

## Brand & Style
This design system is built for a modern academic environment that prioritizes intellectual momentum and clarity. The brand personality is **scholarly yet spirited**, moving away from the dry, institutional aesthetics of legacy education platforms toward a more energetic, high-performance interface.

The design style is **Corporate Modern with High-Contrast accents**. It utilizes generous white space and sharp typography to maintain professional authority, while injecting vibrant color and purposeful motion to guide the user's attention. The emotional response should be one of "focused energy"—minimizing cognitive load for students and faculty while providing a stimulating visual environment for research and resource management.

## Colors
The palette is centered around **Academic Emerald**, a saturated and professional green that evokes growth and tradition without the dullness of forest greens. This is paired with **Solar Amber**, a rich secondary accent reserved strictly for high-priority calls-to-action and critical highlights.

- **Primary (Emerald):** Used for navigation, primary branding, and successful states. It provides a stable, trustworthy foundation.
- **Secondary (Amber):** Used for CTA buttons, "New" badges, and urgent reserve notifications.
- **Tertiary (Electric Blue):** Used for links, interactive text, and secondary UI elements to provide a "digital-first" feel.
- **Neutrals:** A range of deep slate grays and cool whites ensure the content remains the hero. All color combinations are strictly audited to meet WCAG AA standards for accessibility.

## Typography
The typography strategy creates a sophisticated tension between the old and the new. **Source Serif 4** provides an authoritative, literary feel for headlines and titles, anchoring the platform in academic tradition. 

**Hanken Grotesk** is used for all UI elements, body text, and labels. Its sharp, contemporary geometry ensures high legibility on digital screens and provides the "vibrant" efficiency required for a modern system. On mobile devices, headline sizes scale down to prevent excessive line-breaking, while maintaining the characteristic serif presence.

## Layout & Spacing
This design system employs a **fixed-fluid hybrid grid**. Content is contained within a maximum width of 1280px to prevent excessive line lengths in research text, but background elements stretch to the viewport edge.

- **Desktop:** A 12-column grid with 24px gutters. Use large 48px margins to create a "canvas" feel that reduces visual clutter.
- **Tablet:** 8-column grid with 24px gutters.
- **Mobile:** 4-column grid with 16px margins. 

The spacing rhythm follows a 4px baseline unit. High-density data views (like reserve lists) should use tight vertical spacing, while informational landing pages should use generous "white space" to promote focus.

## Elevation & Depth
Depth is communicated through **tonal layering and low-contrast outlines** rather than heavy shadows. This maintains a clean, modern look that doesn't feel "muddy."

- **Level 0 (Base):** The main background color, typically a very light cool gray (#F8FAFC).
- **Level 1 (Cards):** Pure white surfaces with a 1px border (#E2E8F0).
- **Level 2 (Interactive):** Elements that are being hovered or dragged use a subtle, diffused shadow (Blur: 12px, Opacity: 4%) with a slight emerald tint to reinforce the brand color.
- **Level 3 (Modals):** High-contrast elevation with a dark scrim background to pull the user's focus entirely to the task at hand.

## Shapes
To maintain a professional and structured aesthetic, the design system utilizes **Soft** roundedness. 

- **Standard Elements:** Buttons, input fields, and tags use a 0.25rem (4px) radius. This provides just enough softness to feel modern without losing the "serious" architectural feel of an academic tool.
- **Large Elements:** Cards and containers use 0.5rem (8px) or 0.75rem (12px) for a more pronounced structural separation. 
- **Icons:** Should follow a 2px stroke weight with slight rounding on terminals to match the font geometry of Hanken Grotesk.

## Components
### Buttons
- **Primary:** Solid Academic Emerald with white text. High-contrast and bold.
- **Action/CTA:** Solid Solar Amber with deep neutral text (#0F172A) for maximum visibility on "Reserve Now" or "Submit" actions.
- **Ghost:** Emerald border with transparent background, used for secondary actions.

### Inputs & Selects
Form fields use a white background with a 1px Slate-200 border. Upon focus, the border transitions to a 2px Emerald stroke with a subtle outer glow.

### Reserve Cards
Cards representing books or digital files should feature a high-contrast top-border (2px Emerald) to give the layout a structured, "catalog" feel.

### Chips & Badges
Use high-saturation backgrounds with white text for status indicators (e.g., "Available", "On Hold"). For category tags, use low-opacity Emerald backgrounds with dark Emerald text to keep the UI from becoming overwhelming.

### Lists
Data lists should use alternating row highlights (zebra striping) in a very faint Slate-50 to assist with horizontal scanning of long bibliographic entries.