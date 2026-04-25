import { cn } from '@/lib/cn'

/**
 * <Divider> — §4.5 hairline rule.
 *
 * Renders an <hr> using the .divider-hair (or .divider-hair-bright)
 * utility class from globals.css, which handles the retina @media
 * fallback (§A5.2): 1px on standard, 0.5px on retina/192dpi+.
 *
 * Variants:
 *   • `hair`   — ink.border (#1F1F1F), default
 *   • `bright` — ink.bright (#2A2A2A), used on row hover (§12.5)
 */
type Variant = 'hair' | 'bright'

interface DividerProps {
  variant?: Variant
  className?: string
}

const variantClasses: Record<Variant, string> = {
  hair: 'divider-hair',
  bright: 'divider-hair-bright',
}

export function Divider({ variant = 'hair', className }: DividerProps) {
  return (
    <hr
      role="separator"
      className={cn('m-0 w-full', variantClasses[variant], className)}
    />
  )
}
