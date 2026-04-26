# Silvertone Design Co.

Portfolio site for LaBrew Solomon II — UX/UI and Product Designer based in
Richmond, VA. Built per the engineering spec + Addendum A from
`~/Downloads/silvertone_engineering_spec.md` and
`~/Downloads/silvertone_spec_addendum.md`.

## Quick start

```bash
nvm use                    # picks up Node 20 from .nvmrc
pnpm install
pnpm dev                   # http://localhost:3000
```

### Common scripts

| Script | Purpose |
|--------|---------|
| `pnpm dev` | Dev server with HMR |
| `pnpm build` | Production build (static export) |
| `pnpm start` | Serve the production build locally |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test` | Vitest unit tests |
| `pnpm test:e2e` | Playwright e2e (run `pnpm exec playwright install` first) |
| `pnpm test:a11y` | Axe accessibility tests |
| `pnpm format` | Prettier write |
| `pnpm analyze` | Bundle analyzer report |

## Architecture

```
src/
├── app/              Next 14 App Router routes
│   ├── (page).tsx    Home, /work, /work/[slug], /about, /feed, /connect
│   ├── styleguide/   Internal design system reference (noindex)
│   ├── not-found.tsx 404
│   ├── error.tsx     500
│   ├── layout.tsx    Root layout (metadata, fonts, providers)
│   ├── sitemap.ts    /sitemap.xml
│   └── robots.ts     /robots.txt
├── components/
│   ├── primitives/   Eyebrow, DisplayHeading, MetaRow, TagPill, Wordmark, Divider
│   ├── compounds/    HoverImage, WorksRow, SelectedWorksList, ConnectBand, StatCard
│   ├── layout/       Header, Footer, MobileMenu, SkipLink, Section
│   ├── motion/       LenisProvider, RevealOnScroll
│   └── mdx/          FullImage, TwoColumn, PullQuote, Spacer
├── content/
│   └── works/        MDX project case studies + _template.mdx
├── lib/
│   ├── cn.ts         clsx + tailwind-merge configured for our theme
│   ├── content.ts    MDX loader with Zod schema validation
│   └── nav.ts        PRIMARY_NAV + CONTACT_LINKS
├── hooks/            usePrefersReducedMotion, useMediaQuery, useHasMounted
└── types/            Work, WorkTag, WorkField

mdx-components.tsx    Next 14 MDX customization (root-level)
tailwind.config.ts    Design tokens per Addendum A §A2 (canonical)
```

## Adding a new project case study

1. Create `src/content/works/{year}-{slug}.mdx` (filename convention enforced)
2. Use `_template.mdx` as the starting point
3. Frontmatter is validated at build time by Zod (`src/lib/content.ts`)
4. Required fields: `slug`, `title`, `client`, `year`, `role`, `duration`,
   `tags`, `fields`, `summary` (40-180 chars), `cover`, `featured`, `order`,
   `published`. Optional: `hoverPreview`, `outcomes`.
5. Project covers go in `public/images/works/{slug}/cover.jpg`
   (1600×1200 minimum, 4:3 preferred, ≤400KB per §8.2)
6. MDX body components: `<FullImage>`, `<TwoColumn>` + `<Column>`,
   `<PullQuote>`, `<StatCard>`, `<Spacer>`
7. Avoid raw `{{ }}` in MDX body — wrap in backticks (` `{{ TBD }}` `) or
   they'll trip JSX expression parsing

## Design tokens

Authority: **Addendum A §A2 supersedes main spec §4**. All values live in
`tailwind.config.ts` under `theme.extend`. Color palette is warm-shifted
(bone.base #F4F1EC) per §A2.1. Display sizes use clamp() formulas baked
into the tokens per §A2.2.2.

See `/styleguide` (dev) for live tokens + every primitive in every state.

## Deploy

See [`docs/DEPLOY.md`](./docs/DEPLOY.md) for the Step 16 runbook
(GitHub + Vercel + DNS).

## Owner action items before production deploy

- [ ] Provide actual LinkedIn URL (currently placeholder per §A3.2)
- [ ] Confirm Calendly URL (`https://calendly.com/silvertonedesignco`)
- [ ] Confirm public email (`silvertonedesignco@gmail.com`)
- [ ] Replace placeholder favicon set + OG image (run
      `pnpm exec node scripts/generate-brand-assets.mjs` once Clash
      Display is system-installed for proper text rendering)
- [ ] Replace `{{ TBD }}` content in 3 placeholder MDX files
- [ ] Run a Cappen DevTools measurement audit; if hero text size or
      section padding differ from the §A2 estimates by >10%, update
      tokens in `tailwind.config.ts`
- [ ] Resolve ESLint config (downgrade to 8.57.x or use compat shim)
- [ ] Decide whether to bump `next@14.2.13` to latest 14.2.x patch for
      the published security advisory

## Spec deviations log

See [`docs/DEVIATIONS.md`](./docs/DEVIATIONS.md) for the full list with
rationale per item.
