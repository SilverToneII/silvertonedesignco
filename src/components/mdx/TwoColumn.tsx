/**
 * <TwoColumn> + <Column> — §9.4
 *
 * Two-column layout for case study side-by-side content. Stacks on
 * mobile, sits side-by-side at md+. Column resets typography to body
 * defaults so headings inside columns stay sized correctly.
 */
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function TwoColumn({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'my-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:my-16 lg:gap-16',
        className
      )}
    >
      {children}
    </div>
  )
}

export function Column({ children }: { children: ReactNode }) {
  return (
    <div className="font-body text-body text-bone-muted [&_h3]:mb-4 [&_h3]:font-display [&_h3]:text-h3 [&_h3]:text-bone-base [&_p]:mt-4">
      {children}
    </div>
  )
}
