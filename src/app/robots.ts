/**
 * robots.ts — §18.4
 * Allow public routes, disallow /styleguide (internal).
 */
import type { MetadataRoute } from 'next'

const SITE_URL = 'https://silvertonedesignco.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/styleguide'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
