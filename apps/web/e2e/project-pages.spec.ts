import { expect, test } from '@playwright/test'

test('a project row opens its page, and the next and back links work', async ({ page }) => {
  await page.goto('/')

  await page.locator('#work').getByRole('link', { name: /Dental Management System/ }).click()

  await expect(page).toHaveURL(/\/projects\/dental-management-system$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Dental Management System')
  await expect(page).toHaveTitle('Dental Management System — Wilian Nunag')

  await page.getByRole('link', { name: /Next project/ }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Apparel Store Management System')

  await page.getByRole('link', { name: 'All projects' }).click()
  await expect(page).toHaveURL(/\/#work$/)
  await expect(page.locator('#work')).toBeInViewport()
})

test('an unknown project shows the 404 page', async ({ page }) => {
  await page.goto('/projects/not-a-real-project')

  await expect(page.getByRole('heading', { level: 1 })).toHaveText("This page doesn't exist.")
  await expect(page).toHaveTitle(/Page not found/)
})
