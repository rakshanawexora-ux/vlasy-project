import { test, expect } from './fixtures';
import { loadPageImages } from './helpers';

test('homepage presents unisex salon services and working editorial imagery', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    /YOUR STYLE\..*YOUR WAY\..*VLASY\./,
  );
  for (const section of [
    '.hr-intro',
    '.hr-story',
    '.hr-everyday',
    '.hr-journey',
    '.hr-results',
    '.hr-more',
    '.hr-faq',
    '.hr-consultation',
  ])
    await expect(page.locator(section)).toBeAttached();
  await expect(
    page.locator('.hr-hero-content').getByRole('link', { name: 'Book an appointment' }),
  ).toHaveAttribute('href', '/contact');
  await page.locator('.hr-consultation').scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(page.locator('.hero-image')).toBeVisible();
  expect(
    await page
      .locator('.hero-image')
      .evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0),
  ).toBeTruthy();
  expect(errors).toEqual([]);
});

test('desktop services menu and keyboard dismissal', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Services menu', exact: true }).click();
  await expect(page.locator('#services-menu')).toBeVisible();
  await expect(
    page
      .locator('#services-menu')
      .getByRole('link', { name: 'Hair Wigs & Replacement', exact: true }),
  ).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#services-menu')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Services menu', exact: true })).toBeFocused();
});

test('gallery filters and modal work', async ({ page }) => {
  await page.goto('/transformations');
  await page.getByRole('button', { name: 'Colour', exact: true }).click();
  await expect(page.locator('.transformation-tile')).toHaveCount(1);
  await page.locator('.transformation-tile').click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
});

test('FAQ expands accessibly', async ({ page }) => {
  await page.goto('/');
  const question = page.locator('summary').first();
  await question.scrollIntoViewIfNeeded();
  await question.click();
  await expect(page.locator('details').first()).toHaveAttribute('open', '');
});

test('all core routes resolve with unique metadata', async ({ request }) => {
  const routes = [
    '/',
    '/services',
    '/services/hair-wig-hair-replacement',
    '/services/hair-extensions',
    '/services/hair-colouring',
    '/services/hair-treatments',
    '/services/mens-grooming',
    '/services/haircut-styling',
    '/services/bridal-special-occasion',
    '/services/womens-beauty',
    '/services/nail-beauty',
    '/transformations',

    '/about',
    '/journal',
    '/journal/finding-your-hair-solution',
    '/journal/your-first-extensions-consultation',
    '/journal/making-your-colour-last',
    '/faq',
    '/contact',
    '/thank-you',
    '/privacy-policy',
    '/terms',
  ];
  const titles = new Set<string>();
  for (const route of routes) {
    const response = await request.get(route);
    expect(response.status(), route).toBe(200);
    const html = await response.text();
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    expect(title, route).toBeTruthy();
    expect(titles.has(title!), `Duplicate title ${route}`).toBeFalsy();
    titles.add(title!);
    expect(html, route).toContain('rel="canonical"');
  }
});

test('mobile menu, booking bar and no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  await page.locator('#mobile-nav').getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/about/);
  await expect(page.locator('#mobile-nav')).toHaveCount(0);
  await expect(page.locator('.mobile-sticky')).toBeVisible();
  await page.goto('/');
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
  ).toBeTruthy();
  await loadPageImages(page);
  await page.screenshot({ path: '/workspace/shared/vlasy-mobile.png', fullPage: true });
  await page.screenshot({ path: '/workspace/shared/vlasy-mobile-hero.png' });
});

test('desktop layout has no overflow and captures homepage', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.waitForTimeout(600);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
  ).toBeTruthy();
  await loadPageImages(page);
  await page.screenshot({ path: '/workspace/shared/vlasy-desktop.png', fullPage: true });
  await page.screenshot({ path: '/workspace/shared/vlasy-desktop-hero.png' });
});

test('consultation popup opens once and dismisses', async ({ browser }) => {
  const context = await browser.newContext({ baseURL: 'http://127.0.0.1:3000' });
  const page = await context.newPage();
  await page.goto('/');
  await page.waitForFunction(() => !!document.querySelector('.enquiry-dialog'));
  await page.waitForTimeout(400);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.55));
  await expect(page.locator('.enquiry-dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Close consultation popup' }).click();
  await page.reload();
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.7));
  await expect(page.locator('.enquiry-dialog')).not.toBeVisible();
  await context.close();
});

test('hair replacement journey responds and consultation preselects the service', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: '02 Personalisation' }).click();
  await expect(page.getByRole('button', { name: '02 Personalisation' })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
  await expect(page.locator('.hr-journey-card h3')).toHaveText('Designed around you.');
  await page
    .locator('.hr-journey-card')
    .getByRole('link', { name: 'Start with a consultation' })
    .click();
  await expect(page.getByLabel('I’m interested in *')).toHaveValue(
    'Hair Wig & Hair Replacement Services',
  );
});

test('supplied logo loads and decorative vectors respect reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const logo = page.locator('.site-header .brand-logo-image');
  await expect(logo).toBeVisible();
  await expect(logo).toHaveAttribute('alt', 'VLASY Unisex Salon');
  await expect
    .poll(() =>
      logo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0),
    )
    .toBe(true);
  await expect(page.locator('.hair-flow-hero path')).toHaveCount(13);
  await expect(page.locator('.hair-flow-consultation')).toHaveAttribute('aria-hidden', 'true');
  await expect(page.locator('#hero-title')).toBeVisible();
  await page.locator('.footer-brand-stage').scrollIntoViewIfNeeded();
  const footerLogo = page.locator('.footer-brand-stage .brand-logo-image');
  await expect
    .poll(() =>
      footerLogo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0),
    )
    .toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('illustrative comparison is labelled and works with keyboard and touch', async ({
  page,
  browser,
}) => {
  await page.goto('/services/hair-wig-hair-replacement');
  const slider = page.getByRole('slider', { name: 'Compare before and after illustrations' });
  await expect(page.getByText('AI-generated illustration · not a client result')).toBeVisible();
  await expect(
    page.getByText('These AI-generated images are not a real treatment result or a guarantee.', {
      exact: false,
    }),
  ).toBeVisible();
  await slider.scrollIntoViewIfNeeded();
  for (const portrait of await page.locator('.comparison img').all())
    await expect
      .poll(() =>
        portrait.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0),
      )
      .toBe(true);
  await slider.focus();
  await page.keyboard.press('Home');
  await expect(slider).toHaveValue('0');
  await expect(slider).toHaveAttribute('aria-valuetext', '0% of before illustration visible');
  await page.keyboard.press('ArrowRight');
  await expect(slider).toHaveValue('1');
  await page.keyboard.press('End');
  await expect(slider).toHaveValue('100');
  await expect(page.locator('.before-image')).toHaveCSS('clip-path', 'inset(0px 0% 0px 0px)');
  const control = await slider.boundingBox();
  expect(control).toBeTruthy();
  await page.mouse.click(control!.x + control!.width / 2, control!.y + control!.height / 2);
  expect(Number(await slider.inputValue())).toBeGreaterThan(40);
  expect(Number(await slider.inputValue())).toBeLessThan(60);
  const id = await slider.getAttribute('id');
  await expect(page.locator(`label[for="${id}"]`)).toHaveText(
    'Compare before and after illustrations',
  );
  await page.goto('/transformations');
  await expect(page.getByRole('slider')).toHaveAccessibleName(
    'Compare before and after illustrations',
  );
  const mobile = await browser.newContext({
    viewport: { width: 375, height: 812 },
    hasTouch: true,
    isMobile: true,
    baseURL: 'http://127.0.0.1:3000',
  });
  const touchPage = await mobile.newPage();
  await touchPage.addInitScript(() => sessionStorage.setItem('vlasy-enquiry-shown', 'true'));
  await touchPage.goto('/transformations');
  const touchSlider = touchPage.getByRole('slider');
  await touchSlider.scrollIntoViewIfNeeded();
  const touchBox = await touchSlider.boundingBox();
  expect(touchBox).toBeTruthy();
  await touchPage.touchscreen.tap(
    touchBox!.x + touchBox!.width * 0.75,
    touchBox!.y + touchBox!.height / 2,
  );
  expect(Number(await touchSlider.inputValue())).toBeGreaterThan(60);
  expect(Number(await touchSlider.inputValue())).toBeLessThan(90);
  await expect(touchPage.locator('.comparison')).toBeVisible();
  await mobile.close();
});

test('dark surfaces and illustrative labels are consistent across routes', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('vlasy-theme', 'dark'));
  for (const route of [
    '/',
    '/contact',
    '/services/hair-wig-hair-replacement',
    '/transformations',
  ]) {
    await page.goto(route);
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(36, 35, 33)');
    await expect(page.locator('html')).toHaveCSS('color-scheme', 'dark');
    if (route === '/')
      await expect(page.getByText('AI editorial portrait · not a client result')).toBeVisible();
    else if (route !== '/contact')
      await expect(page.locator('.illustration-label').first()).toBeVisible();
  }
  await page.goto('/services/hair-wig-hair-replacement');
  await expect(page.getByRole('heading', { name: 'The full cost of care' })).toBeVisible();
  await page.setViewportSize({ width: 375, height: 812 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('removed Academy and Visit Us pages return 404 and stay out of navigation and sitemap', async ({
  page,
  request,
}) => {
  const xml = await (await request.get('/sitemap.xml')).text();
  expect(xml).not.toContain('/academy');
  expect(xml).not.toContain('/locations');
  expect(xml).toContain('/services/hair-extensions');
  for (const path of [
    '/academy',
    '/academy/professional-hairdressing',
    '/academy/hair-colour-artistry',
    '/academy/beauty-makeup',
    '/academy/bridal-artistry',
    '/locations',
    '/locations/kolathur',
  ])
    expect((await request.get(path)).status(), path).toBe(404);
  for (const path of ['/', '/about', '/contact', '/faq', '/terms']) {
    await page.goto(path);
    await expect(page.locator('a[href^="/academy"],a[href^="/locations"]')).toHaveCount(0);
    expect(await page.locator('body').innerText()).not.toMatch(/academy|professional training/i);
  }
  await expect(
    page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link'),
  ).toHaveText(['Home', 'Services', 'About', 'Contact']);
  await page.goto('/contact?service=Academy');
  await expect(page.getByLabel('I’m interested in *').locator('option')).not.toContainText([
    'Academy',
  ]);
  await expect(page.getByLabel('I’m interested in *')).toHaveValue('');
});

test('SEO metadata uses a working share image and describes real service pages', async ({
  request,
}) => {
  const home = await request.get('/');
  const html = await home.text();
  const share = html.match(/property="og:image" content="([^"]+)"/)?.[1];
  expect(share).toBeTruthy();
  expect(share).toContain('/images/editorial/2026-11/unisex-hero.webp');
  expect((await request.get(new URL(share!).pathname)).status()).toBe(200);
  expect(html).toContain('Chennai');
  const schemas = [
    ...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
  ].map((match) => JSON.parse(match[1]));
  expect(
    schemas.some(
      (schema) => schema['@type'] === 'OfferCatalog' && schema.itemListElement.length === 9,
    ),
  ).toBe(true);
  for (const path of [
    '/services/hair-wig-hair-replacement',
    '/services/bridal-special-occasion',
    '/services/womens-beauty',
    '/services/nail-beauty',
  ]) {
    const result = await request.get(path);
    expect(result.status()).toBe(200);
    const body = await result.text();
    expect(body).toContain('in Chennai</h1>');
    expect(body).toContain('rel="canonical"');
    expect(body).toContain('application/ld+json');
  }
  expect((await request.get('/approach')).status()).toBe(404);
  expect(await (await request.get('/sitemap.xml')).text()).not.toContain('/approach');
});
