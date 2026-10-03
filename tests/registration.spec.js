import { test, expect } from '@playwright/test';


test('fill registration form', async ({ page }) => {

  await page.goto('/registration.html');

  await page.evaluate(() => {

    sessionStorage.setItem('userEmail', 'student@gmail.com');

    sessionStorage.setItem('selectedEvent', 'techfest');

  });

  await page.reload();


  await page.getByLabel('Full Name').fill('Test User');

  await page.getByLabel('Phone Number').fill('9876543210');

  await page.getByRole('radio', { name: 'Male', exact: true }).check();

});


test('successful registration', async ({ page }) => {

  await page.goto('/registration.html');

  await page.evaluate(() => {

    sessionStorage.setItem('userEmail', 'student@gmail.com');

    sessionStorage.setItem('selectedEvent', 'techfest');

  });

  await page.reload();


  await page.getByLabel('Full Name').fill('Test User');

  await page.getByLabel('Phone Number').fill('9876543210');

  await page.getByRole('radio', { name: 'Male', exact: true }).check();


  await page.getByRole('button', {
    name: 'Register'
  }).click();


  await expect(
    page.getByText('Registration Successful')
  ).toBeVisible();

});