/**
 * <PullQuote> — §9.4 + §A7.4
 *
 * h3 size, 1px left border in bone.faint, pl-6 padding.
 */
import type { ReactNode } from 'react'

interface PullQuoteProps {
  attribution?: string
  children: ReactNode
}

export function PullQuote({ attribution, children }: PullQuoteProps) {
  return (
    <figure className="my-12 border-l border-bone-faint pl-6 lg:my-16">
      <blockquote className="font-display text-h3 text-bone-base">
        <p>{children}</p>
      </blockquote>
      {attribution && (
        <figcaption className="mt-4 font-mono text-mono-sm uppercase text-bone-faint">
          — {attribution}
        </figcaption>
      )}
    </figure>
  )
}
