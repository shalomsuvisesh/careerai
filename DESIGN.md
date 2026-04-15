# Design Brief: CareerAI

**Tone**: Conversational, trustworthy, action-driven | **Category**: Productivity (Career tools + AI chat) | **Primary aesthetic**: Dark-first, editorial clean, refined minimalism

## Color Palette

| Token | Light | Dark | Role |
|-------|-------|------|------|
| Background | `0.98 0 0` off-white | `0.12 0 0` charcoal-950 | Page foundation |
| Foreground | `0.15 0 0` charcoal | `0.95 0 0` off-white | Text primary |
| Card | `1 0 0` white | `0.18 0 0` charcoal-900 | Elevated surfaces |
| Primary | `0.15 0 0` charcoal | `0.95 0 0` off-white | Buttons, active |
| Accent | `0.85 0.20 127` lime-500 | `0.85 0.20 127` lime-500 | CTAs, highlights, feature borders |
| Muted | `0.95 0 0` subtle | `0.22 0 0` dark-subtle | Secondary content |
| Destructive | `0.58 0.24 27` red | `0.70 0.19 22` red | Error, warnings |

## Typography

| Tier | Font | Weight | Size | Use |
|------|------|--------|------|-----|
| Display | Space Grotesk | 700 | 36–48px | Landing hero, feature titles |
| Body | DM Sans | 400–500 | 14–16px | Quiz questions, chat, UI copy |
| Mono | Geist Mono | 400 | 12–14px | Code, technical resume snippets |

## Structural Zones

| Zone | Background | Border | Treatment |
|------|------------|--------|-----------|
| Header | `0.18 0 0` charcoal-900 | Bottom: `0.85 0.20 127` lime-500 (1px) | Logo, navigation, lime accent line |
| Landing Hero | `0.18 0 0` charcoal-900 → `0.12 0 0` bg gradient | None | Headline + 4 feature cards with lime top borders |
| Feature Cards | `0.18 0 0` charcoal-900 | Top: `0.85 0.20 127` lime-500 (3px) | Icon + title + description, hover shadow |
| Chat Sidebar | `0.18 0 0` charcoal-900 | Right: border-border (1px) | History cards, hover→accent border |
| Chat Main | `0.12 0 0` charcoal-950 | None | Message bubbles, full-height scrollable |
| Input Footer | `0.18 0 0` charcoal-900 | Top: border-border (1px) | Textarea + send button |

## Component Patterns

- **Feature cards**: Top lime border + charcoal-900 bg, hover shadow lift, no gradients
- **CTAs**: Lime-500 bg, charcoal text, medium weight, hover opacity-90
- **Chat bubbles**: User (primary), AI (secondary bg + subtle lime gradient overlay at 0.08 opacity, 135°)
- **Forms**: Career-input class — border-border focus ring-2 ring-accent
- **Cards**: Rounded-lg (0.625rem), muted/30 bg on dark, hover→muted/50

## Motion & Animation

- **Entrance**: Fade-in 0.4s for chat messages, smooth slide for modals
- **Interaction**: All elements use `transition-smooth` (0.3s cubic-bezier)
- **No bounce, no playful easing** — professional restraint

## Signature Detail

Lime-500 (3px) top border on every feature card binds landing page visual hierarchy. Subtle lime gradient overlay (0.08 opacity) on AI chat bubbles reinforces "AI-powered" without gaudiness. Lime accent lines on header, sidebar, footer create cohesive lime thread throughout UI.

## Constraints

- **No decorative AI avatars or images in chat UI** — message bubbles only
- Lime-500 reserved for accents, borders, CTAs — use sparingly
- Dark mode optimized; no light-mode-only styling
- Spacing: Compact in sidebar history (p-3), generous in message bubbles (px-4 py-2.5)
- Zero generic blues or default Tailwind—tailored lime + charcoal only
