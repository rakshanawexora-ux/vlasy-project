import { test, expect } from './fixtures';

test('hero has related slides, useful controls and semibold CTAs without the old motion or extra contact actions', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const carousel = page.getByRole('region', { name: 'Featured salon services', exact: true });
  await expect(carousel).toHaveAttribute('data-active-slide', '1');
  await expect(
    page.locator('.hr-hero video,.hr-moving-image,.hair-flow-hero,.brand-scroll-progress'),
  ).toHaveCount(0);
  await expect(page.locator('.hr-title-line > span').first()).toHaveCSS('transform', 'none');
  await expect(page.locator('.hero-service-actions .hr-pill')).toHaveCSS('font-weight', '600');
  await expect(page.getByRole('link', { name: 'Contact the team', exact: true })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Let’s talk', exact: true })).toHaveCount(0);
  await expect(page.locator('.floating-whatsapp')).toHaveCount(0);
  await carousel.getByRole('button', { name: 'Previous hero slide' }).click();
  await expect(carousel).toHaveAttribute('data-active-slide', '5');
  await carousel.getByRole('button', { name: 'Next hero slide' }).click();
  await expect(carousel).toHaveAttribute('data-active-slide', '1');
  await carousel.getByRole('button', { name: 'Next hero slide' }).click();
  await expect(carousel).toHaveAttribute('data-active-slide', '2');
  await expect(page.getByRole('status')).toContainText('2 of 5: Colour with dimension');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await carousel.getByRole('link', { name: 'Colour with dimension' }).click();
  await expect(page).toHaveURL(/\/services\/hair-colouring$/);
});

test('hero rotates photographs and lets the visitor pause and resume', async ({ page }) => {
  await page.clock.install();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const carousel = page.locator('.hero-carousel');
  await expect(page.getByRole('button', { name: 'Pause hero slideshow' })).toBeEnabled();
  await page.clock.fastForward(7100);
  await expect(carousel).toHaveAttribute('data-active-slide', '2');
  await page.getByRole('button', { name: 'Pause hero slideshow' }).click();
  await page.mouse.move(0, 0);
  await page.clock.fastForward(15000);
  await expect(carousel).toHaveAttribute('data-active-slide', '2');
  await page.getByRole('button', { name: 'Play hero slideshow' }).click();
  await page.getByRole('heading', { level: 1 }).click();
  await page.mouse.move(0, 0);
  await page.clock.fastForward(7100);
  await expect(carousel).toHaveAttribute('data-active-slide', '3');
});

test('motion and data preferences keep the hero static while manual navigation remains available', async ({
  browser,
}) => {
  for (const mode of ['reduced', 'data-saver']) {
    const context = await browser.newContext({
      reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference',
    });
    const page = await context.newPage();
    await page.clock.install();
    await page.addInitScript(() => sessionStorage.setItem('vlasy-enquiry-shown', 'true'));
    if (mode === 'data-saver')
      await page.addInitScript(() =>
        Object.defineProperty(navigator, 'connection', { value: { saveData: true } }),
      );
    await page.goto('http://127.0.0.1:3000/');
    const carousel = page.locator('.hero-carousel');
    await page.clock.fastForward(15000);
    await expect(carousel).toHaveAttribute('data-active-slide', '1');
    await expect(page.getByRole('button', { name: 'Play hero slideshow' })).toBeDisabled();
    await page.getByRole('button', { name: 'Next hero slide' }).click();
    await expect(carousel).toHaveAttribute('data-active-slide', '2');
    await context.close();
  }
});
