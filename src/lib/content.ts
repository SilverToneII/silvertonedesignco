/**
 * MDX work content loader — §9.2 + §A5.4.
 *
 * Reads src/content/works/*.mdx (skipping `_*` files), parses frontmatter
 * via gray-matter, validates against the Zod schema below, and returns
 * a sorted, published-only list. Build fails loudly on invalid frontmatter.
 *
 * Body rendering: this module returns metadata only. Project detail page
 * (Step 9) imports the MDX body via dynamic import using the slug→filename
 * map below.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'
import { z } from 'zod'

const tagSchema = z.enum([
  'UX/UI',
  'Product Design',
  'Design System',
  'Research',
  'Branding',
  'Web Design',
  'Development',
  'Strategy',
])

const fieldSchema = z.enum([
  'Federal Government',
  'Fintech & Payments',
  'Music & Culture',
  'Art & Culture',
  'Healthcare',
  'SaaS & Tech',
  'Startups & Early-Stage',
])

const workSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]{1,60}$/),
  title: z.string().min(3).max(60),
  client: z.string().min(2).max(60),
  year: z
    .number()
    .int()
    .min(2015)
    .max(new Date().getFullYear()),
  role: z.string().min(5).max(80),
  duration: z.string().min(2).max(40),
  tags: z.array(tagSchema).min(1).max(4),
  fields: z.array(fieldSchema).min(1).max(2),
  summary: z.string().min(40).max(180),
  cover: z.string().startsWith('/images/'),
  hoverPreview: z.string().startsWith('/images/').optional(),
  featured: z.boolean(),
  order: z.number().int(),
  published: z.boolean().default(true),
  outcomes: z
    .array(
      z.object({
        value: z.string().max(20),
        label: z.string().max(40),
      })
    )
    .max(3)
    .optional(),
})

export type Work = z.infer<typeof workSchema>

const CONTENT_DIR = path.join(process.cwd(), 'src/content/works')

let _cache: Work[] | null = null

async function loadAllWorksFromDisk(): Promise<Work[]> {
  const files = await fs.readdir(CONTENT_DIR)
  const mdxFiles = files.filter((f) => f.endsWith('.mdx') && !f.startsWith('_'))

  const works = await Promise.all(
    mdxFiles.map(async (filename) => {
      const filepath = path.join(CONTENT_DIR, filename)
      const raw = await fs.readFile(filepath, 'utf-8')
      const { data } = matter(raw)
      const result = workSchema.safeParse(data)
      if (!result.success) {
        throw new Error(
          `Invalid frontmatter in ${filename}: ${result.error.message}`
        )
      }
      return result.data
    })
  )

  return works
    .filter((w) => w.published)
    .sort((a, b) => b.year - a.year || a.order - b.order)
}

export async function getAllWorks(): Promise<Work[]> {
  // Cache across an SSR/SSG build so we don't re-parse 10× per request.
  if (_cache) return _cache
  _cache = await loadAllWorksFromDisk()
  return _cache
}

export async function getWorkBySlug(slug: string): Promise<Work | null> {
  const works = await getAllWorks()
  return works.find((w) => w.slug === slug) ?? null
}

export async function getFeaturedWorks(limit = 4): Promise<Work[]> {
  const works = await getAllWorks()
  return works.filter((w) => w.featured).slice(0, limit)
}

export async function getNextWork(currentSlug: string): Promise<Work | null> {
  const works = await getAllWorks()
  if (works.length === 0) return null
  const idx = works.findIndex((w) => w.slug === currentSlug)
  if (idx === -1) return null
  // Loop back to top per §10.3 "loops from oldest back to newest"
  return works[(idx + 1) % works.length] ?? null
}
