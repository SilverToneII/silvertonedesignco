import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

/**
 * JetBrains Mono via next/font (§4.3.1 + §17.3).
 * Variable name `--font-jetbrains-mono` is referenced by the `--font-mono`
 * stack in globals.css :root. Subsetted to Latin only.
 *
 * Clash Display + General Sans are loaded via Fontshare @import in
 * globals.css for Step 1. Step 2 adds self-hosted /public/fonts/ fallbacks
 * and <link rel="preload"> tags per §A5.6.
 */
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  // Full site metadata is configured in Step 13 per §18.1.
  // Step 1 placeholder so the document head isn't blank during dev.
  title: 'Silvertone Design Co.',
  description:
    'UX/UI and Product Designer with a decade of experience making complex systems feel simple.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body>{children}</body>
    </html>
  )
}
