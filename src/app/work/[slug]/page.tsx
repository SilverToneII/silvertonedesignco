/**
 * Project detail — §10.3
 *
 * Sections (top → bottom):
 *   1. Project hero: case-study eyebrow, title, metadata strip + tags
 *   2. Cover image (full-bleed up to 2400px)
 *   3. Overview: 3-col grid (role / year / stack) + summary
 *   4. MDX body content
 *   5. Outcomes (if frontmatter has outcomes[])
 *   6. Next project (auto-derived, loops oldest→newest)
 *
 * Static generation via generateStaticParams. generateMetadata pulls
 * title + summary from frontmatter for per-page SEO.
 */
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Section } from '@/components/layout'
import {
  Divider,
  DisplayHeading,
  Eyebrow,
  MetaRow,
  TagPill,
} from '@/components/primitives'
import { StatCard } from '@/components/compounds'
import {
  getAllWorks,
  getNextWork,
  getWorkBody,
  getWorkBySlug,
  type Work,
} from '@/lib/content'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const works = await getAllWorks()
  return works.map((w) => ({ slug: w.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const work = await getWorkBySlug(params.slug)
  if (!work) return {}
  return {
    title: work.title,
    description: work.summary.slice(0, 160),
  }
}

export default async function WorkDetailPage({ params }: PageProps) {
  const work = await getWorkBySlug(params.slug)
  if (!work) notFound()

  const [Body, next] = await Promise.all([
    getWorkBody(params.slug),
    getNextWork(params.slug),
  ])

  return (
    <>
      <ProjectHero work={work} />
      <CoverImage work={work} />
      <Overview work={work} />
      <article className="mx-auto w-full max-w-[64ch] px-6 py-16 md:px-10 lg:px-14 lg:py-24">
        {Body ? <Body /> : <BodyMissingNotice slug={params.slug} />}
      </article>
      {work.outcomes && work.outcomes.length > 0 ? (
        <Outcomes outcomes={work.outcomes} />
      ) : null}
      {next ? <NextProject next={next} /> : null}
    </>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Hero
// ──────────────────────────────────────────────────────────────────────

function ProjectHero({ work }: { work: Work }) {
  // Pick display size by length: short titles get the bigger display
  const titleSize = work.title.length > 28 ? 'display-lg' : 'display-xl'

  return (
    <section
      aria-labelledby="project-hero-heading"
      className="
        mx-auto flex w-full max-w-container flex-col
        min-h-[70svh] lg:min-h-[100svh]
        px-6 pb-14 pt-[calc(56px+80px)]
        md:px-10 md:pt-[calc(64px+96px)]
        lg:px-14 lg:pb-20 lg:pt-[calc(72px+144px)]
      "
    >
      <Eyebrow label={`Case study — ${work.year}`} />

      <DisplayHeading
        as="h1"
        id="project-hero-heading"
        size={titleSize}
        balance
        className="mt-6 md:mt-8 lg:mt-10"
      >
        {work.title}
      </DisplayHeading>

      <div className="mt-10 flex flex-col gap-y-4 lg:mt-12 lg:flex-row lg:items-end lg:justify-between lg:gap-x-8">
        <MetaRow items={[work.client, work.role, work.duration]} />
        <ul className="flex flex-wrap gap-x-2 gap-y-2 lg:justify-end">
          {work.tags.map((tag) => (
            <li key={tag}>
              <TagPill label={tag} size="md" />
            </li>
          ))}
        </ul>
      </div>

      {/* Down-arrow indicator (decorative) */}
      <div className="mt-auto flex justify-center pt-12" aria-hidden="true">
        <span className="block h-12 w-px bg-bone-faint" />
      </div>
    </section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Cover
// ──────────────────────────────────────────────────────────────────────

function CoverImage({ work }: { work: Work }) {
  return (
    <div className="mx-auto w-full max-w-[2400px]">
      <Image
        src={work.cover}
        alt={`${work.title} cover image`}
        width={2400}
        height={1350}
        sizes="(max-width: 2400px) 100vw, 2400px"
        priority
        className="h-auto w-full"
      />
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Overview
// ──────────────────────────────────────────────────────────────────────

function Overview({ work }: { work: Work }) {
  return (
    <Section as="section" size="default" aria-label="Project overview">
      <div className="grid grid-cols-1 gap-y-8 md:grid-cols-3 md:gap-x-8">
        <OverviewCell label="Role" value={work.role} />
        <OverviewCell label="Year" value={String(work.year)} />
        <OverviewCell label="Stack" value={work.tags.join(', ')} />
      </div>
      <Divider className="mt-12" />
      <p className="mt-10 max-w-prose font-body text-body-lg text-bone-muted">
        {work.summary}
      </p>
    </Section>
  )
}

function OverviewCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-mono-sm uppercase text-bone-faint">{label}</p>
      <p className="mt-3 font-body text-body-lg text-bone-base">{value}</p>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Outcomes
// ──────────────────────────────────────────────────────────────────────

function Outcomes({
  outcomes,
}: {
  outcomes: NonNullable<Work['outcomes']>
}) {
  return (
    <Section
      as="section"
      size="default"
      aria-labelledby="outcomes-heading"
    >
      <Eyebrow label="Outcomes" />
      <DisplayHeading
        as="h2"
        id="outcomes-heading"
        size="h1"
        className="sr-only"
      >
        Outcomes
      </DisplayHeading>
      <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {outcomes.map((o, i) => (
          <li key={`${o.label}-${i}`}>
            <StatCard value={o.value} label={o.label} />
          </li>
        ))}
      </ul>
    </Section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Next project
// ──────────────────────────────────────────────────────────────────────

function NextProject({ next }: { next: Work }) {
  return (
    <Section
      as="section"
      size="default"
      aria-labelledby="next-project-heading"
    >
      <Eyebrow label="Next —" />
      <Link
        href={`/work/${next.slug}`}
        className="
          link-underline group mt-10 inline-block
          font-display text-h1 text-bone-base
          transition-opacity duration-base ease-out-quart
          focus-visible:outline-bone-base
        "
      >
        <span id="next-project-heading">{next.title}</span>
      </Link>
    </Section>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Empty body fallback (when MDX import fails — should never hit in v1)
// ──────────────────────────────────────────────────────────────────────

function BodyMissingNotice({ slug }: { slug: string }) {
  return (
    <p className="font-mono text-mono-md uppercase text-bone-faint">
      Body content for {slug} could not be loaded.
    </p>
  )
}
