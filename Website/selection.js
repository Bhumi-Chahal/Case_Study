import { test, expect } from '@playwright/test';

test('select an event and continue', async ({ page }) => {

  await page.goto('/selection.html');

  await page.getByLabel('TechFest 2026').check();

  await expect(
    page.getByLabel('TechFest 2026')
  ).toBeChecked();

  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page).toHaveURL(/registration.html/);

});