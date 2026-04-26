/**
 * 404 — §10.7 + §7.8 verbatim
 * Same visual register as the hero. Single "Return home" action only.
 */
import Link from 'next/link'
import { Section } from '@/components/layout'
import { DisplayHeading, Eyebrow } from '@/components/primitives'

export default function NotFound() {
  return (
    <Section
      as="section"
      size="default"
      className="flex min-h-[60vh] flex-col items-start justify-center pt-32 md:pt-40 lg:pt-48"
      aria-labelledby="not-found-heading"
    >
      <Eyebrow label="( 404 ) — Not found" />
      <DisplayHeading
        as="h1"
        id="not-found-heading"
        size="display-lg"
        balance
        className="mt-10 max-w-[14ch]"
      >
        Page not found.
      </DisplayHeading>
      <p className="mt-10 max-w-prose font-body text-body-lg text-bone-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
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
