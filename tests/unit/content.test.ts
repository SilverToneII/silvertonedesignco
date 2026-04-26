import { describe, it, expect } from 'vitest'
import {
  getAllWorks,
  getWorkBySlug,
  getFeaturedWorks,
  getNextWork,
} from '@/lib/content'

describe('content loader (§9.2 Zod schema + §A5.4)', () => {
  it('loads all published works', async () => {
    const works = await getAllWorks()
    expect(works.length).toBeGreaterThan(0)
    expect(works.every((w) => w.published)).toBe(true)
  })

  it('sorts by year DESC, then order ASC', async () => {
    const works = await getAllWorks()
    for (let i = 1; i < works.length; i++) {
      const prev = works[i - 1]
      const curr = works[i]
      if (!prev || !curr) continue
      if (prev.year === curr.year) {
        expect(prev.order).toBeLessThanOrEqual(curr.order)
      } else {
        expect(prev.year).toBeGreaterThanOrEqual(curr.year)
      }
    }
  })

  it('every work has required frontmatter fields', async () => {
    const works = await getAllWorks()
    for (const w of works) {
      expect(w.slug).toMatch(/^[a-z0-9-]{1,60}$/)
      expect(w.title.length).toBeGreaterThanOrEqual(3)
      expect(w.title.length).toBeLessThanOrEqual(60)
      expect(w.summary.length).toBeGreaterThanOrEqual(40)
      expect(w.summary.length).toBeLessThanOrEqual(180)
      expect(w.tags.length).toBeGreaterThanOrEqual(1)
      expect(w.tags.length).toBeLessThanOrEqual(4)
      expect(w.fields.length).toBeGreaterThanOrEqual(1)
      expect(w.fields.length).toBeLessThanOrEqual(2)
      expect(w.year).toBeGreaterThanOrEqual(2015)
      expect(w.cover.startsWith('/images/')).toBe(true)
    }
  })
})

describe('getWorkBySlug', () => {
  it('returns the matching work', async () => {
    const works = await getAllWorks()
    const first = works[0]
    if (!first) throw new Error('no works to test')
    const fetched = await getWorkBySlug(first.slug)
    expect(fetched).not.toBeNull()
    expect(fetched?.slug).toBe(first.slug)
  })

  it('returns null for unknown slug', async () => {
    const fetched = await getWorkBySlug('this-slug-does-not-exist')
    expect(fetched).toBeNull()
  })
})

describe('getFeaturedWorks', () => {
  it('returns at most `limit` items', async () => {
    const works = await getFeaturedWorks(2)
    expect(works.length).toBeLessThanOrEqual(2)
    expect(works.every((w) => w.featured)).toBe(true)
  })
})

describe('getNextWork', () => {
  it('loops oldest back to newest', async () => {
    const works = await getAllWorks()
    if (works.length < 2) return
    const last = works[works.length - 1]
    if (!last) return
    const next = await getNextWork(last.slug)
    expect(next?.slug).toBe(works[0]?.slug)
  })

  it('returns the next chronological work', async () => {
    const works = await getAllWorks()
    if (works.length < 2) return
    const first = works[0]
    if (!first) return
    const next = await getNextWork(first.slug)
    expect(next?.slug).toBe(works[1]?.slug)
  })
})
