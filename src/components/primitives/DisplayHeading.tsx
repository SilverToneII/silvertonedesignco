import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * <DisplayHeading> — §12.2
 *
 * Renders display/heading-scale text with the canonical font, weight,
 * and tracking. Always font-display (Clash Display), always weight 500.
 *
 * Display sizes (display-lg/xl/2xl, h1, h2) auto-respond via clamp()
 * formulas baked into the type tokens (§A2.2.2) — no responsive prefixes
 * needed in markup. h3 and h4 are fixed sizes.
 *
 * `balance` applies `text-wrap: balance` for nicer line breaks on
 * multi-word headings (per §A7.3 hero copy guidance).
 */
type SizeKey = 'display-2xl' | 'display-xl' | 'display-lg' | 'h1' | 'h2' | 'h3' | 'h4'
type AsKey = 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'span' | 'p'

interface DisplayHeadingProps {
  as?: AsKey
  size?: SizeKey
  /** Apply text-wrap: balance — recommended for headings ≥3 words. */
  balance?: boolean
  className?: string
  children: ReactNode
  /** DOM id, used by aria-labelledby targets in section landmarks. */
  id?: string
}

const sizeClasses: Record<SizeKey, string> = {
  'display-2xl': 'text-display-2xl',
  'display-xl': 'text-display-xl',
  'display-lg': 'text-display-lg',
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
  h4: 'text-h4',
}

export function DisplayHeading({
  as = 'h2',
  size = 'h2',
  balance = false,
  className,
  children,
  id,
}: DisplayHeadingProps) {
  const Component = as as ElementType
  return (
    <Component
      id={id}
      className={cn(
        'font-display text-bone-base',
        sizeClasses[size],
        balance && 'text-balance',
        className
      )}
    >
      {children}
    </Component>
  )
}
