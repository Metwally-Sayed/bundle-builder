# Bundle Builder

Wyze security system bundle configurator — multi-step accordion with a sticky review panel.

## Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** (via `@tailwindcss/vite`)
- **Design tokens** in `src/styles/tokens.css` — all colors, radii, spacing, shadows as CSS custom properties derived from Figma. Components use `var(--…)` exclusively (no raw values).
- **Gilroy** self-hosted in `public/fonts/` — commercial font not available on Google Fonts.

## Decisions & Tradeoffs

| Decision | Rationale |
|---|---|
| Tailwind v4 `color-mix()` opacity | Tailwind replaced the v3 opacity modifier approach with `color-mix()`. This requires browser support for `color-mix(in oklab, …)`. Falls back to solid color on older browsers. |
| Design tokens as CSS vars vs Tailwind theme | Keeps values visible in DevTools and decouples from Tailwind's config. Downside: Tailwind's arbitrary value syntax (`text-[var(--color-text)]`) is more verbose than a dedicated theme key. |
| Self-hosted Gilroy `.ttf` | Gilroy isn't on Google Fonts. Using `.ttf` (not `.woff2`) — convert to woff2 for production to reduce bundle size. |
| Flat accordion (no card wrapper) | Each step is a standalone section separated by dividers, matching the Wyze design. The open step has a panel background; closed steps just show the header. |
| `selectedItems` filtering per category | Review groups filter the flat selected items array by `reviewCategory` at render time. This is simple but recalculates on every render; not a concern at this scale. |
| Sticky review panel | `position: sticky` on desktop for the right panel. On compact layouts it reorganizes into a two-column (md+) or single-column layout. The `compact` prop adds several conditional classes — a responsive strategy (e.g. container queries) would be cleaner but isn't supported in all target browsers. |
| No state library | All state is lifted to the root `BundleBuilder` component. Fine for a single-page configurator; would need extraction if steps became deeply nested. |

## Development

```sh
npm run dev
npm run build
npm run lint
```
