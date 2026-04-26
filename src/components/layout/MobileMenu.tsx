'use client'

/**
 * <MobileMenu> — §12.14
 *
 * Full-screen overlay nav for <lg viewports.
 *
 * Behavior:
 *   • Slides in from the right (translateX 100% → 0) over 500ms ease-out-expo
 *   • Body scroll locked while open (overflow:hidden on <html>)
 *   • Tab cycles through focusable elements only (focus trap)
 *   • Escape closes; close returns focus to the trigger (the hamburger)
 *   • Reduced-motion: instant fade instead of slide (200ms)
 *
 * Focus trap is hand-rolled here — the spec (§A7.2) suggests
 * focus-trap-react if this gets buggy; not pulling in 4KB until we
 * see a failure mode in real testing.
 */
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Wordmark } from '@/components/primitives/Wordmark'
import { Divider } from '@/components/primitives/Divider'
import { cn } from '@/lib/cn'
import { PRIMARY_NAV, CONTACT_LINKS } from '@/lib/nav'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  /** ref to the trigger so we can return focus to it on close. */
  triggerRef: React.RefObject<HTMLButtonElement | null>
}

export function MobileMenu({ isOpen, onClose, triggerRef }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  // Body scroll lock + Esc to close + focus trap
  useEffect(() => {
    if (!isOpen) return

    const html = document.documentElement
    const previousOverflow = html.style.overflow
    html.style.overflow = 'hidden'

    // Move focus into the menu on open
    const initialFocusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 60)

    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const panel = panelRef.current
      if (!panel) return
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (!first || !last) return
      const active = document.activeElement

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKey)

    return () => {
      window.clearTimeout(initialFocusTimer)
      document.removeEventListener('keydown', handleKey)
      html.style.overflow = previousOverflow
      // Return focus to the trigger that opened us
      triggerRef.current?.focus()
    }
  }, [isOpen, onClose, triggerRef])

  return (
    <div
      id="mobile-menu"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      // aria-hidden when off-screen so SRs and a11y tooling treat the
      // closed menu as inert (Playwright's `not.toBeVisible()` doesn't
      // detect translate-x-full alone).
      aria-hidden={!isOpen}
      // Always rendered; visibility/translate driven by isOpen so the
      // exit transition can play. pointer-events-none when hidden so
      // tap-throughs don't fire.
      className={cn(
        'fixed inset-0 z-menu lg:hidden',
        'bg-ink-base text-bone-base',
        'transition-transform duration-[500ms] ease-out-expo motion-reduce:duration-200',
        isOpen ? 'translate-x-0' : 'pointer-events-none translate-x-full',
        // motion-reduce: replace slide with fade
        'motion-reduce:transform-none motion-reduce:transition-opacity',
        isOpen ? 'motion-reduce:opacity-100' : 'motion-reduce:opacity-0'
      )}
    >
      <div className="flex h-full flex-col px-6 pb-10 pt-4">
        {/* Top bar — wordmark + close */}
        <div className="flex h-14 items-center justify-between md:h-16">
          <Link
            href="/"
            onClick={onClose}
            aria-label="Silvertone Design Co. — home"
            className="focus-visible:outline-bone-base"
          >
            <Wordmark size="nav" />
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="
              relative h-10 w-10 -mr-2
              text-bone-base
              transition-opacity duration-fast hover:opacity-70
              focus-visible:outline-bone-base
            "
          >
            {/* Close glyph — two crossed lines */}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 block h-px w-6 -translate-x-1/2 bg-current rotate-45"
            />
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 block h-px w-6 -translate-x-1/2 bg-current -rotate-45"
            />
          </button>
        </div>

        {/* Nav links — display-lg sized links per §12.14 anatomy */}
        <nav aria-label="Mobile primary" className="mt-20">
          <ul className="flex flex-col gap-y-6">
            {PRIMARY_NAV.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onClose}
                  className="
                    inline-flex items-baseline gap-x-3
                    font-display text-display-lg text-bone-base
                    transition-opacity duration-base ease-out-quart
                    hover:opacity-70 focus-visible:opacity-70
                  "
                >
                  {label}
                  <span aria-hidden="true" className="text-bone-faint">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Contact + signature — bottom of menu */}
        <Divider className="mb-6" />
        <div className="flex flex-col gap-y-3">
          <a
            href={CONTACT_LINKS.email}
            className="font-body text-body-lg text-bone-base underline underline-offset-4"
          >
            {CONTACT_LINKS.emailDisplay}
          </a>
          <p className="font-mono text-mono-sm uppercase text-bone-faint">
            L. Solomon II <span aria-hidden="true">·</span> Richmond, VA
          </p>
        </div>
      </div>
    </div>
  )
}
