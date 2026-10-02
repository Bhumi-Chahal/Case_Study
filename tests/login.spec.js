import { test, expect } from '@playwright/test';

test('invalid login', async ({ page }) => {

  await page.goto('/login.html');

  await page.getByLabel('Email').fill('wrong@gmail.com');

  await page.getByLabel('Password').fill('wrong123');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(
    page.getByText('Invalid email or password')
  ).toBeVisible();

});