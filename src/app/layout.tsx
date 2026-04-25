import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

/**
 * JetBrains Mono via next/font (§4.3.1 + §17.3).
 * Variable name `--font-jetbrains-mono` is referenced by the `--font-mono`
 * stack in globals.css :root. Subsetted to Latin only.
 *
 * Clash Display + General Sans are loaded as self-hosted variable WOFF2
 * via @font-face in globals.css (Addendum A §A5.6 mandatory). The
 * <link rel="preload"> tags below kick those off in parallel with the
 * critical render path so type doesn't FOIT/FOUT.
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
  // Icons added in Step 2 so /public/* placeholders are actually picked up
  // by browsers (Next's app/favicon.ico auto-generator was removed there).
  title: 'Silvertone Design Co.',
  description:
    'UX/UI and Product Designer with a decade of experience making complex systems feel simple.',
  icons: {
    icon: [
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    shortcut: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <head>
        {/* §8.4 — preload self-hosted variable fonts for first-paint hierarchy. */}
        <link
          rel="preload"
          href="/fonts/ClashDisplay-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/GeneralSans-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
