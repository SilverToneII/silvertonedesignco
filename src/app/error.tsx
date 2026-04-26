'use client'

/**
 * 500 — §15.3 + §7.8 verbatim
 * App-wide error boundary. Renders the 500 spec with a Try-again button.
 */
import { Section } from '@/components/layout'
import { DisplayHeading, Eyebrow } from '@/components/primitives'

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <Section
      as="section"
      size="default"
      className="flex min-h-[60vh] flex-col items-start justify-center pt-32 md:pt-40 lg:pt-48"
      aria-labelledby="error-heading"
    >
      <Eyebrow label="( 500 ) — Server error" />
      <DisplayHeading
        as="h1"
        id="error-heading"
        size="display-lg"
        balance
        className="mt-10 max-w-[16ch]"
      >
        Something went wrong.
      </DisplayHeading>
      <p className="mt-10 max-w-prose font-body text-body-lg text-bone-muted">
        An unexpected error occurred. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="
          link-underline mt-12 inline-block
          font-mono text-mono-sm uppercase text-bone-muted
          transition-colors duration-base ease-out-quart
          hover:text-bone-base focus-visible:text-bone-base
          focus-visible:outline-bone-base
        "
      >
        Try again
      </button>
    </Section>
  )
}
