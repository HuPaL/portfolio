import { test, expect } from '@playwright/test'

const BOOT_KEY = 'pavlo:boot-done'

test.describe('page', () => {
  test.beforeEach(async ({ page }) => {
    // Skip the boot overlay so tests exercise the page itself.
    await page.addInitScript((key) => sessionStorage.setItem(key, '1'), BOOT_KEY)
  })

  test('renders the hero heading', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1, name: 'Pavlo Hupalo' })).toBeVisible()
  })

  test('nav link scrolls to its section', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Skills' }).click()
    await expect(page).toHaveURL(/#skills$/)
    await expect(page.getByRole('heading', { level: 2, name: 'Skills' })).toBeInViewport()
  })

  test('has no horizontal overflow', async ({ page }) => {
    await page.goto('/')
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    expect(overflow).toBeLessThanOrEqual(0)
  })

  test('mobile menu opens and links work', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 })
    await page.goto('/')
    const toggle = page.getByRole('button', { name: 'Menu' })
    await toggle.click()
    await expect(page.getByRole('button', { name: 'Close' })).toHaveAttribute('aria-expanded', 'true')
    await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Contact' }).click()
    await expect(page).toHaveURL(/#contact$/)
    await expect(page.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false')
  })
})

test.describe('boot screen', () => {
  test('is dismissed with Escape and hands focus to the content', async ({ page }) => {
    await page.goto('/')
    const dialog = page.getByRole('dialog', { name: 'Loading PAVLO.EXE' })
    await expect(dialog).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(page.locator('main')).toBeFocused()
  })

  test('is not shown with prefers-reduced-motion', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' })
    const page = await context.newPage()
    await page.goto('/')
    await expect(page.getByRole('dialog')).toHaveCount(0)
    await context.close()
  })
})
