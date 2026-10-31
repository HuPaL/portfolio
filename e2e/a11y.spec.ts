import AxeBuilder from '@axe-core/playwright'
import { test, expect } from '@playwright/test'

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']

test.describe('accessibility (axe)', () => {
  test('page has no WCAG A/AA violations on desktop', async ({ page }) => {
    await page.addInitScript(() => sessionStorage.setItem('pavlo:boot-done', '1'))
    await page.goto('/')
    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze()
    expect(results.violations).toEqual([])
  })

  test('page has no WCAG A/AA violations on mobile with the menu open', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 })
    await page.addInitScript(() => sessionStorage.setItem('pavlo:boot-done', '1'))
    await page.goto('/')
    await page.getByRole('button', { name: 'Menu' }).click()
    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze()
    expect(results.violations).toEqual([])
  })

  test('boot screen has no WCAG A/AA violations', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('dialog')).toBeVisible()
    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze()
    expect(results.violations).toEqual([])
  })
})
