/**
 * <ConnectBand> — §10.1.4 + §10.2 (work index reuse)
 *
 * Server component. Used at the bottom of every primary page (home,
 * work index, work detail, about). Layout matches the eyebrow + h1 +
 * email + pills pattern from the spec.
 */
import { Section } from '@/components/layout'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { DisplayHeading } from '@/components/primitives/DisplayHeading'
import { TagPill } from '@/components/primitives/TagPill'
import { CONTACT_LINKS } from '@/lib/nav'

interface ConnectBandProps {
  /** Eyebrow number, omit for unnumbered (e.g. footer pre-band). */
  number?: string
}

export function ConnectBand({ number }: ConnectBandProps) {
  return (
    <Section as="section" id="connect-band" aria-labelledby="connect-band-heading">
      <Eyebrow number={number} label="Connect" />
      <DisplayHeading
        as="h2"
        id="connect-band-heading"
        size="h1"
        balance
        className="mt-10 max-w-[18ch]"
      >
        Reach out to connect or collaborate.
      </DisplayHeading>

      <div className="mt-10 flex flex-col gap-y-8 lg:flex-row lg:items-end lg:justify-between lg:gap-x-12">
        <a
          href={CONTACT_LINKS.email}
          className="
            self-start
            font-display text-h3 text-bone-base
            underline underline-offset-[6px] decoration-1
            transition-opacity duration-base ease-out-quart
            hover:opacity-70 focus-visible:opacity-70
          "
        >
          {CONTACT_LINKS.emailDisplay}
        </a>

        <ul className="flex flex-wrap gap-x-3 gap-y-3">
          <li>
            <a href={CONTACT_LINKS.email} className="inline-block focus-visible:outline-bone-base">
              <TagPill label="Email" size="md" />
            </a>
          </li>
          <li>
            <a
              href={CONTACT_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn (opens in new tab)"
              className="inline-block focus-visible:outline-bone-base"
            >
              <TagPill label="LinkedIn" size="md" />
            </a>
          </li>
          <li>
            <a
              href={CONTACT_LINKS.calendly}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Schedule a call (opens in new tab)"
              className="inline-block focus-visible:outline-bone-base"
            >
              <TagPill label="Schedule a call" size="md" />
            </a>
          </li>
        </ul>
      </div>
    </Section>
  )
}
