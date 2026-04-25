'use client'

/**
 * <Footer> — §12.10 + §A3.11 (signature line)
 *
 * Anatomy (top → bottom):
 *   1. Eyebrow: ( — ) — STUDIO WRAP
 *   2. h2: Reach out to connect or collaborate.
 *   3. h3 email link · pill row [Email] [LinkedIn] [Schedule]
 *   4. Hairline
 *   5. §A3.11 signature: IN PRACTICE SINCE 2015 — RICHMOND, VA  (h2, bone.faint, centered)
 *   6. Giant SILVERTONE® wordmark (decorative, aria-hidden)
 *   7. Hairline
 *   8. © 2026 SILVERTONE DESIGN CO.   BACK TO TOP ↑
 *
 * Notes
 * • The 280–360px §5.2 wordmark height refers to the rendered block
 *   height (font-size × line-height), not raw font-size. Using
 *   `size="display"` (clamp 72→220px) at leading-none lands the
 *   block roughly in that range. Owner can override visually.
 * • Back-to-top is wired to useScrollTo() with the canonical 1.2s
 *   duration (§12.10). §12.10 also says "only visible when scrolled
 *   past 50% of page height" — that visibility logic ships in Step 5
 *   (motion infra). For Step 4 it's always shown.
 * • 'use client' because of the back-to-top click handler and useScrollTo.
 */
import Link from 'next/link'
import { Eyebrow } from '@/components/primitives/Eyebrow'
import { DisplayHeading } from '@/components/primitives/DisplayHeading'
import { Divider } from '@/components/primitives/Divider'
import { TagPill } from '@/components/primitives/TagPill'
import { Wordmark } from '@/components/primitives/Wordmark'
import { Section } from './Section'
import { CONTACT_LINKS } from '@/lib/nav'
import { useScrollTo } from '@/components/motion/LenisProvider'

const COPYRIGHT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer role="contentinfo" className="border-t border-ink-border bg-ink-base">
      <Section as="div" size="loose">
        {/* 1 — Eyebrow */}
        <Eyebrow label="Studio wrap" />

        {/* 2 — h2 connect headline */}
        <DisplayHeading
          as="h2"
          size="h1"
          balance
          className="mt-20 max-w-[18ch] md:mt-24 lg:mt-36"
        >
          Reach out to connect or collaborate.
        </DisplayHeading>

        {/* 3 — Email link + pill row */}
        <div className="mt-10 flex flex-col gap-y-8 lg:mt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-x-12">
          <a
            href={CONTACT_LINKS.email}
            className="
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
              <a
                href={CONTACT_LINKS.email}
                className="inline-block focus-visible:outline-bone-base"
              >
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
                <TagPill label="Schedule" size="md" />
              </a>
            </li>
          </ul>
        </div>

        {/* 4 — Hairline */}
        <Divider className="mt-20 lg:mt-28" />

        {/* 5 — §A3.11 signature line */}
        <p
          className="
            mt-10
            text-center
            font-display text-h2 text-bone-faint
            tracking-tight
          "
        >
          In practice since 2015 — Richmond, VA
        </p>

        {/* 6 — Giant decorative wordmark */}
        <div
          aria-hidden="true"
          className="mt-10 flex w-full justify-center overflow-hidden"
        >
          <Wordmark
            as="div"
            size="display"
            className="
              block w-full text-center leading-[0.85]
              [letter-spacing:-0.07em]
            "
          />
        </div>

        {/* 7 — Hairline */}
        <Divider className="mt-10" />

        {/* 8 — Copyright + back to top */}
        <div className="mt-6 flex flex-col gap-y-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-mono-sm uppercase text-bone-faint">
            © {COPYRIGHT_YEAR} Silvertone Design Co. — Richmond, VA — L. Solomon II
          </p>
          <BackToTop />
        </div>

        {/* Hidden footer nav for SR/landmarks */}
        <nav aria-label="Footer" className="sr-only">
          <ul>
            <li>
              <Link href="/work">Work</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/feed">Feed</Link>
            </li>
            <li>
              <Link href="/connect">Connect</Link>
            </li>
            <li>
              <a href={CONTACT_LINKS.email}>{CONTACT_LINKS.emailDisplay}</a>
            </li>
            <li>
              <a href={CONTACT_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={CONTACT_LINKS.calendly} target="_blank" rel="noopener noreferrer">
                Schedule a call
              </a>
            </li>
          </ul>
        </nav>
      </Section>
    </footer>
  )
}

function BackToTop() {
  const scrollTo = useScrollTo()

  return (
    <button
      type="button"
      onClick={() => scrollTo(0, 1.2)}
      className="
        group inline-flex items-center gap-x-2
        font-mono text-mono-sm uppercase text-bone-muted
        transition-colors duration-base ease-out-quart
        hover:text-bone-base focus-visible:text-bone-base
        focus-visible:outline-bone-base
      "
    >
      Back to top
      <span
        aria-hidden="true"
        className="
          inline-block transition-transform duration-base ease-out-quart
          group-hover:-translate-y-0.5
        "
      >
        ↑
      </span>
    </button>
  )
}
