import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

// §16.5 — Axe accessibility checks across all primary routes.
// Build gate: zero violations on any tested route.

const ROUTES = ['/', '/work', '/about', '/connect', '/feed'] as const

for (const route of ROUTES) {
  test(`${route} has no detectable WCAG 2.2 AA violations`, async ({ page }) => {
    await page.goto(route)
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
      .analyze()
    expect(
      results.violations,
      `axe violations on ${route}: ${JSON.stringify(results.violations, null, 2)}`
    ).toEqual([])
  })
}

test('/work/[slug] has no detectable WCAG 2.2 AA violations', async ({
  page,
}) => {
  await page.goto('/work/federal-platform-modernization')
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
    .analyze()
  expect(results.violations).toEqual([])
})
