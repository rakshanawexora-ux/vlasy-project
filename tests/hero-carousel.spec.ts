import { test, expect } from './fixtures';

test('hero changes its picture, heading, description and destination every six seconds without manual controls', async ({
  page,
}) => {
  const clockStart = new Date('2026-11-13T00:00:00Z');
  await page.clock.install({ time: clockStart });
  await page.clock.pauseAt(new Date(clockStart.getTime() + 1000));
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const hero = page.locator('.hero-carousel');
  await expect(hero).toHaveAttribute('data-active-slide', '1');
  await expect(hero.locator('button')).toHaveCount(0);
  await expect(hero.locator('h1')).toContainText('YOUR STYLE.');
  await expect(hero.locator('.hero-service-actions .hr-pill')).toHaveCSS('font-weight', '600');
  await expect(hero.locator('.hero-image')).toHaveAttribute('src', /unisex-hero/);
  await page.clock.runFor(5900);
  await expect(hero).toHaveAttribute('data-active-slide', '1');
  await page.clock.runFor(200);
  await expect(hero).toHaveAttribute('data-active-slide', '2');
  await expect(hero.locator('h1')).toContainText('YOUR COLOUR.');
  await expect(hero.locator('.hr-hero-description')).toContainText('balayage');
  await expect(hero.locator('.hero-image')).toHaveAttribute('src', /colour-portrait/);
  await expect(
    hero.getByRole('link', { name: 'Explore hair colour', exact: true }),
  ).toHaveAttribute('href', '/services/hair-colouring');
  await page.clock.runFor(6000);
  await expect(hero).toHaveAttribute('data-active-slide', '3');
  await expect(hero.locator('h1')).toContainText('MORE LENGTH.');
  await expect(
    page.locator('.hr-hero video,.hr-moving-image,.hair-flow-hero,.brand-scroll-progress'),
  ).toHaveCount(0);
  await expect(page.locator('.hr-title-line > span').first()).toHaveCSS('transform', 'none');
});

test('hero continues under the pointer and pauses only while a service link has keyboard focus', async ({
  page,
}) => {
  await page.clock.install();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const hero = page.locator('.hero-carousel');
  await hero.locator('h1').hover();
  await page.clock.runFor(6100);
  await expect(hero).toHaveAttribute('data-active-slide', '2');
  await hero.locator('.hero-service-actions a').first().focus();
  await page.clock.runFor(13000);
  await expect(hero).toHaveAttribute('data-active-slide', '2');
  await hero
    .locator('.hero-service-actions a')
    .first()
    .evaluate((link: HTMLElement) => link.blur());
  await page.clock.runFor(6100);
  await expect(hero).toHaveAttribute('data-active-slide', '3');
});

test('motion and data preferences keep the automatic hero static and mobile content stays within the screen', async ({
  browser,
}) => {
  for (const mode of ['reduced', 'data-saver']) {
    const context = await browser.newContext({
      reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference',
      viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();
    await page.clock.install();
    await page.addInitScript(() => sessionStorage.setItem('vlasy-enquiry-shown', 'true'));
    if (mode === 'data-saver')
      await page.addInitScript(() =>
        Object.defineProperty(navigator, 'connection', { value: { saveData: true } }),
      );
    await page.goto('http://127.0.0.1:3000/');
    await page.clock.runFor(15000);
    await expect(page.locator('.hero-carousel')).toHaveAttribute('data-active-slide', '1');
    await expect(page.locator('.hero-carousel button')).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await context.close();
  }
});
