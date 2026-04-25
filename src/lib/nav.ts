/**
 * Navigation tables — single source of truth so Header, Footer, and
 * MobileMenu stay in sync. Order matters per §6.3.
 *
 * External URLs use the placeholders from §A3 until owner confirms
 * (LinkedIn @ Step 12, Calendly @ Step 11, email already canonical).
 */

export const PRIMARY_NAV = [
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/feed', label: 'Feed' },
  { href: '/connect', label: 'Connect' },
] as const

export type PrimaryNavItem = (typeof PRIMARY_NAV)[number]

/** Used by Footer pill row + Connect page (Step 11). */
export const CONTACT_LINKS = {
  email: 'mailto:silvertonedesignco@gmail.com',
  emailDisplay: 'silvertonedesignco@gmail.com',
  // §A3.2 — owner provides real handle by Step 12 deploy
  linkedin: 'https://www.linkedin.com/in/labrew-solomon-ii',
  // §A3.7 — confirmed from current site
  calendly: 'https://calendly.com/silvertonedesignco',
} as const
