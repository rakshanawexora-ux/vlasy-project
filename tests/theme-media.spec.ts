import { test, expect } from './fixtures';

test('theme switch persists across navigation, reload and keyboard use', async ({ page }) => {
  await page.goto('/contact');
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  const light = page.getByRole('button', { name: 'Switch to light theme' });
  await light.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(245, 241, 233)');
  expect(await page.evaluate(() => localStorage.getItem('vlasy-theme'))).toBe('light');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#f5f1e9');
  await page.getByRole('button', { name: 'Services menu', exact: true }).click();
  await expect(page.locator('#services-menu')).toBeVisible();
  await page
    .locator('#services-menu')
    .getByRole('link', { name: 'Hair Wigs & Replacement', exact: true })
    .click();
  await expect(page).toHaveURL(/\/services\/hair-wig-hair-replacement$/);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'Switch to dark theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(36, 35, 33)');
});

test('light theme supports mobile pages, forms and navigation at common widths', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [375, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/contact');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await expect(page.getByRole('button', { name: 'Switch to dark theme' })).toBeVisible();
    await page.getByRole('button', { name: 'Open navigation' }).click();
    await expect(page.locator('#mobile-nav')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Open navigation' })).toBeFocused();
  }
  await page.setViewportSize({ width: 375, height: 812 });
  for (const route of [
    '/',
    '/services',
    '/services/hair-wig-hair-replacement',
    '/academy',
    '/academy/beauty-makeup',

    '/contact',
    '/transformations',
  ]) {
    await page.goto(route);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      route,
    ).toBe(true);
  }
  await page.goto('/contact');
  await page.getByRole('button', { name: 'Send enquiry', exact: true }).click();
  await expect(page.locator('.field-error').first()).toBeVisible();
  await expect(page.locator('.field-error').first()).toHaveCSS('color', 'rgb(154, 51, 38)');
});

test('hero motion loop plays silently and offers pause and offscreen handling', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const video = page.locator('.hero-video');
  await expect
    .poll(() => video.evaluate((media: HTMLVideoElement) => media.readyState >= 2 && !media.paused))
    .toBe(true);
  expect(
    await video.evaluate(
      (media: HTMLVideoElement) => media.muted && media.loop && media.playsInline,
    ),
  ).toBe(true);
  await page.getByRole('button', { name: 'Pause hero video' }).click();
  await expect.poll(() => video.evaluate((media: HTMLVideoElement) => media.paused)).toBe(true);
  await page.getByRole('button', { name: 'Play hero video' }).click();
  await expect.poll(() => video.evaluate((media: HTMLVideoElement) => !media.paused)).toBe(true);
  await page.locator('.footer').scrollIntoViewIfNeeded();
  await expect.poll(() => video.evaluate((media: HTMLVideoElement) => media.paused)).toBe(true);
});

test('hero retains static fallback for reduced motion, data saver and media failure', async ({
  browser,
}) => {
  for (const mode of ['reduced', 'data-saver', 'failure']) {
    const context = await browser.newContext({
      baseURL: 'http://127.0.0.1:3000',
      reducedMotion: mode === 'reduced' ? 'reduce' : 'no-preference',
    });
    const page = await context.newPage();
    await page.addInitScript(() => sessionStorage.setItem('vlasy-enquiry-shown', 'true'));
    if (mode === 'data-saver')
      await page.addInitScript(() =>
        Object.defineProperty(navigator, 'connection', { value: { saveData: true } }),
      );
    if (mode === 'failure')
      await page.route('**/videos/unisex-hero-2026-11.mp4', (route) => route.abort());
    const requests: string[] = [];
    page.on('request', (request) => {
      if (request.url().includes('/videos/')) requests.push(request.url());
    });
    await page.goto('/');
    await expect
      .poll(() =>
        page
          .locator('.hero-image')
          .evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0),
      )
      .toBe(true);
    if (mode !== 'failure') {
      expect(requests).toHaveLength(0);
      expect(await page.locator('.hero-video').getAttribute('src')).toBeNull();
    } else
      await expect
        .poll(() =>
          page.locator('.hero-video').evaluate((media: HTMLVideoElement) => Boolean(media.error)),
        )
        .toBe(true);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await context.close();
  }
});

test('key reading surfaces retain readable text contrast in both themes', async ({ page }) => {
  for (const theme of ['dark', 'light'])
    for (const path of [
      '/',
      '/contact',
      '/services/hair-wig-hair-replacement',
      '/academy/beauty-makeup',
    ]) {
      await page.goto(path);
      // Wait for the client toggle label to reflect the pre-applied saved theme.
      await expect
        .poll(() =>
          page.evaluate(() => {
            const current = document.documentElement.dataset.theme;
            return (
              document.querySelector('.theme-toggle')?.getAttribute('aria-label') ===
              `Switch to ${current === 'dark' ? 'light' : 'dark'} theme`
            );
          }),
        )
        .toBe(true);
      if ((await page.locator('html').getAttribute('data-theme')) !== theme) {
        await page.getByRole('button', { name: `Switch to ${theme} theme` }).click();
      }
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      const failures = await page.evaluate(() => {
        const rgb = (value: string) => {
          const c = value.match(/[\d.]+/g)?.map(Number) || [0, 0, 0];
          return [c[0], c[1], c[2], c[3] ?? 1];
        };
        const bg = (node: Element | null): number[] => {
          if (!node) return [255, 255, 255];
          const c = rgb(getComputedStyle(node).backgroundColor);
          if (c[3] >= 1) return c.slice(0, 3);
          const under = bg(node.parentElement);
          return c.slice(0, 3).map((v, i) => v * c[3] + under[i] * (1 - c[3]));
        };
        const luminance = (c: number[]) =>
          c
            .slice(0, 3)
            .map((v) => {
              const n = v / 255;
              return n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
            })
            .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
        return [
          ...document.querySelectorAll(
            '.page-hero>p,.form-note,.hr-story-copy>p,.hr-cta-bottom>p,.comparison figcaption p,.comparison-control p,.guide-grid article p,.program-focus-list p,.expertise-card p',
          ),
        ]
          .filter((node) => node.getClientRects().length)
          .map((node) => {
            const a = luminance(rgb(getComputedStyle(node).color)),
              b = luminance(bg(node));
            return {
              text: node.textContent?.slice(0, 55),
              ratio: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05),
            };
          })
          .filter((result) => result.ratio < 4.5);
      });
      expect(failures, `${theme}: ${path}`).toEqual([]);
    }
});
