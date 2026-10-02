import { test, expect } from '@playwright/test';

test('successful registration', async ({ page }) => {

  await page.goto('/registration.html');

  await page.evaluate(() => {
    sessionStorage.setItem('userEmail', 'student@gmail.com');
    sessionStorage.setItem('selectedEvent', 'techfest');
  });

  await page.reload();

  await page.getByRole('button', {
    name: 'Confirm Registration'
  }).click();

  await expect(
    page.getByText('Registration Successful')
  ).toBeVisible();

});