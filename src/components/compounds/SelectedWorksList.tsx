'use client'

/**
 * <SelectedWorksList> — client wrapper that wires WorksRows + HoverImage.
 *
 * The home page (server) loads featured works and passes them in. This
 * component owns the cursor-tracked HoverImage instance and the
 * stagger reveal so the works list animates as a unit.
 */
import { useRef, type ReactNode } from 'react'
import { WorksRow } from './WorksRow'
import { HoverImage, type HoverImageHandle } from './HoverImage'
import { RevealOnScroll } from '@/components/motion'
import type { Work } from '@/lib/content'

interface SelectedWorksListProps {
  works: Work[]
  /** Optional empty-state slot if no works are featured/published. */
  emptyState?: ReactNode
  /** Aria-label for the role=list group. */
  ariaLabel?: string
}

export function SelectedWorksList({
  works,
  emptyState,
  ariaLabel = 'Selected work, sorted by year',
}: SelectedWorksListProps) {
  const hoverImageRef = useRef<HoverImageHandle | null>(null)

  if (works.length === 0) {
    return emptyState ? <>{emptyState}</> : null
  }

  return (
    <>
      <div role="list" aria-label={ariaLabel}>
        <RevealOnScroll stagger={60} yOffset={16} duration={600}>
          {works.map((work, index) => (
            <WorksRow
              key={work.slug}
              work={work}
              index={index}
              isLast={index === works.length - 1}
              hoverImageRef={hoverImageRef}
            />
          ))}
        </RevealOnScroll>
      </div>

      <HoverImage
        ref={hoverImageRef}
        preloadSrcs={works.map((w) => w.hoverPreview ?? w.cover)}
      />
    </>
  )
}
