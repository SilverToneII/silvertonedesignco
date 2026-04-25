/**
 * Step 1 placeholder home page.
 * Real home page is built in Step 7 per §10.1.
 *
 * Purpose: exercise every token family loaded in Step 1 so the verification
 * gate ("default page loads with correct fonts visible in DevTools") has
 * something to inspect against §4.3.2 / §A2.1 / §A2.2.
 */
export default function Step1Placeholder() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-center gap-10 px-6 md:px-10 lg:px-14">
      <p className="font-mono text-mono-sm uppercase text-bone-faint">
        <span aria-hidden="true">( 001 ) — </span>SCAFFOLD INITIALIZED
      </p>

      <h1 className="font-display text-display-lg text-bone-base">
        Silvertone Design Co.
      </h1>

      <p className="max-w-xl font-body text-body-lg text-bone-muted">
        Step 1 of 16 complete. Design tokens, fonts, and reduced-motion floor
        wired in. Build proceeds at Step 2 (asset setup).
      </p>

      <div className="divider-hair w-full max-w-xl" />

      <ul className="grid w-full max-w-xl grid-cols-2 gap-y-2 font-mono text-mono-sm text-bone-muted">
        <li>display</li>
        <li className="font-display text-bone-base">Clash Display 500</li>
        <li>body</li>
        <li className="font-body text-bone-base">General Sans 400</li>
        <li>mono</li>
        <li className="font-mono text-bone-base">JetBrains Mono 400</li>
      </ul>
    </main>
  )
}
