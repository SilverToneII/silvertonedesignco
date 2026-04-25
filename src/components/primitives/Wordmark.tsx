import type { ElementType } from 'react'
import { cn } from '@/lib/cn'

/**
 * <Wordmark> — referenced by §11.1 primitives folder, used in
 * §12.9 Header (14px nav size), §12.10 Footer (giant decorative),
 * and §12.14 MobileMenu.
 *
 * The wordmark form is `SILVERTONE®` (uppercase, registered mark) per
 * §7.1. The ® is rendered smaller and superscripted so it reads as a
 * mark rather than a same-size character — this matches the convention
 * used by tier-equivalent agency wordmarks.
 *
 * Family choice is size-driven:
 *   • `nav` (14px) → font-mono — display fonts read awkwardly small
 *   • everything else → font-display
 */
type Size = 'nav' | 'sm' | 'md' | 'lg' | 'xl' | 'display'
type AsKey = 'span' | 'div' | 'p' | 'h1' | 'h2'

interface WordmarkProps {
  as?: AsKey
  size?: Size
  className?: string
}

const sizeClasses: Record<Size, string> = {
  // Header — 14px is one-off; tracking eased slightly tight to read as a mark
  nav: 'font-mono text-[14px] tracking-[0.02em] font-medium',
  sm: 'font-display text-h4',
  md: 'font-display text-h2',
  lg: 'font-display text-display-lg',
  xl: 'font-display text-display-xl',
  // Footer giant — display-2xl with the clamp baked in (220px max)
  display: 'font-display text-display-2xl',
}

export function Wordmark({ as = 'span', size = 'nav', className }: WordmarkProps) {
  const Component = as as ElementType
  return (
    <Component
      className={cn(
        'inline-block whitespace-nowrap uppercase text-bone-base',
        sizeClasses[size],
        className
      )}
    >
      SILVERTONE
      <span
        className="ml-[0.05em] align-super text-[0.5em] tracking-normal opacity-70"
        aria-hidden="true"
      >
        ®
      </span>
    </Component>
  )
}
