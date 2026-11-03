import type { Page } from '@playwright/test';

export async function loadPageImages(page: Page) {
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let top = 0; top < document.documentElement.scrollHeight; top += step) {
      window.scrollTo(0, top);
      await new Promise((resolve) => setTimeout(resolve, 90));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);
}
