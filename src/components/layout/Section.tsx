import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * <Section> — §12.12 layout primitive
 *
 * Standardizes vertical section padding and the 1440px max-width
 * container with §4.4.1 horizontal gutter (24/40/56 mobile/tablet/desktop).
 *
 * Sizes (Addendum A §A2.3.1 supersedes main spec §12.12 default value
 * — desktop tightened from 144→128px):
 *   • tight   — py-16 md:py-24            (64 / 96 / 96)
 *   • default — py-16 md:py-24 lg:py-32   (64 / 96 / 128)  ← canonical
 *   • loose   — py-24 md:py-32 lg:py-48   (96 / 128 / 192)
 *
 * `fullBleed` skips the max-width wrapper for sections whose children
 * need to extend to the viewport edge (e.g., the project cover image).
 */
type Size = 'tight' | 'default' | 'loose'
type AsKey = 'section' | 'div' | 'article'

interface SectionProps {
  as?: AsKey
  size?: Size
  fullBleed?: boolean
  className?: string
  children: ReactNode
  id?: string
  /** Optional aria-labelledby target for screen-reader landmarks. */
  'aria-labelledby'?: string
}

const sizeClasses: Record<Size, string> = {
  tight: 'py-16 md:py-24',
  default: 'py-16 md:py-24 lg:py-32',
  loose: 'py-24 md:py-32 lg:py-48',
}

export function Section({
  as = 'section',
  size = 'default',
  fullBleed = false,
  className,
  children,
  id,
  'aria-labelledby': ariaLabelledby,
}: SectionProps) {
  const Component = as as ElementType
  return (
    <Component
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn(sizeClasses[size], className)}
    >
      {fullBleed ? (
        children
      ) : (
        <div className="mx-auto w-full max-w-container px-6 md:px-10 lg:px-14">
          {children}
        </div>
      )}
    </Component>
  )
}
