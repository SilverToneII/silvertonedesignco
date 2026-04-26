/**
 * Home page — §10.1
 *
 * Section flow:
 *   1. Hero (§10.1.1) — Option D copy "Design for / complex systems."
 *   2. Selected Works (§10.1.2)
 *   3. About Preview (§10.1.3)
 *   4. Connect Band (§10.1.4)
 *
 * Server-rendered. Fetches featured works at build time via getFeaturedWorks().
 * Interactive bits (hover image, works list reveal) ship in client wrappers
 * that hydrate inside the server-rendered shell.
 */
import Link from 'next/link'
import { Section, ConnectBand } from '@/components/layout'
import {
  Divider,
  DisplayHeading,
  Eyebrow,
  MetaRow,
} from '@/components/primitives'
import { SelectedWorksList } from '@/components/compounds'
import { RevealOnScroll } from '@/components/motion'
import { getFeaturedWorks } from '@/lib/content'

// Spec §7.4 / §7.5 — verbatim, render order matters
const EXPERTISE = [
  'UX/UI Design',
  'Product Design',
  'Design Systems',
  'User Research',
  'Interaction Design',
  'Prototyping & Wireframing',
  'Creative Direction',
  'Dev Handoff',
]

const FIELDS = [
  'Federal Government',
  'Fintech & Payments',
  'Music & Culture',
  'Art & Culture',
  'Healthcare',
  'SaaS & Tech',
  'Startups & Early-Stage',
]

export default async function HomePage() {
  const featuredWorks = await getFeaturedWorks(4)

  return (
    <>
      <Hero />
      <SelectedWorks works={featuredWorks} />
      <AboutPreview />
      <ConnectBand number="004" />
    </>
  )
}

// ──────────────────────────────────────────────────────────────────────
// 10.1.1 Hero
// ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="
        mx-auto flex w-full max-w-container flex-col
        min-h-[100svh]
        px-6 pb-14 pt-[calc(56px+80px)]
        md:px-10 md:pt-[calc(64px+96px)]
        lg:px-14 lg:pb-20 lg:pt-[calc(72px+144px)]
      "
    >
      <RevealOnScroll yOffset={16} duration={600} delay={100}>
        <Eyebrow number="001" label="Independent practice" />
      </RevealOnScroll>

      <div className="mt-6 md:mt-8 lg:mt-10">
        <RevealOnScroll yOffset={24} duration={800} delay={200}>
          {/* §A3.3 Option D — forced break, not natural wrap */}
          <DisplayHeading as="h1" id="hero-heading" size="display-2xl" balance>
            Design for
            <br />
            complex systems.
          </DisplayHeading>
        </RevealOnScroll>
      </div>

      <div className="mt-auto pt-12">
        {/* Hero divider drawn via CSS keyframe — §10.1.1 scaleX 0→1 */}
        <div className="hero-divider divider-hair" aria-hidden="true" />

        <div className="mt-6 flex flex-col gap-y-6 lg:flex-row lg:items-end lg:justify-between lg:gap-x-12">
          <RevealOnScroll yOffset={16} duration={600} delay={400} className="lg:max-w-md">
            <p className="font-body text-body-lg text-bone-muted">
              UX/UI and Product Designer. A decade making federal platforms,
              fintech tools, and cultural products feel inevitable.
            </p>
          </RevealOnScroll>

          <RevealOnScroll yOffset={8} duration={400} delay={600}>
            <MetaRow
              items={[
                'L. SOLOMON II',
                'RICHMOND, VA',
                'EST. 2015',
                'AVAILABLE FOR SELECT WORK',
              ]}
            />
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// 10.1.2 Selected Works
// ──────────────────────────────────────────────────────────────────────

function SelectedWorks({ works }: { works: Awaited<ReturnType<typeof getFeaturedWorks>> }) {
  return (
    <Section
      as="section"
      id="selected-works"
      aria-labelledby="selected-works-heading"
    >
      <Eyebrow number="002" label="Selected work" />

      <div className="mt-10 flex items-end justify-between gap-x-6">
        <DisplayHeading
          as="h2"
          id="selected-works-heading"
          size="h1"
          className="max-w-[14ch]"
        >
          Selected projects.
        </DisplayHeading>
        <Link
          href="/work"
          className="
            link-underline shrink-0
            font-mono text-mono-sm uppercase text-bone-muted
            transition-colors duration-base ease-out-quart
            hover:text-bone-base focus-visible:text-bone-base
          "
        >
          Index →
        </Link>
      </div>

      <div className="mt-16">
        <SelectedWorksList
          works={works}
          emptyState={
            <EmptyWorksState />
          }
        />
      </div>
    </Section>
  )
}

function EmptyWorksState() {
  return (
    <div className="border-y border-ink-border py-16 text-center">
      <Eyebrow label="( — ) — In progress" className="justify-center" />
      <DisplayHeading as="p" size="h2" className="mt-8">
        Case studies coming soon.
      </DisplayHeading>
      <p className="mt-4 font-body text-body-lg text-bone-muted">
        Selected projects are being prepared for publication.
      </p>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────
// 10.1.3 About Preview
// ──────────────────────────────────────────────────────────────────────

function AboutPreview() {
  return (
    <Section
      as="section"
      id="about-preview"
      aria-labelledby="about-preview-heading"
    >
      <Eyebrow number="003" label="Practice" />

      <div className="mt-10 grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:col-span-6">
          <DisplayHeading
            as="h2"
            id="about-preview-heading"
            size="h1"
            balance
          >
            A decade making complex systems feel simple.
          </DisplayHeading>
        </div>

        <div className="lg:col-span-6">
          {/* Verbatim per §7.3 short bio */}
          <p className="font-body text-body-lg text-bone-muted">
            UX/UI Designer & Product Designer with a decade of experience
            making complex systems feel simple. I work across government,
            fintech, & culture, while bringing engineers, PMs, and clients
            with me every step of the way.
          </p>
        </div>
      </div>

      <div className="mt-16 space-y-6">
        <InlineRun label="Expertise" items={EXPERTISE} />
        <InlineRun label="Fields" items={FIELDS} />
      </div>

      <div className="mt-10">
        <Link
          href="/about"
          className="
            link-underline
            font-body text-body-lg text-bone-base
            transition-opacity duration-base ease-out-quart
            hover:opacity-70 focus-visible:opacity-70
          "
        >
          Read more →
        </Link>
      </div>
    </Section>
  )
}

function InlineRun({ label, items }: { label: string; items: readonly string[] }) {
  return (
    <div className="flex flex-col gap-y-2 lg:flex-row lg:items-baseline lg:gap-x-6">
      <p className="shrink-0 font-mono text-mono-sm uppercase text-bone-faint lg:w-32">
        {label}
      </p>
      <p className="font-body text-body-sm text-bone-base">
        {items.join(', ')}
      </p>
    </div>
  )
}
