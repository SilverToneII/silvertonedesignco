import nextMDX from '@next/mdx'
import withBundleAnalyzer from '@next/bundle-analyzer'
import remarkFrontmatter from 'remark-frontmatter'

/**
 * Next config — §21.6 baseline + MDX wiring (§9.3 + §A5.4).
 *
 * MDX files are treated as importable React components. The frontmatter
 * data itself is parsed by gray-matter at build time in src/lib/content.ts;
 * remark-frontmatter just strips the YAML block out of the MDX body so
 * acorn doesn't try to parse `{{ ... }}` placeholders in the frontmatter
 * as JSX expressions.
 */

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter],
  },
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

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

export default bundleAnalyzer(withMDX(nextConfig))
