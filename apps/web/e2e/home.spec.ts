import { expect, test } from '@playwright/test'
import { PROFILE } from '../src/data/profile.ts'

// Philippine mobile numbers, e.g. 0912-345-6789 or +63 912 345 6789.
const PHONE_NUMBER_PATTERN = /(\+63|0)\s?9\d{2}[\s-]?\d{3}[\s-]?\d{4}/

test.describe('home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('shows the name and every section, and never a phone number', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Wilian Nunag.')
    for (const title of ['At a glance', 'Selected projects', "Let's work together."]) {
      await expect(page.getByRole('heading', { level: 2, name: title })).toBeVisible()
    }
    await expect(page.locator('body')).not.toContainText(PHONE_NUMBER_PATTERN)
  })

  test('a nav link scrolls to its section and marks it as current', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Phones use the menu button instead of inline links.')

    const workLink = page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Work' })
    await workLink.click()

    await expect(page).toHaveURL(/#work$/)
    await expect(page.locator('#work')).toBeInViewport()
    await expect(workLink).toHaveAttribute('aria-current', 'location')
  })

  test('the menu button opens the menu, and a link closes it', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'The menu button only shows on small screens.')

    await page.getByRole('button', { name: 'Open menu' }).click()
    const closeButton = page.getByRole('button', { name: 'Close menu' })
    await expect(closeButton).toHaveAttribute('aria-expanded', 'true')

    await page.locator('#mobile-menu').getByRole('link', { name: 'Contact' }).click()

    await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false')
    await expect(page.locator('#contact')).toBeInViewport()
  })

  test('the theme toggle switches to light mode and remembers it', async ({ page }) => {
    const html = page.locator('html')
    await expect(html).toHaveClass(/dark/)

    await page.getByRole('button', { name: 'Switch to light mode' }).click()
    await expect(html).not.toHaveClass(/dark/)

    await page.reload()
    await expect(html).not.toHaveClass(/dark/)
  })

  test('the copy button puts the email address on the clipboard', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])

    await page.getByRole('button', { name: 'Copy' }).click()

    await expect(page.getByRole('button', { name: 'Copied' })).toBeVisible()
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(PROFILE.email)
  })
})

test('"reduce motion" stops the logo carousel', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  await expect(page.getByRole('list', { name: 'Tech stack' })).toHaveCSS('animation-name', 'none')
})
