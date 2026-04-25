'use client'

/**
 * <Header> — §12.9 + §14.5 scroll state machine
 *
 * Fixed header with three states:
 *   TOP                  — transparent bg, translateY(0)
 *   SCROLLED_DOWN_HIDDEN — solid bg + blur, translateY(-100%)
 *   SCROLLED_UP_VISIBLE  — solid bg + blur, translateY(0)
 *
 * Transitions:
 *   bg/border fade — 300ms ease
 *   translate     — 300ms ease-out-quart
 *
 * Heights: 56px / 64px / 72px (§5.2)
 *
 * Reduced motion (§13.4): hide-on-scroll disabled. Header stays at the
 * `visible` state once past 80px so users on reduced-motion still get
 * the legibility-backing for nav text but don't see translateY motion.
 *
 * Backdrop blur: §2.3 forbids decorative glassmorphism; §12.9 + §A7.2
 * specifically call for backdrop-blur-md here for legibility. This is
 * functional, not decorative.
 */
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Wordmark } from '@/components/primitives/Wordmark'
import { cn } from '@/lib/cn'
import { PRIMARY_NAV } from '@/lib/nav'
import { MobileMenu } from './MobileMenu'

type HeaderState = 'top' | 'hidden' | 'visible'

const SCROLL_TOP_THRESHOLD = 80 // px below which we're "at top"
const SCROLL_HIDE_THRESHOLD = 200 // px past which we hide on down-scroll
const SCROLL_DIRECTION_DELTA = 6 // ignore tiny scroll jitters

export function Header() {
  const pathname = usePathname()
  const [headerState, setHeaderState] = useState<HeaderState>('top')
  const [menuOpen, setMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  const reducedMotion = useRef(false)
  const hamburgerRef = useRef<HTMLButtonElement | null>(null)

  // Scroll state machine
  useEffect(() => {
    if (typeof window === 'undefined') return

    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const handleScroll = () => {
      const currentY = window.scrollY
      const delta = currentY - lastScrollY.current

      if (currentY <= SCROLL_TOP_THRESHOLD) {
        setHeaderState('top')
      } else if (Math.abs(delta) >= SCROLL_DIRECTION_DELTA) {
        if (reducedMotion.current) {
          setHeaderState('visible')
        } else if (delta > 0 && currentY > SCROLL_HIDE_THRESHOLD) {
          setHeaderState('hidden')
        } else if (delta < 0) {
          setHeaderState('visible')
        }
      }

      lastScrollY.current = currentY
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isSolid = headerState !== 'top'

  return (
    <>
      <header
        role="banner"
        className={cn(
          'fixed inset-x-0 top-0 z-header',
          // Background fade — 300ms per §14.5
          'transition-[background-color,border-color,transform] duration-300 ease-out-quart',
          isSolid
            ? 'bg-ink-base/95 backdrop-blur-md supports-[backdrop-filter]:bg-ink-base/80'
            : 'bg-transparent',
          headerState === 'hidden' ? '-translate-y-full' : 'translate-y-0',
          isSolid ? 'border-b border-ink-border' : 'border-b border-transparent'
        )}
      >
        <div className="mx-auto w-full max-w-container px-6 md:px-10 lg:px-14">
          <div className="flex h-14 items-center justify-between md:h-16 lg:h-[72px]">
            {/* Wordmark / home */}
            <Link
              href="/"
              aria-label="Silvertone Design Co. — home"
              className="focus-visible:outline-bone-base"
            >
              <Wordmark size="nav" />
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-x-10">
                {PRIMARY_NAV.map(({ href, label }) => (
                  <li key={href}>
                    <NavLink href={href} label={label} pathname={pathname} />
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile hamburger */}
            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
              className="
                relative h-10 w-10 -mr-2 lg:hidden
                text-bone-base
                transition-opacity duration-fast hover:opacity-70
                focus-visible:outline-bone-base
              "
            >
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-[14px] block h-px w-6 -translate-x-1/2 bg-current"
              />
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 block h-px w-6 -translate-x-1/2 -translate-y-1/2 bg-current"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-[14px] left-1/2 block h-px w-6 -translate-x-1/2 bg-current"
              />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        triggerRef={hamburgerRef}
      />
    </>
  )
}

// ──────────────────────────────────────────────────────────────────────
// NavLink — desktop primary nav
// ──────────────────────────────────────────────────────────────────────

function NavLink({
  href,
  label,
  pathname,
}: {
  href: string
  label: string
  pathname: string | null
}) {
  const isActive =
    pathname === href || (href !== '/' && pathname?.startsWith(`${href}/`))

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'group relative inline-block py-2',
        'font-mono text-[14px] uppercase tracking-[0.05em]',
        'transition-colors duration-base ease-out-quart',
        isActive
          ? 'text-bone-base'
          : 'text-bone-muted hover:text-bone-base focus-visible:text-bone-base'
      )}
    >
      {label}
      <span
        aria-hidden="true"
        className={cn(
          'absolute -bottom-0.5 left-0 right-0 h-px bg-current',
          'origin-left transition-transform duration-base ease-out-quart',
          'group-hover:scale-x-100 group-focus-visible:scale-x-100',
          isActive ? 'scale-x-100' : 'scale-x-0'
        )}
      />
    </Link>
  )
}
