import { cn } from '@/lib/cn'

/**
 * <TagPill> — §12.4
 *
 * The ONLY rounded element in the system (§4.6 / §2.3 anti-patterns).
 * Default variant: 1px solid bone.ghost border, transparent bg.
 * Subtle variant: no border, ink.raised bg.
 *
 * Padding values are spec-literal. `sm` is intentionally off the 4px
 * grid (3px y, 9px x per §12.4 anatomy) — kept verbatim because the
 * pill needs that exact compactness around mono-xs at 10px to read
 * proportionally.
 *
 * Hover transition (§12.4): border color → bone.faint over 200ms when
 * inside a Link wrapper. We listen for the parent's group-hover so the
 * whole row triggers it, not just hovering the pill itself.
 */
type Size = 'sm' | 'md'
type Variant = 'default' | 'subtle'

interface TagPillProps {
  label: string
  size?: Size
  variant?: Variant
  className?: string
}

const sizeClasses: Record<Size, string> = {
  sm: 'py-[3px] px-[9px]', // §12.4 literal — off-grid by design
  md: 'py-1 px-3', // 4×12 — on grid
}

const variantClasses: Record<Variant, string> = {
  default:
    'border border-bone-ghost bg-transparent hover:border-bone-faint group-hover:border-bone-faint',
  subtle: 'border-0 bg-ink-raised',
}

export function TagPill({
  label,
  size = 'sm',
  variant = 'default',
  className,
}: TagPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill',
        'font-mono text-mono-xs uppercase text-bone-base',
        'transition-colors duration-fast ease-out-quart',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {label}
    </span>
  )
}
