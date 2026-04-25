/**
 * /styleguide — internal design system reference (§10.8).
 *
 * Renders every primitive in every state, every type token at its actual
 * size, every color swatch with its contrast ratio, and the canonical
 * spacing scale. Step 13 will gate this behind ?dev=true and apply
 * `noindex`. Step 5+ will add motion examples (currently placeholdered).
 *
 * Server component — no interactivity required at this stage.
 */
import {
  Divider,
  DisplayHeading,
  Eyebrow,
  MetaRow,
  TagPill,
  Wordmark,
} from '@/components/primitives'
import { Section } from '@/components/layout'

// ──────────────────────────────────────────────────────────────────────
// Reference data
// ──────────────────────────────────────────────────────────────────────

type ColorRow = {
  token: string
  hex: string
  ratioOnBase?: string
  level?: 'AAA' | 'AA' | 'decorative'
  use: string
}

const INK_COLORS: ColorRow[] = [
  { token: 'ink.base', hex: '#0A0A0A', use: 'Primary background' },
  { token: 'ink.raised', hex: '#111111', use: 'Elevated surfaces (hover rows, modals)' },
  { token: 'ink.border', hex: '#1F1F1F', use: 'Hairline dividers (default)' },
  { token: 'ink.bright', hex: '#2A2A2A', use: 'Hairline dividers (hover state)' },
]

const BONE_COLORS: ColorRow[] = [
  {
    token: 'bone.base',
    hex: '#F4F1EC',
    ratioOnBase: '17.34:1',
    level: 'AAA',
    use: 'Primary text (warm-shifted, not clinical grayscale)',
  },
  {
    token: 'bone.muted',
    hex: '#A8A39C',
    ratioOnBase: '8.26:1',
    level: 'AAA',
    use: 'Secondary text',
  },
  {
    token: 'bone.faint',
    hex: '#6B665F',
    ratioOnBase: '4.51:1',
    level: 'AA',
    use: 'Eyebrows, tertiary text (≥14px only)',
  },
  {
    token: 'bone.ghost',
    hex: '#3D3A35',
    ratioOnBase: '1.81:1',
    level: 'decorative',
    use: 'Tag pill borders, very low contrast UI (no text)',
  },
]

const SIGNAL_COLORS: ColorRow[] = [
  { token: 'signal.error', hex: '#FF4646', use: 'Form validation, 404 states' },
  { token: 'signal.success', hex: '#5DFFB3', use: 'Form success state' },
]

type TypeRow = {
  token: string
  size: string
  use: string
  family: 'display' | 'body' | 'mono'
  className: string
}

const TYPE_SCALE: TypeRow[] = [
  {
    token: 'display-2xl',
    size: 'clamp(72, 20vw, 220)',
    use: 'Hero (most pages)',
    family: 'display',
    className: 'font-display text-display-2xl',
  },
  {
    token: 'display-xl',
    size: 'clamp(56, 16vw, 180)',
    use: 'Secondary hero',
    family: 'display',
    className: 'font-display text-display-xl',
  },
  {
    token: 'display-lg',
    size: 'clamp(48, 14vw, 140)',
    use: 'Page H1',
    family: 'display',
    className: 'font-display text-display-lg',
  },
  {
    token: 'h1',
    size: 'clamp(40, 10vw, 96)',
    use: 'Section header',
    family: 'display',
    className: 'font-display text-h1',
  },
  {
    token: 'h2',
    size: 'clamp(32, 8vw, 64)',
    use: 'Subsection header',
    family: 'display',
    className: 'font-display text-h2',
  },
  {
    token: 'h3',
    size: '32',
    use: 'Card title, project name',
    family: 'display',
    className: 'font-display text-h3',
  },
  {
    token: 'h4',
    size: '22',
    use: 'Small heading',
    family: 'display',
    className: 'font-display text-h4',
  },
  {
    token: 'body-lg',
    size: '18 / 17 / 16',
    use: 'Lead paragraph, hero subtitle',
    family: 'body',
    className: 'font-body text-body-lg',
  },
  {
    token: 'body',
    size: '15',
    use: 'Default body',
    family: 'body',
    className: 'font-body text-body',
  },
  {
    token: 'body-sm',
    size: '13',
    use: 'Caption, secondary description',
    family: 'body',
    className: 'font-body text-body-sm',
  },
  {
    token: 'mono-md',
    size: '13',
    use: 'Larger mono labels',
    family: 'mono',
    className: 'font-mono text-mono-md uppercase',
  },
  {
    token: 'mono-sm',
    size: '11',
    use: 'Standard eyebrow, metadata',
    family: 'mono',
    className: 'font-mono text-mono-sm uppercase',
  },
  {
    token: 'mono-xs',
    size: '10',
    use: 'Tag pills, navigation',
    family: 'mono',
    className: 'font-mono text-mono-xs uppercase',
  },
]

const SPACING_SCALE = [
  { token: '0.5', value: '2px' },
  { token: '1', value: '4px' },
  { token: '2', value: '8px' },
  { token: '3', value: '12px' },
  { token: '4', value: '16px' },
  { token: '5', value: '20px' },
  { token: '6', value: '24px' },
  { token: '8', value: '32px' },
  { token: '10', value: '40px' },
  { token: '12', value: '48px' },
  { token: '14', value: '56px' },
  { token: '16', value: '64px' },
  { token: '20', value: '80px' },
  { token: '24', value: '96px' },
  { token: '32', value: '128px' },
  { token: '36', value: '144px' },
  { token: '48', value: '192px' },
] as const

const WORDMARK_SIZES = ['nav', 'sm', 'md', 'lg', 'xl', 'display'] as const

// ──────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────

function ColorSwatch({ row }: { row: ColorRow }) {
  return (
    <div className="flex items-stretch gap-4 border-t border-ink-border py-4">
      <div
        className="h-16 w-24 shrink-0 border border-ink-border"
        style={{ backgroundColor: row.hex }}
        aria-hidden="true"
      />
      <div className="flex flex-1 flex-col gap-1">
        <p className="font-mono text-mono-sm uppercase text-bone-base">{row.token}</p>
        <p className="font-mono text-mono-xs text-bone-faint">{row.hex}</p>
        <p className="font-body text-body-sm text-bone-muted">{row.use}</p>
      </div>
      {row.ratioOnBase && (
        <div className="flex shrink-0 flex-col items-end justify-center gap-1 text-right">
          <p className="font-mono text-mono-xs uppercase text-bone-faint">
            {row.ratioOnBase}
          </p>
          <p
            className={
              row.level === 'AAA'
                ? 'font-mono text-mono-xs uppercase text-signal-success'
                : row.level === 'AA'
                  ? 'font-mono text-mono-xs uppercase text-bone-base'
                  : 'font-mono text-mono-xs uppercase text-bone-faint'
            }
          >
            {row.level}
          </p>
        </div>
      )}
    </div>
  )
}

function SubsectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 font-mono text-mono-xs uppercase tracking-[0.18em] text-bone-faint">
      {children}
    </p>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────────────────────────

export default function StyleguidePage() {
  return (
    <main className="min-h-screen pb-32">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <Section size="default">
        <Eyebrow number="000" label="Internal — design system reference" />
        <DisplayHeading as="h1" size="display-lg" className="mt-10">
          Styleguide.
        </DisplayHeading>
        <p className="mt-8 max-w-prose font-body text-body-lg text-bone-muted">
          Every primitive in every state, every type token at its actual size, every color
          with its calculated contrast, and the canonical spacing scale. Authority:
          Addendum&nbsp;A §A2 supersedes main spec §4 wherever values conflict.
        </p>
        <MetaRow
          className="mt-10"
          items={['STEP 3 OF 16', 'PRIMITIVES + LAYOUT', 'NOT FOR PUBLIC INDEX']}
        />
      </Section>

      <Divider />

      {/* ── Identity ───────────────────────────────────────────────── */}
      <Section size="default" id="identity" aria-labelledby="identity-heading">
        <Eyebrow number="001" label="Identity" />
        <DisplayHeading as="h2" id="identity-heading" size="h1" className="mt-10">
          Wordmark.
        </DisplayHeading>

        <div className="mt-16 space-y-12">
          {WORDMARK_SIZES.map((size) => (
            <div key={size} className="flex flex-col gap-3">
              <p className="font-mono text-mono-sm uppercase text-bone-faint">
                size=&quot;{size}&quot;
              </p>
              <Wordmark size={size} />
            </div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* ── Type scale ─────────────────────────────────────────────── */}
      <Section size="default" id="type" aria-labelledby="type-heading">
        <Eyebrow number="002" label="Typography" />
        <DisplayHeading as="h2" id="type-heading" size="h1" className="mt-10">
          Type scale.
        </DisplayHeading>
        <p className="mt-6 max-w-prose font-body text-body text-bone-muted">
          Display sizes (display-lg, display-xl, display-2xl, h1, h2) auto-respond via
          clamp() formulas baked into the type tokens — no responsive prefixes needed in
          markup. Body, mono, h3, and h4 are fixed sizes per §4.3.3.
        </p>

        <ul className="mt-16 space-y-12">
          {TYPE_SCALE.map((row) => (
            <li key={row.token} className="border-t border-ink-border pt-8">
              <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 font-mono text-mono-sm uppercase text-bone-faint">
                <span className="text-bone-base">text-{row.token}</span>
                <span>
                  {row.family} · {row.size}px
                </span>
                <span className="text-bone-muted">{row.use}</span>
              </div>
              <div className={row.className}>The solution is always there.</div>
            </li>
          ))}
        </ul>
      </Section>

      <Divider />

      {/* ── Color ──────────────────────────────────────────────────── */}
      <Section size="default" id="color" aria-labelledby="color-heading">
        <Eyebrow number="003" label="Color" />
        <DisplayHeading as="h2" id="color-heading" size="h1" className="mt-10">
          Tokens & contrast.
        </DisplayHeading>
        <p className="mt-6 max-w-prose font-body text-body text-bone-muted">
          A2.1 warm-shifted palette. Bone text-on-ink-base ratios calculated against
          #0A0A0A; all foregrounds pass WCAG&nbsp;AA. bone.faint (#6B665F) is restricted
          to ≥14px text per §4.2. bone.ghost is decorative-only (borders).
        </p>

        <div className="mt-16 grid gap-x-12 gap-y-12 lg:grid-cols-2">
          <div>
            <SubsectionLabel>ink — backgrounds & dividers</SubsectionLabel>
            {INK_COLORS.map((row) => (
              <ColorSwatch key={row.token} row={row} />
            ))}
          </div>
          <div>
            <SubsectionLabel>bone — text & strokes</SubsectionLabel>
            {BONE_COLORS.map((row) => (
              <ColorSwatch key={row.token} row={row} />
            ))}
          </div>
          <div>
            <SubsectionLabel>signal — state indicators</SubsectionLabel>
            {SIGNAL_COLORS.map((row) => (
              <ColorSwatch key={row.token} row={row} />
            ))}
          </div>
        </div>
      </Section>

      <Divider />

      {/* ── Spacing ────────────────────────────────────────────────── */}
      <Section size="default" id="spacing" aria-labelledby="spacing-heading">
        <Eyebrow number="004" label="Spacing" />
        <DisplayHeading as="h2" id="spacing-heading" size="h1" className="mt-10">
          4px grid.
        </DisplayHeading>
        <p className="mt-6 max-w-prose font-body text-body text-bone-muted">
          Every spacing value is a multiple of 4. Section vertical padding is
          64/96/128 mobile/tablet/desktop per A2.3.1.
        </p>

        <ul className="mt-16 space-y-3">
          {SPACING_SCALE.map((row) => (
            <li
              key={row.token}
              className="flex items-center gap-6 border-t border-ink-border pt-3"
            >
              <span className="w-12 shrink-0 font-mono text-mono-sm uppercase text-bone-faint">
                {row.token}
              </span>
              <span className="w-16 shrink-0 font-mono text-mono-xs uppercase text-bone-muted">
                {row.value}
              </span>
              <span
                className="block h-2 bg-bone-base"
                style={{ width: row.value }}
                aria-hidden="true"
              />
            </li>
          ))}
        </ul>
      </Section>

      <Divider />

      {/* ── Primitives — every state ───────────────────────────────── */}
      <Section size="default" id="primitives" aria-labelledby="primitives-heading">
        <Eyebrow number="005" label="Primitives" />
        <DisplayHeading
          as="h2"
          id="primitives-heading"
          size="h1"
          className="mt-10"
        >
          Components.
        </DisplayHeading>

        {/* Eyebrow */}
        <div className="mt-16 border-t border-ink-border pt-10">
          <SubsectionLabel>&lt;Eyebrow&gt;</SubsectionLabel>
          <div className="space-y-6">
            <Eyebrow number="002" label="Selected work" />
            <Eyebrow label="Selected work (no number)" />
            <Eyebrow number="404" label="Not found" />
          </div>
        </div>

        {/* MetaRow */}
        <div className="mt-16 border-t border-ink-border pt-10">
          <SubsectionLabel>&lt;MetaRow&gt;</SubsectionLabel>
          <div className="space-y-6">
            <div>
              <p className="mb-2 font-mono text-mono-xs uppercase text-bone-faint">
                size=&quot;mono-sm&quot; · separator=&quot;·&quot; (default)
              </p>
              <MetaRow
                items={['L. SOLOMON II', 'RICHMOND, VA', 'EST. 2015', 'AVAILABLE FOR SELECT WORK']}
              />
            </div>
            <div>
              <p className="mb-2 font-mono text-mono-xs uppercase text-bone-faint">
                size=&quot;mono-md&quot; · separator=&quot;—&quot;
              </p>
              <MetaRow
                size="mono-md"
                separator="—"
                items={['DISCOVERY', 'STRATEGY', 'DESIGN', 'BUILD']}
              />
            </div>
            <div>
              <p className="mb-2 font-mono text-mono-xs uppercase text-bone-faint">
                size=&quot;mono-xs&quot; · separator=&quot;/&quot; · align=&quot;right&quot;
              </p>
              <MetaRow
                size="mono-xs"
                separator="/"
                align="right"
                items={['UX', 'UI', 'PRODUCT', 'SYSTEMS']}
              />
            </div>
          </div>
        </div>

        {/* TagPill */}
        <div className="mt-16 border-t border-ink-border pt-10">
          <SubsectionLabel>&lt;TagPill&gt;</SubsectionLabel>
          <div className="space-y-8">
            <div>
              <p className="mb-3 font-mono text-mono-xs uppercase text-bone-faint">
                variant=&quot;default&quot; · size=&quot;sm&quot; (most common)
              </p>
              <div className="flex flex-wrap gap-2">
                <TagPill label="UX/UI" />
                <TagPill label="Product Design" />
                <TagPill label="Design System" />
                <TagPill label="Research" />
                <TagPill label="Branding" />
              </div>
            </div>
            <div>
              <p className="mb-3 font-mono text-mono-xs uppercase text-bone-faint">
                variant=&quot;default&quot; · size=&quot;md&quot;
              </p>
              <div className="flex flex-wrap gap-2">
                <TagPill label="Federal Government" size="md" />
                <TagPill label="Fintech & Payments" size="md" />
                <TagPill label="Music & Culture" size="md" />
              </div>
            </div>
            <div>
              <p className="mb-3 font-mono text-mono-xs uppercase text-bone-faint">
                variant=&quot;subtle&quot; (no border, ink.raised bg)
              </p>
              <div className="flex flex-wrap gap-2">
                <TagPill label="Web Design" variant="subtle" />
                <TagPill label="Strategy" variant="subtle" />
                <TagPill label="Development" variant="subtle" />
              </div>
            </div>
          </div>
        </div>

        {/* DisplayHeading — already covered by Type scale section, but show inline use */}
        <div className="mt-16 border-t border-ink-border pt-10">
          <SubsectionLabel>&lt;DisplayHeading&gt;</SubsectionLabel>
          <div className="space-y-12">
            <div>
              <p className="mb-2 font-mono text-mono-xs uppercase text-bone-faint">
                as=&quot;h2&quot; · size=&quot;h2&quot; (default)
              </p>
              <DisplayHeading>A decade making complex systems feel simple.</DisplayHeading>
            </div>
            <div>
              <p className="mb-2 font-mono text-mono-xs uppercase text-bone-faint">
                size=&quot;h1&quot; · balance
              </p>
              <DisplayHeading size="h1" balance>
                Selected projects across federal, fintech, and culture.
              </DisplayHeading>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 border-t border-ink-border pt-10">
          <SubsectionLabel>&lt;Divider&gt;</SubsectionLabel>
          <div className="space-y-10">
            <div>
              <p className="mb-3 font-mono text-mono-xs uppercase text-bone-faint">
                variant=&quot;hair&quot; (default · ink.border)
              </p>
              <Divider />
            </div>
            <div>
              <p className="mb-3 font-mono text-mono-xs uppercase text-bone-faint">
                variant=&quot;bright&quot; (hover state · ink.bright)
              </p>
              <Divider variant="bright" />
            </div>
          </div>
        </div>

        {/* Section primitive — meta */}
        <div className="mt-16 border-t border-ink-border pt-10">
          <SubsectionLabel>&lt;Section&gt; · layout primitive</SubsectionLabel>
          <p className="font-body text-body text-bone-muted">
            Demonstrated by every section on this page. <code className="font-mono text-mono-md text-bone-base">size=&quot;default&quot;</code> wraps in
            a 1440px container with 24/40/56 horizontal gutter and 64/96/128 vertical
            padding. <code className="font-mono text-mono-md text-bone-base">fullBleed</code> skips the container.
          </p>
        </div>
      </Section>

      <Divider />

      {/* ── Motion (placeholder until Step 5) ──────────────────────── */}
      <Section size="default">
        <Eyebrow number="006" label="Motion" />
        <DisplayHeading as="h2" size="h1" className="mt-10">
          Reveals & easing.
        </DisplayHeading>
        <p className="mt-8 max-w-prose font-body text-body text-bone-muted">
          Lenis smooth-scroll, RevealOnScroll, hover image, and motion tokens
          land in <span className="text-bone-base">Step 5</span>. This section
          will fill in after the motion infrastructure ships.
        </p>
      </Section>
    </main>
  )
}
