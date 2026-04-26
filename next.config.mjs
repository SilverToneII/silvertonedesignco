import nextMDX from '@next/mdx'

/**
 * Next config — §21.6 baseline + MDX wiring (§9.3 + §A5.4).
 *
 * MDX files are treated as importable React components. Frontmatter is
 * NOT auto-parsed by @next/mdx; src/lib/content.ts handles that via
 * gray-matter (per §A5.4 working pattern).
 */

const withMDX = nextMDX({
  extension: /\.mdx?$/,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizePackageImports: ['gsap'],
  },
}

export default withMDX(nextConfig)
