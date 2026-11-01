import type { Page } from '@playwright/test';
import { test,expect } from '@playwright/test';
test.beforeEach(async({page})=>{await page.addInitScript(()=>sessionStorage.setItem('vlasy-enquiry-shown','true'));});
test('homepage prioritises hair replacement and working editorial imagery',async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');
 await expect(page.getByRole('heading',{level:1})).toHaveText(/FEEL LIKE.*YOURSELF\..*AGAIN\./);
 for(const section of ['.hr-intro','.hr-story','.hr-everyday','.hr-journey','.hr-results','.hr-more','.hr-locations','.hr-faq','.hr-consultation']) await expect(page.locator(section)).toBeAttached();
 await expect(page.locator('.hr-hero-content').getByRole('link',{name:'Let’s talk hair'})).toHaveAttribute('href','/contact?service=Hair%20Replacement');
 await page.locator('.hr-consultation').scrollIntoViewIfNeeded();
 await page.waitForTimeout(700);await page.evaluate(()=>window.scrollTo(0,0));
 await expect(page.locator('.hero-image')).toBeVisible();
 expect(await page.locator('.hero-image').evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBeTruthy();
 expect(errors).toEqual([]);
});
test('desktop services menu and keyboard dismissal',async({page})=>{await page.goto('/');await page.getByRole('button',{name:'Services',exact:true}).click();await expect(page.locator('#services-menu')).toBeVisible();await expect(page.locator('#services-menu').getByRole('link',{name:'Hair Replacement',exact:true})).toBeVisible();await page.keyboard.press('Escape');await expect(page.locator('#services-menu')).toHaveCount(0);});
test('gallery filters and modal work',async({page})=>{await page.goto('/transformations');await page.getByRole('button',{name:'Colour',exact:true}).click();await expect(page.locator('.transformation-tile')).toHaveCount(1);await page.locator('.transformation-tile').click();await expect(page.getByRole('dialog')).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).not.toBeVisible();});
test('FAQ expands accessibly',async({page})=>{await page.goto('/');const question=page.locator('summary').first();await question.scrollIntoViewIfNeeded();await question.click();await expect(page.locator('details').first()).toHaveAttribute('open','');});
test('enquiry validates and submits to thank-you',async({page})=>{await page.goto('/contact');await page.getByRole('button',{name:'Send enquiry',exact:true}).click();await expect(page.locator('.field-error').filter({hasText:'Please enter your full name.'})).toBeVisible();await page.getByLabel('Full name *').fill('Test Visitor');await page.getByLabel('Mobile number *').fill('9876543210');await page.getByLabel('I’m interested in *').selectOption('Hair Extensions');await page.getByLabel('I agree to be contacted').check();await page.getByRole('button',{name:'Send enquiry',exact:true}).click();await expect(page).toHaveURL(/thank-you/);});
test('API rejects invalid enquiries and accepts the requested structure',async({request})=>{const bad=await request.post('/api/enquiry',{data:{name:'A'}});expect(bad.status()).toBe(400);const good=await request.post('/api/enquiry',{data:{name:'Test Visitor',phone:'9876543210',service:'Hair Replacement',branch:'Kolathur',consent:true,sourcePage:'/',utmSource:'smoke-test'}});expect(good.status()).toBe(201);expect((await good.json()).success).toBe(true);});
test('all core routes resolve with unique metadata',async({request})=>{const routes=['/','/services','/services/hair-replacement','/services/hair-extensions','/services/hair-colour','/services/hair-cut-styling','/services/bridal','/services/beauty-treatments','/services/mehndi','/transformations','/academy','/about','/locations','/locations/kolathur','/locations/madhavaram','/journal','/journal/finding-your-hair-solution','/journal/your-first-extensions-consultation','/journal/making-your-colour-last','/faq','/contact','/thank-you','/privacy-policy','/terms'];const titles=new Set<string>();for(const route of routes){const response=await request.get(route);expect(response.status(),route).toBe(200);const html=await response.text();const title=html.match(/<title>(.*?)<\/title>/)?.[1];expect(title,route).toBeTruthy();expect(titles.has(title!),`Duplicate title ${route}`).toBeFalsy();titles.add(title!);expect(html,route).toContain('rel="canonical"');}});
test('mobile menu, booking bar and no horizontal overflow',async({page})=>{await page.setViewportSize({width:375,height:812});await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');await page.getByRole('button',{name:'Open navigation'}).click();await expect(page.getByRole('navigation',{name:'Mobile navigation'})).toBeVisible();await page.locator('#mobile-nav').getByRole('link',{name:'Academy',exact:true}).click();await expect(page).toHaveURL(/academy/);await expect(page.locator('#mobile-nav')).toHaveCount(0);await expect(page.locator('.mobile-sticky')).toBeVisible();await page.goto('/');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBeTruthy();await loadPageImages(page);await page.screenshot({path:'/workspace/shared/vlasy-mobile.png',fullPage:true});await page.screenshot({path:'/workspace/shared/vlasy-mobile-hero.png'});});
test('desktop layout has no overflow and captures homepage',async({page})=>{await page.setViewportSize({width:1440,height:1000});await page.emulateMedia({reducedMotion:'reduce'});await page.goto('/');await page.waitForTimeout(600);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBeTruthy();await loadPageImages(page);await page.screenshot({path:'/workspace/shared/vlasy-desktop.png',fullPage:true});await page.screenshot({path:'/workspace/shared/vlasy-desktop-hero.png'});});
test('consultation popup opens once and dismisses',async({browser})=>{const context=await browser.newContext({baseURL:'http://127.0.0.1:3000'});const page=await context.newPage();await page.goto('/');await page.waitForFunction(()=>!!document.querySelector('.enquiry-dialog'));await page.waitForTimeout(400);await page.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight*.55));await expect(page.locator('.enquiry-dialog')).toBeVisible();await page.getByRole('button',{name:'Close consultation popup'}).click();await page.reload();await page.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight*.7));await expect(page.locator('.enquiry-dialog')).not.toBeVisible();await context.close();});

async function loadPageImages(page:Page){await page.evaluate(async()=>{const step=window.innerHeight;for(let top=0;top<document.documentElement.scrollHeight;top+=step){window.scrollTo(0,top);await new Promise(resolve=>setTimeout(resolve,90));}window.scrollTo(0,0);});await page.waitForTimeout(600);}

test('hair replacement journey responds and consultation preselects the service',async({page})=>{await page.goto('/');await page.getByRole('button',{name:'02 Personalisation'}).click();await expect(page.getByRole('button',{name:'02 Personalisation'})).toHaveAttribute('aria-expanded','true');await expect(page.locator('.hr-journey-card h3')).toHaveText('Designed around you.');await page.locator('.hr-journey-card').getByRole('link',{name:'Start with a consultation'}).click();await expect(page.getByLabel('I’m interested in *')).toHaveValue('Hair Replacement');});

test('supplied logo loads and decorative vectors respect reduced motion',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/');
 const logo=page.locator('.site-header .brand-logo-image');
 await expect(logo).toBeVisible();
 await expect(logo).toHaveAttribute('alt','VLASY Unisex Salon');
 await expect.poll(()=>logo.evaluate((image:HTMLImageElement)=>image.complete&&image.naturalWidth>0)).toBe(true);
 await expect(page.locator('.hair-flow-hero path')).toHaveCount(13);
 await expect(page.locator('.hair-flow-consultation')).toHaveAttribute('aria-hidden','true');
 await expect(page.locator('#hero-title')).toBeVisible();
 await page.locator('.footer-brand-stage').scrollIntoViewIfNeeded();
 const footerLogo=page.locator('.footer-brand-stage .brand-logo-image');
 await expect.poll(()=>footerLogo.evaluate((image:HTMLImageElement)=>image.complete&&image.naturalWidth>0)).toBe(true);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
