import { test, expect } from '@playwright/test';

test('select an event', async ({ page }) => {

  await page.goto('/selection.html');

  await page.getByLabel('TechFest 2026').check();

  await expect(
    page.getByLabel('TechFest 2026')  ).toBeChecked();

});

test('continue with selected event', async ({ page }) => {

  await page.goto('/selection.html');

  await page.getByLabel('TechFest 2026').check();

  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page).toHaveURL(/registration.html/);

});

test('select cultural event', async ({ page }) => {

  await page.goto('/selection.html');

  await page.getByLabel('Cultural Night').check();

  await expect(
    page.getByLabel('Cultural Night')
  ).toBeChecked();

});