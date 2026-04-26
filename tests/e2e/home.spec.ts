import { test, expect } from '@playwright/test'

// §20.2 — home page e2e

test('home page renders all sections', async ({ page }) => {
  await page.goto('/')
  // Hero copy verbatim per §A3.3 Option D
  await expect(page.getByText('Design for')).toBeVisible()
  await expect(page.getByText('complex systems.')).toBeVisible()
  // Primary navigation
  await expect(page.getByRole('navigation', { name: 'Primary' })).toBeVisible()
  // Selected projects heading
  await expect(
    page.getByRole('heading', { name: 'Selected projects.' })
  ).toBeVisible()
})

test('skip link is the first focusable element', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  const skipLink = page.getByRole('link', { name: /Skip to main content/i })
  await expect(skipLink).toBeFocused()
})

test('mobile menu opens and closes via Escape', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Open navigation menu' }).click()
  await expect(page.getByRole('dialog', { name: 'Navigation menu' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(
    page.getByRole('dialog', { name: 'Navigation menu' })
  ).not.toBeVisible()
})

test('work index renders the works list', async ({ page }) => {
  await page.goto('/work')
  await expect(page.getByRole('heading', { name: 'All work.' })).toBeVisible()
  // At least one work link present
  const workLinks = page.getByRole('link', { name: /case study/i })
  await expect(workLinks.first()).toBeVisible()
})

test('project detail loads + has next-project link', async ({ page }) => {
  await page.goto('/work/federal-platform-modernization')
  await expect(
    page.getByRole('heading', { name: 'Federal Platform Modernization' })
  ).toBeVisible()
  // Next project section
  await expect(page.getByText('Next —', { exact: false })).toBeVisible()
})

test('about page renders capabilities', async ({ page }) => {
  await page.goto('/about')
  await expect(page.getByRole('heading', { name: 'Practice.' })).toBeVisible()
  await expect(page.getByText('Expertise')).toBeVisible()
  await expect(page.getByText('Fields')).toBeVisible()
  await expect(page.getByText('Tools')).toBeVisible()
})

test('connect page renders contact methods', async ({ page }) => {
  await page.goto('/connect')
  await expect(
    page.getByRole('heading', { name: /Let.s work together/ })
  ).toBeVisible()
  await expect(page.getByText('silvertonedesignco@gmail.com').first()).toBeVisible()
})

test('404 renders for unknown route', async ({ page }) => {
  const response = await page.goto('/nope-this-does-not-exist')
  expect(response?.status()).toBe(404)
  await expect(page.getByRole('heading', { name: 'Page not found.' })).toBeVisible()
})
