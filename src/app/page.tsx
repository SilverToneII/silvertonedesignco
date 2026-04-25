/**
 * Step 4 placeholder home page.
 * Real home page is built in Step 7 per §10.1.
 *
 * Renders inside <main id="main"> from app/layout.tsx, so this file
 * uses a fragment / div, never its own <main>.
 *
 * Padding-top accounts for the fixed header height (56/64/72 per §5.2);
 * Step 7's hero will set its own header-aware top padding.
 */
import { Section } from '@/components/layout'
import { DisplayHeading, Eyebrow } from '@/components/primitives'

export default function Step4Placeholder() {
  return (
    <Section size="loose" className="pt-32 md:pt-40 lg:pt-48">
      <Eyebrow number="001" label="Scaffold initialized" />
      <DisplayHeading
        as="h1"
        size="display-lg"
        balance
        className="mt-10 max-w-[14ch]"
      >
        Silvertone Design Co.
      </DisplayHeading>
      <p className="mt-8 max-w-prose font-body text-body-lg text-bone-muted">
        Step 4 of 16 complete. Layout shell wired — skip link, fixed header
        with scroll state machine, mobile menu with focus trap, footer with
        the practice signature, and Lenis smooth scroll over a
        GSAP&nbsp;ScrollTrigger ticker. Real home page lands at Step 7.
      </p>
      <p className="mt-10 font-mono text-mono-sm uppercase text-bone-faint">
        Visit <a href="/styleguide" className="link-underline text-bone-base">/styleguide</a> for
        the design system reference.
      </p>
    </Section>
  )
}
