import { test, expect } from './fixtures';

test('service stories provide responsive photo galleries with loaded images', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const slugs = [
    'hair-wig-hair-replacement',
    'hair-extensions',
    'hair-colouring',
    'hair-treatments',
    'mens-grooming',
    'haircut-styling',
    'bridal-special-occasion',
    'womens-beauty',
    'nail-beauty',
  ];
  for (const slug of slugs) {
    await page.goto(`/services/${slug}`);
    const lead = page.locator('.service-lead-pair');
    await expect(lead.locator('img')).toHaveCount(2);
    for (const photo of await lead.locator('img').all()) {
      await photo.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          photo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0),
        )
        .toBe(true);
    }
    const story = page.locator('.service-photo-story');
    await expect(story).toBeAttached();
    await expect(story.locator('figure')).toHaveCount(3);
    for (const photo of await story.locator('figure img').all()) {
      await photo.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          photo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0),
        )
        .toBe(true);
    }
    await expect(
      story.getByText('These images do not document VLASY clients, results or branch interiors.', {
        exact: false,
      }),
    ).toBeVisible();
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/services');
  await expect(page.locator('.service-card-visual')).toHaveCount(9);
  await expect(page.locator('.service-card-detail')).toHaveCount(9);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goto('/services/hair-wig-hair-replacement');
  await page.locator('.service-photo-story').scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('homepage features selected services and links to the complete catalogue', async ({
  page,
}) => {
  await page.goto('/');
  const section = page.getByRole('region', { name: /What we do.*at VLASY/ });
  await expect(section.getByRole('heading', { level: 2 })).toHaveText(/What we do\s*at VLASY\./);
  await expect(section.locator('.featured-service-card')).toHaveCount(5);
  const destinations = [
    'hair-wig-hair-replacement',
    'haircut-styling',
    'hair-colouring',
    'womens-beauty',
    'bridal-special-occasion',
  ].map((slug) => `/services/${slug}`);
  expect(
    await section
      .locator('.featured-service-card .expertise-card-action')
      .evaluateAll((cards) => cards.map((card) => card.getAttribute('href'))),
  ).toEqual(destinations);
  await section.getByRole('link', { name: "Explore Women's Beauty", exact: true }).click();
  await expect(page).toHaveURL(/\/services\/womens-beauty$/);
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await section.getByRole('link', { name: 'Explore all services', exact: true }).first().click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.locator('.service-card-visual')).toHaveCount(9);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('navbar provides Home and direct page links alongside individual service destinations', async ({
  page,
}) => {
  await page.goto('/about');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(nav.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute('href', '/');
  await expect(nav.getByRole('link', { name: 'About', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  );
  await expect(nav.getByRole('link', { name: 'Home', exact: true })).not.toHaveAttribute(
    'aria-current',
    'page',
  );
  await nav.getByRole('link', { name: 'Home', exact: true }).click();
  await expect(page).toHaveURL('http://127.0.0.1:3000/');
  await nav.getByRole('link', { name: 'Services', exact: true }).click();
  await expect(page).toHaveURL(/\/services$/);
  await page.getByRole('button', { name: 'Services menu', exact: true }).click();
  await expect(page.locator('.mega-links a')).toHaveCount(9);
  await page
    .locator('.mega-links')
    .getByRole('link', { name: 'Nails & Additional Beauty', exact: true })
    .click();
  await expect(page).toHaveURL(/\/services\/nail-beauty$/);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.service-motion-graphic')).toHaveAttribute('aria-hidden', 'true');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page.locator('#mobile-nav').getByRole('link', { name: 'Home', exact: true }).click();
  await expect(page).toHaveURL('http://127.0.0.1:3000/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('removed page stays out of navigation and service FAQs stay relevant', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Our Approach', exact: true })).toHaveCount(0);
  for (const slug of [
    'bridal-special-occasion',
    'womens-beauty',
    'nail-beauty',
    'haircut-styling',
  ]) {
    await page.goto(`/services/${slug}`);
    expect(await page.locator('.faq-list details').count()).toBeGreaterThan(0);
  }
});

test('navigation and primary CTAs remain readable without overflow across screen sizes', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 375, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/', '/services', '/services/hair-wig-hair-replacement', '/contact']) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        `${width}: ${path}`,
      ).toBe(true);
      const header = await page.locator('.site-header').boundingBox();
      expect(header).toBeTruthy();
      expect(header!.x).toBeGreaterThanOrEqual(0);
      expect(header!.x + header!.width).toBeLessThanOrEqual(width);
      for (const button of await page
        .locator('.header-book,.hr-hero .hr-pill,.enquiry-form .button')
        .all()) {
        await expect(button).toBeVisible();
        expect(
          await button.evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
        ).toBeGreaterThanOrEqual(14);
        expect((await button.boundingBox())!.height).toBeGreaterThanOrEqual(44);
      }
    }
  }
});
