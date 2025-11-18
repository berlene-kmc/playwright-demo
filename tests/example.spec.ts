import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/)
  await page.pause()
})

test('get started link', async ({ page }) => {
  await page.goto('https://www.nuls-moa.com/')
  await page.waitForTimeout(3000)
  // Click the get started link.
  // await page.getByText(/Sign up here/i).click()

  // Expects page to have a heading with the name of Installation.
  // await expect(page.getByRole('heading', { name: 'Create an Account' })).toBeVisible()
  // await page.pause()
  await page.fill('input[name="email"]', 'bernabebf@students.nu-moa.edu.ph')
  await page.fill('input[name="password"]', 'Mikmik1224!')
  await page.click('button[type="submit"]')
  await expect(page.getByRole('heading', { name: 'National University Laboratory System' })).toBeVisible() // Header
  await page.getByRole('button', { name: 'OK' }).click() // Ant Design Modal
  await page.getByRole('menuitem', { name: /Sign Out/i }).click() // Nar bar
  await page.getByRole('button', { name: 'Yes, Sign Out' }).click()
  await page.pause()
})
