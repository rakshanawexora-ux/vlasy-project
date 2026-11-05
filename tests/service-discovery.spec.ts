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

for (const width of [320, 375, 430]) {
  test(`mobile service rail stays compact and supports all five choices at ${width}px`, async ({
    browser,
  }) => {
    const context = await browser.newContext({
      viewport: { width, height: 844 },
      hasTouch: true,
      isMobile: true,
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.addInitScript(() => sessionStorage.setItem('vlasy-enquiry-shown', 'true'));
    await page.goto('/');
    const section = page.getByRole('region', { name: /What we do.*at VLASY/ });
    const rail = section.getByRole('region', { name: 'Featured services', exact: true });
    await rail.scrollIntoViewIfNeeded();
    const bounds = await rail.boundingBox();
    expect(bounds?.height).toBeLessThan(520);
    const cards = rail.locator('.featured-service-card');
    await expect(cards).toHaveCount(5);
    const previous = section.getByRole('button', { name: 'Previous featured service' });
    const next = section.getByRole('button', { name: 'Next featured service' });
    await expect(previous).toBeDisabled();
    await next.click();
    await expect(section.locator('.featured-rail-controls p')).toContainText('2 / 5');
    await rail.focus();
    await page.keyboard.press('ArrowRight');
    await expect(section.locator('.featured-rail-controls p')).toContainText('3 / 5');
    // A real touch gesture should move the native rail as well as the controls.
    const box = await rail.boundingBox();
    const session = await context.newCDPSession(page);
    const startX = box!.x + box!.width * 0.8;
    const y = box!.y + 80;
    await session.send('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints: [{ x: startX, y }],
    });
    for (let step = 1; step <= 8; step++)
      await session.send('Input.dispatchTouchEvent', {
        type: 'touchMove',
        touchPoints: [{ x: startX - (box!.width * 0.75 * step) / 8, y }],
      });
    await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await expect
      .poll(() => rail.evaluate((element) => element.scrollLeft))
      .toBeGreaterThan((width - 48) * 1.8);
    await rail.focus();
    // Wait for the actual touch fling/snap to settle before making another input.
    let lastPosition = -1;
    let stableSamples = 0;
    await expect
      .poll(
        async () => {
          const position = await rail.evaluate((element) => element.scrollLeft);
          stableSamples = Math.abs(position - lastPosition) < 0.5 ? stableSamples + 1 : 0;
          lastPosition = position;
          return stableSamples;
        },
        { intervals: [50, 100, 100] },
      )
      .toBeGreaterThanOrEqual(3);
    // Use the visible control after touch, so browser fling momentum cannot undo
    // a forced scrollLeft assignment while the gesture is still settling.
    for (let attempt = 0; attempt < 3; attempt++) {
      if (await next.isDisabled()) break;
      const counter = section.locator('.featured-rail-controls p');
      const current = await counter.innerText();
      await next.click();
      await expect(counter).not.toHaveText(current);
    }
    await expect(next).toBeDisabled();
    await expect(section.locator('.featured-rail-controls p')).toContainText('5 / 5');
    await expect(previous).toBeEnabled();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await cards.last().getByRole('link').click();
    await expect(page).toHaveURL(/\/services\/bridal-special-occasion$/);
    expect(errors).toEqual([]);
    await context.close();
  });
}
