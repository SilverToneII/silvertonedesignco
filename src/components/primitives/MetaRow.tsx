import { cn } from '@/lib/cn'

/**
 * <MetaRow> — §12.3
 *
 * Inline list of metadata strings separated by middle-dot (or em-dash,
 * or slash) separators. Wraps freely on mobile while keeping separators
 * inline.
 *
 * Used by the hero metadata strip (§10.1.1), project hero overview
 * (§10.3), and any "L. SOLOMON II · RICHMOND, VA · EST. 2015"-style row.
 *
 * Renders as a <ul> for semantic correctness; separators are rendered
 * with aria-hidden so screen readers hear a clean list.
 */
type Separator = '·' | '—' | '/'
type Size = 'mono-xs' | 'mono-sm' | 'mono-md'
type Align = 'left' | 'center' | 'right'

interface MetaRowProps {
  items: string[]
  separator?: Separator
  size?: Size
  align?: Align
  className?: string
}

const sizeClasses: Record<Size, string> = {
  'mono-xs': 'text-mono-xs',
  'mono-sm': 'text-mono-sm',
  'mono-md': 'text-mono-md',
}

const alignClasses: Record<Align, string> = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
}

export function MetaRow({
  items,
  separator = '·',
  size = 'mono-sm',
  align = 'left',
  className,
}: MetaRowProps) {
  return (
    <ul
      className={cn(
        'font-mono uppercase text-bone-faint',
        'flex flex-wrap items-center gap-x-2 gap-y-1',
        sizeClasses[size],
        alignClasses[align],
        className
      )}
    >
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1
        return (
          <li key={`${idx}-${item}`} className="flex items-center gap-x-2">
            <span>{item}</span>
            {!isLast && (
              <span aria-hidden="true" className="select-none">
                {separator}
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
