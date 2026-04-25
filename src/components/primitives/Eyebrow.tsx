import { cn } from '@/lib/cn'

/**
 * <Eyebrow> — §12.1
 *
 * Numbered or unnumbered section label, always uppercase mono.
 * Anatomy:  ( 002 ) — SELECTED WORK
 *
 * The parenthetical and dash are decorative; aria-hidden so screen
 * readers don't read "open paren zero zero two close paren em-dash."
 * The label itself is announced.
 *
 * Tracking is baked into the `text-mono-sm` token (0.14em) — no need to
 * add it on the wrapper.
 */
interface EyebrowProps {
  /** Two-digit zero-padded number, e.g. "002". Omit for unnumbered. */
  number?: string
  /** Uppercase label text. */
  label: string
  className?: string
}

export function Eyebrow({ number, label, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        'font-mono text-mono-sm uppercase text-bone-faint',
        className
      )}
    >
      {number ? (
        <>
          <span aria-hidden="true">( {number} ) — </span>
          <span>{label}</span>
        </>
      ) : (
        <span>{label}</span>
      )}
    </p>
  )
}
