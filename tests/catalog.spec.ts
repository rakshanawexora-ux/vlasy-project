import { test, expect } from './fixtures';
const catalogue = [
  ['hair-wig-hair-replacement', 'Hair Wig & Hair Replacement Services', 11],
  ['hair-extensions', 'Hair Extensions Services', 9],
  ['haircut-styling', 'Haircut & Hair Styling', 11],
  ['hair-colouring', 'Hair Colouring Services', 9],
  ['hair-treatments', 'Hair Treatments', 10],
  ['mens-grooming', "Men's Grooming Services", 9],
  ['womens-beauty', "Women's Beauty Services", 10],
  ['bridal-special-occasion', 'Bridal & Special Occasion Services', 9],
  ['nail-beauty', 'Nail & Additional Beauty Services', 7],
] as const;
test('confirmed catalogue has nine named pages and all 85 sub-services', async ({
  page,
  request,
}) => {
  const images = new Set<string>();
  await page.setViewportSize({ width: 375, height: 812 });
  let total = 0;
  for (const [slug, name, count] of catalogue) {
    await page.goto(`/services/${slug}`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(`${name} in Chennai`);
    await expect(page.locator('.service-options-grid li')).toHaveCount(count);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      slug,
    ).toBe(true);
    await expect(page.locator('.subservice-card img')).toHaveCount(count);
    for (const image of await page.locator('.subservice-card img').all()) {
      const src = await image.getAttribute('src');
      expect(src).toBeTruthy();
      images.add(new URL(src!, 'http://127.0.0.1:3000').searchParams.get('url') || src!);
      expect(await image.getAttribute('alt')).not.toContain('undefined');
    }
    total += count;
  }
  expect(total).toBe(85);
  for (const src of images) {
    const response = await request.get(src);
    expect(response.status(), src).toBe(200);
    expect(response.headers()['content-type']).toContain('image/');
  }
  await page.goto('/services');
  await expect(page.locator('.service-card-visual')).toHaveCount(9);
});
test('new visits are light and homepage imagery remains predominantly women-focused', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  const women = await page.locator('[data-image-audience="women"]').count();
  const men = await page.locator('[data-image-audience="men"]').count();
  expect(men).toBeGreaterThan(0);
  expect(women / (women + men)).toBeCloseTo(0.8, 1);
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});
test('retired location is absent and old service links redirect to the confirmed catalogue', async ({
  page,
  request,
}) => {
  await page.goto('/contact');
  expect(await page.locator('body').innerText()).not.toContain('Madhavaram');
  await expect(page.getByLabel('Preferred branch').locator('option')).toHaveText([
    'Not Sure',
    'Kolathur',
  ]);
  expect((await request.get('/locations/madhavaram')).status()).toBe(404);
  const xml = await (await request.get('/sitemap.xml')).text();
  expect(xml).not.toContain('madhavaram');
  const old = await request.get('/services/hair-replacement', { maxRedirects: 0 });
  expect(old.status()).toBe(308);
  expect(old.headers().location).toBe('/services/hair-wig-hair-replacement');
  const invalid = await request.post('/api/enquiry', {
    data: {
      name: 'Test Visitor',
      phone: '9876543210',
      service: 'Hair Extensions Services',
      branch: 'Madhavaram',
      consent: true,
    },
  });
  expect(invalid.status()).toBe(400);
});
