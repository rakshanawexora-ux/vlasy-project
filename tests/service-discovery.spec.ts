import { test, expect } from './fixtures';

test('sub-service images support searching, clearing and a prefilled enquiry', async ({ page }) => {
  await page.goto('/services/hair-extensions');
  const search = page.getByRole('searchbox', { name: 'Find a service in this category' });
  await expect(page.locator('.subservice-card')).toHaveCount(9);
  await search.fill('clip-in');
  await expect(page.locator('.subservice-card')).toHaveCount(1);
  await expect(page.getByRole('status')).toHaveText('Showing 1 of 9 services');
  const photo = page.locator('.subservice-card img');
  await photo.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      photo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0),
    )
    .toBe(true);
  const imageBounds = await photo.boundingBox();
  expect(imageBounds?.width).toBeGreaterThan(200);
  expect(imageBounds?.height).toBeGreaterThan(150);
  await search.fill('nothing matches');
  await expect(page.getByRole('heading', { name: 'No matching services' })).toBeVisible();
  await page.getByRole('button', { name: 'Show all services', exact: true }).click();
  await expect(search).toHaveValue('');
  await expect(page.locator('.subservice-card')).toHaveCount(9);
  await page
    .getByRole('link', { name: 'Enquire about Tape-In Hair Extensions', exact: true })
    .click();
  await expect(page).toHaveURL(/\/contact\?/);
  await expect(page.getByLabel('I’m interested in *')).toHaveValue('Hair Extensions Services');
  await expect(page.getByLabel('Anything you’d like us to know?')).toHaveValue(
    'I would like to enquire about Tape-In Hair Extensions.',
  );
  await expect(page.locator('.booking-context')).toContainText('Tape-In Hair Extensions');
});

test('homepage shows five scroll stories and routes the complete-menu CTA correctly', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const section = page.getByRole('region', { name: /What we do.*at VLASY/ });
  await expect(section.locator('.featured-service-card')).toHaveCount(5);
  const first = section.locator('.featured-service-card').first();
  await first.scrollIntoViewIfNeeded();
  const layer = first.locator('.featured-parallax-layer');
  const before = await layer.evaluate((el) => getComputedStyle(el).transform);
  await page.evaluate(() => window.scrollBy(0, 200));
  await expect.poll(() => layer.evaluate((el) => getComputedStyle(el).transform)).not.toBe(before);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await expect(section.locator('.featured-service-card').first()).toHaveCSS('opacity', '1');
  await expect(section.locator('.featured-parallax-layer').first()).toHaveCSS('transform', 'none');
  await section.getByRole('link', { name: 'Explore all services', exact: true }).first().click();
  await expect(page).toHaveURL('http://127.0.0.1:3000/services');
  await expect(page.locator('.service-card-visual')).toHaveCount(9);
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await section
    .locator('.featured-services-footer')
    .getByRole('link', { name: 'Explore all services', exact: true })
    .click();
  await expect(page).toHaveURL(/\/services$/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('unrecognised sub-service values do not prefill an unrelated request', async ({ page }) => {
  await page.goto('/contact?service=Hair%20Extensions%20Services&subservice=Clean%20Shave');
  await expect(page.locator('.booking-context')).toHaveCount(0);
  await expect(page.getByLabel('Anything you’d like us to know?')).toHaveValue('');
});
