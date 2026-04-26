/**
 * Connect page — §10.5
 *
 * Hero + 3-col contact methods (Email / Schedule / LinkedIn).
 * No ConnectBand at the bottom — the page IS the connect band.
 */
import type { Metadata } from 'next'
import { Section } from '@/components/layout'
import { Divider, DisplayHeading, Eyebrow } from '@/components/primitives'
import { CONTACT_LINKS } from '@/lib/nav'

export const metadata: Metadata = {
  title: 'Connect',
  description: 'Reach out to connect or collaborate. silvertonedesignco@gmail.com',
}

export default function ConnectPage() {
  return (
    <>
      <Section
        as="section"
        size="default"
        className="pt-32 md:pt-40 lg:pt-48"
        aria-labelledby="connect-heading"
      >
        <Eyebrow number="001" label="Connect" />
        <DisplayHeading
          as="h1"
          id="connect-heading"
          size="display-2xl"
          balance
          className="mt-6 md:mt-8 lg:mt-10"
        >
          Let&apos;s work together.
        </DisplayHeading>
        <p className="mt-10 max-w-prose font-body text-body-lg text-bone-muted">
          Available for select work in product design, design systems, and
          digital experiences. Federal, fintech, and culture welcome.
        </p>
      </Section>

      <Section as="section" size="default" aria-label="Contact methods">
        <Divider />
        <div className="grid grid-cols-1 md:grid-cols-3">
          <ContactMethod
            eyebrow="Email"
            href={CONTACT_LINKS.email}
            label={CONTACT_LINKS.emailDisplay}
            description="Best for project inquiries."
          />
          <ContactMethod
            eyebrow="Calendar"
            href={CONTACT_LINKS.calendly}
            label="Schedule a call →"
            description="30-minute intro conversations."
            external
          />
          <ContactMethod
            eyebrow="Professional"
            href={CONTACT_LINKS.linkedin}
            label="LinkedIn →"
            description="Career and full work history."
            external
          />
        </div>
        <Divider />
      </Section>
    </>
  )
}

interface ContactMethodProps {
  eyebrow: string
  href: string
  label: string
  description: string
  external?: boolean
}

function ContactMethod({
  eyebrow,
  href,
  label,
  description,
  external,
}: ContactMethodProps) {
  const externalProps = external
    ? {
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': `${label} (opens in new tab)`,
      }
    : {}

  return (
    <div className="flex flex-col gap-y-4 border-b border-ink-border py-10 md:border-b-0 md:border-r md:px-8 md:py-12 md:last:border-r-0 md:[&:first-child]:pl-0 md:[&:last-child]:pr-0">
      <Eyebrow label={eyebrow} />
      <a
        href={href}
        {...externalProps}
        className="
          link-underline self-start
          font-display text-h3 text-bone-base
          transition-opacity duration-base ease-out-quart
          focus-visible:outline-bone-base
        "
      >
        {label}
      </a>
      <p className="font-body text-body-sm text-bone-muted">{description}</p>
    </div>
  )
}
