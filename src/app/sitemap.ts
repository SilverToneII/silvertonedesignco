/**
 * sitemap.ts — §18.3
 * Statically generates sitemap.xml at build with all routes + work slugs.
 */
import type { MetadataRoute } from 'next'
import { getAllWorks } from '@/lib/content'

const SITE_URL = 'https://silvertonedesignco.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const works = await getAllWorks()
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    '/',
    '/work',
    '/about',
    '/feed',
    '/connect',
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1.0 : 0.8,
  }))

  const workRoutes: MetadataRoute.Sitemap = works.map((work) => ({
    url: `${SITE_URL}/work/${work.slug}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...workRoutes]
}
