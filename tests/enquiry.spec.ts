import { test, expect } from './fixtures';

test('enquiry validates and submits to thank-you', async ({ page }) => {
  await page.goto('/contact');
  await page.getByRole('button', { name: 'Send enquiry', exact: true }).click();
  await expect(
    page.locator('.field-error').filter({ hasText: 'Please enter your full name.' }),
  ).toBeVisible();
  await page.getByLabel('Full name *').fill('Test Visitor');
  await page.getByLabel('Mobile number *').fill('9876543210');
  await page.getByLabel('I’m interested in *').selectOption('Hair Extensions');
  await page.getByLabel('I agree to be contacted').check();
  await page.getByRole('button', { name: 'Send enquiry', exact: true }).click();
  await expect(page).toHaveURL(/thank-you/);
});

test('API rejects invalid enquiries and accepts the requested structure', async ({ request }) => {
  const bad = await request.post('/api/enquiry', { data: { name: 'A' } });
  expect(bad.status()).toBe(400);
  const good = await request.post('/api/enquiry', {
    data: {
      name: 'Test Visitor',
      phone: '9876543210',
      service: 'Hair Replacement',
      branch: 'Kolathur',
      consent: true,
      sourcePage: '/',
      utmSource: 'smoke-test',
    },
  });
  expect(good.status()).toBe(201);
  expect((await good.json()).success).toBe(true);
});
