import { test, expect } from '@playwright/test'

test('renders the hero heading', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1, name: 'Pavlo Hupalo' })).toBeVisible()
})

test('nav link scrolls to its section', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Skills' }).click()
  await expect(page).toHaveURL(/#skills$/)
})
