import { readFileSync } from 'node:fs';
import { test, expect } from './fixtures';

test('campaign exports preserve native resolution rather than upscaling smaller sources', () => {
  const manifest = JSON.parse(readFileSync('docs/editorial-assets.json', 'utf8'));
  expect(manifest.assets.length).toBe(47);
  for (const asset of manifest.assets) {
    expect(asset.upscaled, asset.file).toBe(false);
    expect(asset.width, asset.file).toBe(asset.nativeWidth);
    expect(asset.height, asset.file).toBe(asset.nativeHeight);
  }
});

test('phones load their portrait source at high quality without a low-resolution video overlay', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const videos: string[] = [];
  page.on('request', (r) => {
    if (r.url().includes('/videos/')) videos.push(r.url());
  });
  await page.goto('/');
  const photo = page.locator('.hero-image');
  await expect
    .poll(() => photo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0))
    .toBe(true);
  const source = await photo.evaluate((img: HTMLImageElement) => img.currentSrc);
  expect(source).toContain('unisex-hero-mobile.webp');
  expect(source).toContain('q=90');
  expect(videos).toHaveLength(0);
  await expect(page.locator('.hero-video-toggle')).not.toBeVisible();
});
