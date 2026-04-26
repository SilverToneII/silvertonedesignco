/**
 * Content types — §9.1 with §7.5 reconciliation.
 *
 * Note: §9.1 type union has 'Startup', §7.5 fields list has
 * 'Startups & Early-Stage'. Going with §7.5 as canonical (content
 * spec wins over type spec when they conflict).
 */

export type WorkTag =
  | 'UX/UI'
  | 'Product Design'
  | 'Design System'
  | 'Research'
  | 'Branding'
  | 'Web Design'
  | 'Development'
  | 'Strategy'

export type WorkField =
  | 'Federal Government'
  | 'Fintech & Payments'
  | 'Music & Culture'
  | 'Art & Culture'
  | 'Healthcare'
  | 'SaaS & Tech'
  | 'Startups & Early-Stage'

export interface Work {
  slug: string
  title: string
  client: string
  year: number
  role: string
  duration: string
  tags: [WorkTag, ...WorkTag[]]
  fields: WorkField[]
  summary: string
  cover: string
  hoverPreview?: string
  featured: boolean
  order: number
  published: boolean
  outcomes?: Array<{ value: string; label: string }>
}
