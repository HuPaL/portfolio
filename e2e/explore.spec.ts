import AxeBuilder from '@axe-core/playwright'
import { test, expect, type Page } from '@playwright/test'

async function skipBoot(page: Page) {
  await page.addInitScript(() => sessionStorage.setItem('pavlo:boot-done', '1'))
}

async function openExplorer(page: Page) {
  await page.getByRole('button', { name: 'Explore in 3D' }).click()
  await expect(page.getByRole('region', { name: '3D explorer' })).toBeVisible({ timeout: 15_000 })
}

test.describe('3D explorer', () => {
  test.beforeEach(async ({ page }) => skipBoot(page))

  test('is loaded lazily, only after the user opts in', async ({ page }) => {
    const requested: string[] = []
    page.on('request', (req) => {
      if (/ExploreView/.test(req.url())) requested.push(req.url())
    })
    await page.goto('/')
    await expect(page.getByRole('button', { name: 'Explore in 3D' })).toBeVisible()
    expect(requested).toHaveLength(0)

    await openExplorer(page)
    expect(requested.length).toBeGreaterThan(0)
  })

  test('opens a zone from the DOM menu, returns focus on Escape, and exits to the page', async ({
    page,
  }) => {
    await page.goto('/')
    await openExplorer(page)

    await expect(page.locator('[data-zone-button]')).toHaveCount(7)
    // The regular page is unmounted while exploring, so section ids never collide.
    await expect(page.locator('main')).toHaveCount(0)

    await page.locator('[data-zone-button="projects"]').click()
    const dialog = page.getByRole('dialog', { name: 'Projects' })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByRole('heading', { level: 2, name: 'Projects' })).toBeVisible()
    await expect(dialog).toBeFocused()

    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
    await expect(page.locator('[data-zone-button="projects"]')).toBeFocused()

    await page.getByRole('button', { name: 'Exit 3D' }).click()
    await expect(page.locator('main')).toBeVisible()
    await expect(page.locator('#explore-toggle')).toBeFocused()
  })

  test('in-page links inside a zone open the matching zone', async ({ page }) => {
    await page.goto('/')
    await openExplorer(page)
    await page.locator('[data-zone-button="hero"]').click()
    await page.getByRole('dialog', { name: 'Home' }).getByRole('link', { name: 'Get in touch' }).click()
    await expect(page.getByRole('dialog', { name: 'Contact' })).toBeVisible()
  })

  test('a node in the scene can be clicked to open its zone', async ({ page }) => {
    await page.goto('/')
    await openExplorer(page)
    const { width, height } = page.viewportSize() ?? { width: 1280, height: 720 }

    // The fly-in has settled once the Home label (drawn under its node) sits at the viewport centre.
    const homeLabel = page.locator('span', { hasText: /^Home$/ })
    await expect
      .poll(
        async () => {
          const box = await homeLabel.boundingBox()
          return box ? Math.abs(box.x + box.width / 2 - width / 2) : Number.POSITIVE_INFINITY
        },
        { timeout: 15_000 },
      )
      .toBeLessThan(2)

    // Raycasting happens on pointer move, so hover first, then wait for the hover state.
    await page.mouse.move(width / 2 - 20, height / 2 - 20)
    await page.mouse.move(width / 2, height / 2, { steps: 5 })
    await expect(page.getByRole('region', { name: '3D explorer' })).toHaveClass(/cursor-pointer/)
    await page.mouse.down()
    await page.mouse.up()
    await expect(page.getByRole('dialog', { name: 'Home' })).toBeVisible()
  })

  test('renders without console errors (guards the trimmed three.js barrel)', async ({ page }) => {
    // `src/scene/three-lite.ts` exposes only some three.js classes to TresJS; a Tres element
    // whose class is missing there logs "... is not defined on the THREE namespace".
    const problems: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') problems.push(msg.text())
    })
    page.on('pageerror', (error) => problems.push(String(error)))

    await page.goto('/')
    await openExplorer(page)
    await page.locator('[data-zone-button="projects"]').click()
    await expect(page.getByRole('dialog', { name: 'Projects' })).toBeVisible()
    await expect(page.locator('canvas')).toBeVisible()
    expect(problems).toEqual([])
  })

  test('has no WCAG A/AA violations with a zone open', async ({ page }) => {
    await page.goto('/')
    await openExplorer(page)
    await page.locator('[data-zone-button="skills"]').click()
    await expect(page.getByRole('dialog', { name: 'Skills' })).toBeVisible()
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    expect(results.violations).toEqual([])
  })
})

test.describe('3D explorer fallbacks', () => {
  test.beforeEach(async ({ page }) => skipBoot(page))

  test('is not offered on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 })
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Explore in 3D' })).toHaveCount(0)
  })

  test('is not offered with prefers-reduced-motion', async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: 'reduce' })
    const page = await context.newPage()
    await skipBoot(page)
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Explore in 3D' })).toHaveCount(0)
    await context.close()
  })

  test('is not offered without WebGL, and the page still works', async ({ page }) => {
    await page.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext
      HTMLCanvasElement.prototype.getContext = function (
        this: HTMLCanvasElement,
        type: string,
        ...rest: unknown[]
      ) {
        if (type === 'webgl' || type === 'webgl2' || type === 'experimental-webgl') return null
        return (original as (...args: unknown[]) => unknown).call(this, type, ...rest)
      } as typeof original
    })
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1, name: 'Pavlo Hupalo' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Explore in 3D' })).toHaveCount(0)
  })
})
