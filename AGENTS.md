# AGENTS.md

## Project

VigIA landing page — single-page Astro site with cinematic GSAP animations and Tailwind CSS.

- **Stack**: Astro 6 + Tailwind CSS 4 + GSAP 3 + TypeScript
- **Package manager**: pnpm (do not use npm)
- **Node**: >= 22.12.0 (strict)
- **Site**: `https://vigia.dev`

## Commands

```bash
pnpm install    # install deps
pnpm dev        # dev server at localhost:4321
pnpm build      # production build
pnpm preview    # preview production build
```

No lint, typecheck, or test scripts are configured. `pnpm build` is the only verification step available.

## Structure

- `src/pages/index.astro` — single entry point (entire site)
- `src/layouts/Layout.astro` — SEO layout with JSON-LD, OG tags, hreflang
- `src/styles/global.css` — design tokens (`@theme` block) + base styles
- `src/scripts/main.ts` — all GSAP animations (hero, scroll, cursor, i18n)
- `src/i18n/translations.ts` — ES/EN translation strings
- `public/` — static assets (favicon, robots.txt)

## Key Conventions

- **i18n is client-side**: JS swaps `data-i18n-es` / `data-i18n-en` attributes. No Astro i18n routing.
- **Tailwind v4**: uses `@import "tailwindcss"` + `@theme` for design tokens (not `tailwind.config.*`).
- **GSAP is the animation library**: registered plugins are `ScrollTrigger` and `ScrollToPlugin`. Animations respect `prefers-reduced-motion`.
- **Vite 7 override**: `package.json` overrides vite to v7 — do not downgrade.
- **TypeScript**: strict mode via `astro/tsconfigs/strict`. No separate tsconfig.
- **astro.config.mjs**: has `@ts-expect-error` for `@tailwindcss/vite` type mismatch — this is intentional.

## Gotchas

- The site has no automated testing or linting. Manual `pnpm build` is the only check.
- Animations are in `src/scripts/main.ts`, not components — edit there for animation changes.
- Design tokens are in `global.css` under `@theme`, not in a Tailwind config file.
- The `global.css` has `@source` directives pointing to `../**/*.astro` and `../**/*.ts` — Tailwind v4 content scanning.
