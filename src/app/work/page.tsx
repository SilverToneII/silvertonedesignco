/**
 * Work index — §10.2
 *
 * Full sorted list of all published works (year DESC, order ASC).
 * Reuses SelectedWorksList client wrapper for the HoverImage + stagger
 * reveal behavior. Filter bar deferred to v1.5 per §10.2.
 */
import type { Metadata } from 'next'
import { Section, ConnectBand } from '@/components/layout'
import { DisplayHeading, Eyebrow } from '@/components/primitives'
import { SelectedWorksList } from '@/components/compounds'
import { getAllWorks } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Selected Work',
  description:
    'A decade of UX/UI and product design across federal government, fintech, music & culture, and beyond.',
}

export default async function WorkIndexPage() {
  const works = await getAllWorks()

  return (
    <>
      <Section
        as="section"
        size="default"
        className="pt-32 md:pt-40 lg:pt-48"
        aria-labelledby="work-index-heading"
      >
        <Eyebrow number="001" label="Index" />
        <DisplayHeading
          as="h1"
          id="work-index-heading"
          size="display-lg"
          balance
          className="mt-10 max-w-[14ch]"
        >
          All work.
        </DisplayHeading>
        <p className="mt-10 max-w-[60ch] font-body text-body-lg text-bone-muted">
          Selected projects across federal government, fintech &amp; payments,
          music &amp; culture, and beyond.
        </p>
      </Section>

      <Section as="section" size="tight" aria-label="All projects">
        <SelectedWorksList works={works} />
      </Section>

      <ConnectBand number="002" />
    </>
  )
}
