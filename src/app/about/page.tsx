/**
 * About page — §10.4
 *
 * Sections:
 *   1. Hero — eyebrow, "Practice." display-2xl, long bio
 *   2. Capabilities — 3-col grid (Expertise / Fields / Tools)
 *   3. Connect band
 *
 * §A3.6 — experience timeline OMITTED for v1. Owner provides positions
 * later; this page reactivates the section by uncommenting <Experience />.
 */
import type { Metadata } from 'next'
import { Section, ConnectBand } from '@/components/layout'
import { Divider, DisplayHeading, Eyebrow } from '@/components/primitives'

export const metadata: Metadata = {
  title: 'About / Practice',
  description:
    'LaBrew Solomon II — UX/UI and Product Designer based in Richmond, VA. A decade making complex systems feel simple.',
}

// §7.4 — verbatim, render order matters
const EXPERTISE = [
  'UX/UI Design',
  'Product Design',
  'Design Systems',
  'Problem Solving',
  'User Research',
  'Interaction Design',
  'Prototyping & Wireframing',
  'Creative Direction',
  'Dev Handoff',
  'Branding',
  'Strategy',
  'Identity',
  'UI Design',
  'UX Design',
  'Web Design',
  'Development',
  'Copywriting',
]

// §7.5 — verbatim, render order matters
const FIELDS = [
  'Federal Government',
  'Fintech & Payments',
  'Music & Culture',
  'Art & Culture',
  'Healthcare',
  'SaaS & Tech',
  'Startups & Early-Stage',
]

// §7.6 — verbatim, render order matters
const TOOLS = ['Figma', 'Axure RP', 'Adobe Creative Suite', 'FigJam', 'Miro', 'Framer', 'HTML/CSS']

export default function AboutPage() {
  return (
    <>
      <Section
        as="section"
        size="default"
        className="pt-32 md:pt-40 lg:pt-48"
        aria-labelledby="about-heading"
      >
        <Eyebrow number="001" label="About" />
        <DisplayHeading
          as="h1"
          id="about-heading"
          size="display-2xl"
          className="mt-6 md:mt-8 lg:mt-10"
        >
          Practice.
        </DisplayHeading>
        {/* §7.3 long bio — verbatim */}
        <p className="mt-16 max-w-2xl font-body text-body-lg text-bone-base">
          I design solutions, not only screens. The thinking behind them, the
          systems that support them, and the outcomes that prove they worked.
          Whether it&apos;s a federal platform serving millions, a fintech product
          finding its footing, or a cultural brand building from scratch, the
          approach is the same: understand the real problem first. Then solve
          it with precision.
        </p>
      </Section>

      <Section
        as="section"
        size="default"
        aria-labelledby="capabilities-heading"
      >
        <Eyebrow number="002" label="Capabilities" />
        <DisplayHeading
          as="h2"
          id="capabilities-heading"
          size="h1"
          className="mt-10"
        >
          What I do.
        </DisplayHeading>

        <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-3">
          <CapabilityColumn label="Expertise" items={EXPERTISE} />
          <CapabilityColumn label="Fields" items={FIELDS} />
          <CapabilityColumn label="Tools" items={TOOLS} />
        </div>
      </Section>

      {/*
        §A3.6 — Experience timeline omitted for v1.
        Reactivate by uncommenting once owner provides positions:
        <Experience positions={POSITIONS} />
      */}

      <ConnectBand number="003" />
    </>
  )
}

function CapabilityColumn({
  label,
  items,
}: {
  label: string
  items: readonly string[]
}) {
  return (
    <div>
      <p className="font-mono text-mono-md uppercase text-bone-faint">
        {label}
      </p>
      <ul className="mt-4">
        {items.map((item, i) => (
          <li key={item}>
            {i === 0 ? <Divider variant="hair" /> : null}
            <span className="block py-3 font-body text-body text-bone-base">
              {item}
            </span>
            <Divider variant="hair" />
          </li>
        ))}
      </ul>
    </div>
  )
}
