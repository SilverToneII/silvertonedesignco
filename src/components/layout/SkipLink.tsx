/**
 * <SkipLink> — §12.11 + §16.1
 *
 * First focusable element in the document. Visually hidden until
 * focused (translate-y -200%); on focus it slides into the top-left
 * corner so a keyboard user can skip past the header straight to
 * <main id="main">.
 *
 * Mounted as the first child of <body> in app/layout.tsx.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="
        sr-only
        focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-modal
        focus:bg-bone-base focus:text-ink-base
        focus:px-4 focus:py-2
        focus:font-mono focus:text-mono-sm focus:uppercase
        focus:no-underline
      "
    >
      Skip to main content
    </a>
  )
}
