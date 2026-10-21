
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/registration.html');

  await page.evaluate(() => {
    sessionStorage.setItem('userEmail', 'student@gmail.com');
    sessionStorage.setItem('selectedEvent', 'techfest');
  });

  await page.reload();
});

test('fill registration form', async ({ page }) => {
  await page.getByLabel('Full Name').fill('Test User');
  await page.getByLabel('Phone Number').fill('9876543210');

  const maleRadio = page.getByRole('radio', {
    name: 'Male',
    exact: true
  });

  await maleRadio.check();
  await expect(maleRadio).toBeChecked();
});

test('successful registration', async ({ page }) => {
  await page.getByLabel('Full Name').fill('Test User');
  await page.getByLabel('Phone Number').fill('9876543210');

  await page.getByRole('radio', {
    name: 'Male',
    exact: true
  }).check();

  await page.getByRole('button', { name: 'Register' }).click();

  await expect(page.getByText('Registration Successful')).toBeVisible();
});

test('phone number validation', async ({ page }) => {
  const phone = page.getByLabel('Phone Number');

  // More than 10 digits should be invalid
  await phone.fill('12345678901');
  await expect(phone).toHaveJSProperty('validity.valid', false);

  // Numbers starting with 00 should be invalid
  await phone.fill('0012345678');
  await expect(phone).toHaveJSProperty('validity.valid', false);

  // A valid 10-digit number should be accepted
  await phone.fill('9876543210');
  await expect(phone).toHaveJSProperty('validity.valid', true);
});
