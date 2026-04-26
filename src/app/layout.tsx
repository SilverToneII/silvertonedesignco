import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { Footer, Header, SkipLink } from '@/components/layout'
import { LenisProvider } from '@/components/motion'
import './globals.css'

/**
 * JetBrains Mono via next/font (§4.3.1 + §17.3).
 * Variable name `--font-jetbrains-mono` is referenced by the `--font-mono`
 * stack in globals.css :root. Subsetted to Latin only.
 */
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const SITE_URL = 'https://silvertonedesignco.com'
const SITE_DESCRIPTION =
  'UX/UI and Product Designer with a decade of experience making complex systems feel simple. Federal, fintech, culture. Richmond, VA.'

// §18.1 — site-level metadata
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Silvertone Design Co. — UX/UI & Product Design Studio',
    template: '%s — Silvertone Design Co.',
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: 'LaBrew Solomon II' }],
  creator: 'LaBrew Solomon II',
  applicationName: 'Silvertone Design Co.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Silvertone Design Co.',
    title: 'Silvertone Design Co. — UX/UI & Product Design Studio',
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Silvertone Design Co. — Design for complex systems.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Silvertone Design Co.',
    description: SITE_DESCRIPTION,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
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
  alternates: {
    canonical: SITE_URL,
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  colorScheme: 'dark',
}

// §18.2 — Person JSON-LD
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'LaBrew Solomon II',
  url: SITE_URL,
  email: 'silvertonedesignco@gmail.com',
  jobTitle: 'UX/UI Designer & Product Designer',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Richmond',
    addressRegion: 'VA',
    addressCountry: 'US',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <head>
        {/* <html class="js"> before paint so [data-reveal-*] gates are
            JS-conditional. */}
        <script
          dangerouslySetInnerHTML={{
            __html: 'document.documentElement.classList.add("js")',
          }}
        />
        {/* §8.4 — preload self-hosted variable fonts. */}
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
        {/* §18.2 — Person JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <SkipLink />
        <LenisProvider>
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
        </LenisProvider>
        {/* §19.1 — Vercel Analytics (privacy-respecting, cookie-free) */}
        <Analytics />
      </body>
    </html>
  )
}
