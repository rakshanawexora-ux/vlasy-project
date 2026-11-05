import { test, expect } from './fixtures';

test('enquiry validates and submits to thank-you', async ({ page }) => {
  await page.route('**/api/enquiry', (route) =>
    route.fulfill({ status: 201, json: { success: true } }),
  );
  await page.goto('/contact');
  await page.getByRole('button', { name: 'Send enquiry', exact: true }).click();
  await expect(
    page.locator('.field-error').filter({ hasText: 'Please enter your full name.' }),
  ).toBeVisible();
  await page.getByLabel('Full name *').fill('Test Visitor');
  await page.getByLabel('Mobile number *').fill('9876543210');
  await page.getByLabel('I’m interested in *').selectOption('Hair Extensions Services');
  await page.getByLabel('I agree to be contacted').check();
  await page.getByRole('button', { name: 'Send enquiry', exact: true }).click();
  await expect(page).toHaveURL(/thank-you/);
});

test('API rejects invalid enquiries and never reports a logged-only message as delivered', async ({
  request,
}) => {
  const bad = await request.post('/api/enquiry', { data: { name: 'A' } });
  expect(bad.status()).toBe(400);
  const status = await (await request.get('/api/enquiry')).json();
  if (!status.available) {
    const response = await request.post('/api/enquiry', {
      data: {
        name: 'Test Visitor',
        phone: '9876543210',
        service: 'Hair Replacement',
        branch: 'Kolathur',
        consent: true,
      },
    });
    expect(response.status()).toBe(503);
    expect((await response.json()).success).not.toBe(true);
  }
  const forbidden = await request.post('/api/enquiry', {
    headers: { origin: 'https://unrelated.example' },
    data: {},
  });
  expect(forbidden.status()).toBe(403);
});

test('failed delivery preserves the enquiry and supports retry without a false success', async ({
  page,
}) => {
  let attempts = 0;
  await page.route('**/api/enquiry', (route) => {
    attempts++;
    return route.fulfill(
      attempts === 1
        ? { status: 502, json: { error: 'Your enquiry could not be sent. Please try again.' } }
        : { status: 201, json: { success: true } },
    );
  });
  await page.goto('/contact');
  await page.getByLabel('Full name *').fill('Test Visitor');
  await page.getByLabel('Mobile number *').fill('9876543210');
  await page.getByLabel('I’m interested in *').selectOption('Hair Extensions Services');
  await page.getByLabel('I agree to be contacted').check();
  await page.getByRole('button', { name: 'Send enquiry', exact: true }).click();
  await expect(page.locator('.form-error')).toContainText('could not be sent');
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByLabel('Full name *')).toHaveValue('Test Visitor');
  await page.getByRole('button', { name: 'Send enquiry', exact: true }).click();
  await expect(page).toHaveURL(/\/thank-you$/);
});
