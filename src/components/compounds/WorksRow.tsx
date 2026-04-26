'use client'

/**
 * <WorksRow> — §12.5 (signature component)
 *
 * Row anatomy:
 *   2025      Federal Benefits Portal              [UX/UI] [SYSTEM]
 *   year      title (h3 display)                   tags
 *
 * Renders as <div role="listitem"> wrapping a <Link> so the parent
 * works list can be role="list" (we drop semantic <ul>/<li> because
 * RevealOnScroll's stagger requires direct-child wrapper structure).
 *
 * Hover (desktop / fine-pointer):
 *   • Title translateX 0→8px, 400ms out-quart
 *   • Top hairline color → ink.bright
 *   • HoverImage shown via shared ref + tracked via mousemove
 *
 * Mobile / touch:
 *   • Cover image rendered as static thumbnail above the title
 *   • No HoverImage (the parent list never mounts it on touch)
 *
 * Animation in: handled by parent's <RevealOnScroll stagger>.
 */
import { type RefObject } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { TagPill } from '@/components/primitives/TagPill'
import type { Work } from '@/lib/content'
import type { HoverImageHandle } from './HoverImage'

interface WorksRowProps {
  work: Work
  index: number
  isLast?: boolean
  hoverImageRef?: RefObject<HoverImageHandle | null>
}

export function WorksRow({
  work,
  index: _index,
  isLast,
  hoverImageRef,
}: WorksRowProps) {
  function onMouseEnter() {
    hoverImageRef?.current?.show(work.hoverPreview ?? work.cover, work.title)
  }
  function onMouseLeave() {
    hoverImageRef?.current?.hide()
  }
  function onMouseMove(event: React.MouseEvent) {
    // Offset right + above cursor so the image doesn't sit under it
    hoverImageRef?.current?.move(event.clientX + 24, event.clientY - 220)
  }

  return (
    <div role="listitem" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onMouseMove={onMouseMove}>
      <Link
        href={`/work/${work.slug}`}
        aria-label={`View ${work.title} case study from ${work.year}`}
        className="works-row group block focus-visible:outline-bone-base"
      >
        {/* Mobile: stacked cover thumbnail */}
        <div className="works-row__cover-mobile mt-6 md:hidden">
          <Image
            src={work.cover}
            alt=""
            width={1600}
            height={1200}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <div
          className="
            grid grid-cols-1 gap-y-2
            py-6
            md:grid-cols-[10ch_1fr_auto] md:gap-x-6 md:py-8
            lg:grid-cols-[80px_1fr_auto] lg:py-10
          "
        >
          {/* Year */}
          <span
            className="
              font-mono text-mono-md uppercase text-bone-muted
              transition-colors duration-base ease-out-quart
              group-hover:text-bone-base group-focus-visible:text-bone-base
            "
          >
            {work.year}
          </span>

          {/* Title */}
          <span
            className="
              font-display text-h3 text-bone-base
              transition-transform duration-base ease-out-quart
              group-hover:translate-x-2 group-focus-visible:translate-x-2
            "
          >
            {work.title}
          </span>

          {/* Tags — desktop/tablet only */}
          <div className="hidden flex-wrap items-center gap-x-2 gap-y-2 self-center md:flex">
            {work.tags.map((tag) => (
              <TagPill key={tag} label={tag} size="sm" />
            ))}
          </div>
        </div>

        {isLast ? <div className="works-row__bottom" /> : null}
      </Link>
    </div>
  )
}
