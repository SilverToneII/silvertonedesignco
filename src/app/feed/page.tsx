/**
 * Feed page — §10.6 v1 placeholder
 *
 * v2 implements a masonry visual journal with Sanity backing per §A3.10.
 */
import Link from 'next/link'
import { Section } from '@/components/layout'
import { DisplayHeading, Eyebrow } from '@/components/primitives'

export default function FeedPage() {
  return (
    <Section
      as="section"
      size="default"
      className="flex min-h-[60vh] flex-col items-start justify-center pt-32 md:pt-40 lg:pt-48"
      aria-labelledby="feed-heading"
    >
      <Eyebrow number="001" label="Feed" />
      <DisplayHeading
        as="h1"
        id="feed-heading"
        size="display-lg"
        balance
        className="mt-10 max-w-[16ch]"
      >
        Visual journal, coming soon.
      </DisplayHeading>
      <p className="mt-10 max-w-prose font-body text-body-lg text-bone-muted">
        A space for process notes, references, and works in progress.
        Currently in production.
      </p>
      <Link
        href="/"
        className="
          link-underline mt-12 inline-block
          font-mono text-mono-sm uppercase text-bone-muted
          transition-colors duration-base ease-out-quart
          hover:text-bone-base focus-visible:text-bone-base
        "
      >
        ← Return home
      </Link>
    </Section>
  )
}
