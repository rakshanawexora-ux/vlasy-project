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
test('desktop services menu and keyboard dismissal',async({page})=>{await page.goto('/');await page.getByRole('button',{name:'Services',exact:true}).click();await expect(page.locator('#services-menu')).toBeVisible();await expect(page.locator('#services-menu').getByRole('link',{name:'Hair Replacement',exact:true})).toBeVisible();await page.keyboard.press('Escape');await expect(page.locator('#services-menu')).toHaveCount(0);await expect(page.getByRole('button',{name:'Services',exact:true})).toBeFocused();});
test('gallery filters and modal work',async({page})=>{await page.goto('/transformations');await page.getByRole('button',{name:'Colour',exact:true}).click();await expect(page.locator('.transformation-tile')).toHaveCount(1);await page.locator('.transformation-tile').click();await expect(page.getByRole('dialog')).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).not.toBeVisible();});
test('FAQ expands accessibly',async({page})=>{await page.goto('/');const question=page.locator('summary').first();await question.scrollIntoViewIfNeeded();await question.click();await expect(page.locator('details').first()).toHaveAttribute('open','');});
test('enquiry validates and submits to thank-you',async({page})=>{await page.goto('/contact');await page.getByRole('button',{name:'Send enquiry',exact:true}).click();await expect(page.locator('.field-error').filter({hasText:'Please enter your full name.'})).toBeVisible();await page.getByLabel('Full name *').fill('Test Visitor');await page.getByLabel('Mobile number *').fill('9876543210');await page.getByLabel('I’m interested in *').selectOption('Hair Extensions');await page.getByLabel('I agree to be contacted').check();await page.getByRole('button',{name:'Send enquiry',exact:true}).click();await expect(page).toHaveURL(/thank-you/);});
test('API rejects invalid enquiries and accepts the requested structure',async({request})=>{const bad=await request.post('/api/enquiry',{data:{name:'A'}});expect(bad.status()).toBe(400);const good=await request.post('/api/enquiry',{data:{name:'Test Visitor',phone:'9876543210',service:'Hair Replacement',branch:'Kolathur',consent:true,sourcePage:'/',utmSource:'smoke-test'}});expect(good.status()).toBe(201);expect((await good.json()).success).toBe(true);});
test('all core routes resolve with unique metadata',async({request})=>{const routes=['/','/services','/services/hair-replacement','/services/hair-extensions','/services/hair-colour','/services/hair-cut-styling','/services/bridal','/services/beauty-treatments','/services/mehndi','/transformations','/academy','/academy/professional-hairdressing','/academy/hair-colour-artistry','/academy/beauty-makeup','/academy/bridal-artistry','/approach','/about','/locations','/locations/kolathur','/locations/madhavaram','/journal','/journal/finding-your-hair-solution','/journal/your-first-extensions-consultation','/journal/making-your-colour-last','/faq','/contact','/thank-you','/privacy-policy','/terms'];const titles=new Set<string>();for(const route of routes){const response=await request.get(route);expect(response.status(),route).toBe(200);const html=await response.text();const title=html.match(/<title>(.*?)<\/title>/)?.[1];expect(title,route).toBeTruthy();expect(titles.has(title!),`Duplicate title ${route}`).toBeFalsy();titles.add(title!);expect(html,route).toContain('rel="canonical"');}});
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

test('illustrative comparison is labelled and works with keyboard and touch',async({page,browser})=>{
 await page.goto('/services/hair-replacement');
 const slider=page.getByRole('slider',{name:'Compare before and after illustrations'});
 await expect(page.getByText('AI-generated illustration · not a client result')).toBeVisible();
 await expect(page.getByText('These AI-generated images are not a real treatment result or a guarantee.',{exact:false})).toBeVisible();
 await slider.scrollIntoViewIfNeeded();
 for(const portrait of await page.locator('.comparison img').all())await expect.poll(()=>portrait.evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
 await slider.focus();
 await page.keyboard.press('Home');await expect(slider).toHaveValue('0');
 await expect(slider).toHaveAttribute('aria-valuetext','0% of before illustration visible');
 await page.keyboard.press('ArrowRight');await expect(slider).toHaveValue('1');
 await page.keyboard.press('End');await expect(slider).toHaveValue('100');
 await expect(page.locator('.before-image')).toHaveCSS('clip-path','inset(0px 0% 0px 0px)');
 const control=await slider.boundingBox();expect(control).toBeTruthy();
 await page.mouse.click(control!.x+control!.width/2,control!.y+control!.height/2);
 expect(Number(await slider.inputValue())).toBeGreaterThan(40);
 expect(Number(await slider.inputValue())).toBeLessThan(60);
 const id=await slider.getAttribute('id');await expect(page.locator(`label[for="${id}"]`)).toHaveText('Compare before and after illustrations');
 await page.goto('/transformations');await expect(page.getByRole('slider')).toHaveAccessibleName('Compare before and after illustrations');
 const mobile=await browser.newContext({viewport:{width:375,height:812},hasTouch:true,isMobile:true,baseURL:'http://127.0.0.1:3000'});
 const touchPage=await mobile.newPage();await touchPage.addInitScript(()=>sessionStorage.setItem('vlasy-enquiry-shown','true'));
 await touchPage.goto('/transformations');const touchSlider=touchPage.getByRole('slider');await touchSlider.scrollIntoViewIfNeeded();
 const touchBox=await touchSlider.boundingBox();expect(touchBox).toBeTruthy();
 await touchPage.touchscreen.tap(touchBox!.x+touchBox!.width*.75,touchBox!.y+touchBox!.height/2);
 expect(Number(await touchSlider.inputValue())).toBeGreaterThan(60);expect(Number(await touchSlider.inputValue())).toBeLessThan(90);
 await expect(touchPage.locator('.comparison')).toBeVisible();await mobile.close();
});

test('dark surfaces and illustrative labels are consistent across routes',async({page})=>{
 for(const route of ['/','/contact','/services/hair-replacement','/transformations']){
  await page.goto(route);
  await expect(page.locator('body')).toHaveCSS('background-color','rgb(36, 35, 33)');
  await expect(page.locator('html')).toHaveCSS('color-scheme','dark');
  if(route==='/')await expect(page.getByText('AI editorial portrait · not a client result')).toBeVisible();
  else if(route!=='/contact')await expect(page.locator('.illustration-label').first()).toBeVisible();
 }
 await page.goto('/services/hair-replacement');
 await expect(page.getByRole('heading',{name:'The full cost of care'})).toBeVisible();
 await page.setViewportSize({width:375,height:812});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('service stories provide responsive photo galleries with loaded images',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 const slugs=['hair-replacement','hair-extensions','hair-colour','hair-cut-styling','bridal','beauty-treatments','mehndi'];
 for(const slug of slugs){
  await page.goto(`/services/${slug}`);
  const lead=page.locator('.service-lead-pair');await expect(lead.locator('img')).toHaveCount(2);
  for(const photo of await lead.locator('img').all()){
   await photo.scrollIntoViewIfNeeded();await expect.poll(()=>photo.evaluate((image:HTMLImageElement)=>image.complete&&image.naturalWidth>0)).toBe(true);
  }
  const story=page.locator('.service-photo-story');await expect(story).toBeAttached();
  await expect(story.locator('figure')).toHaveCount(3);
  for(const photo of await story.locator('figure img').all()){
   await photo.scrollIntoViewIfNeeded();
   await expect.poll(()=>photo.evaluate((image:HTMLImageElement)=>image.complete&&image.naturalWidth>0)).toBe(true);
  }
  await expect(story.getByText('These images do not document VLASY clients, results or branch interiors.',{exact:false})).toBeVisible();
 }
 await page.setViewportSize({width:375,height:812});await page.goto('/services');
 await expect(page.locator('.service-card-visual')).toHaveCount(7);
 await expect(page.locator('.service-card-detail')).toHaveCount(7);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.goto('/services/hair-replacement');await page.locator('.service-photo-story').scrollIntoViewIfNeeded();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('homepage clearly connects every offering to its own page',async({page})=>{
 await page.goto('/');const section=page.getByRole('region',{name:/What we do.*at VLASY/ });
 await expect(section.getByRole('heading',{level:2})).toHaveText(/What we do\s*at VLASY\./);
 await expect(section.locator('.expertise-card')).toHaveCount(8);
 const destinations=['hair-replacement','hair-extensions','hair-colour','hair-cut-styling','bridal','beauty-treatments','mehndi'].map(slug=>`/services/${slug}`).concat('/academy');
 expect(await section.locator('.expertise-card').evaluateAll(cards=>cards.map(card=>card.getAttribute('href')))).toEqual(destinations);
 await section.getByRole('link',{name:'Explore Beauty Treatments',exact:true}).click();await expect(page).toHaveURL(/\/services\/beauty-treatments$/);
 await page.setViewportSize({width:375,height:812});await page.goto('/');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await section.getByRole('link',{name:'Explore VLASY Academy',exact:true}).click();await expect(page).toHaveURL(/\/academy$/);
 await page.getByRole('link',{name:'Explore this program'}).first().click();await expect(page).toHaveURL(/\/academy\/professional-hairdressing$/);
 await expect(page.getByRole('heading',{level:1})).toHaveText('Professional Hairdressing');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('new page destinations appear in sitemap and unknown programs return 404',async({request})=>{
 const sitemap=await request.get('/sitemap.xml');expect(sitemap.status()).toBe(200);const xml=await sitemap.text();
 for(const path of ['/approach','/academy/professional-hairdressing','/academy/hair-colour-artistry','/academy/beauty-makeup','/academy/bridal-artistry'])expect(xml).toContain(path);
 expect((await request.get('/academy/not-a-program')).status()).toBe(404);
});

test('theme switch persists across navigation, reload and keyboard use',async({page})=>{
 await page.goto('/contact');const light=page.getByRole('button',{name:'Switch to light theme'});await light.focus();await page.keyboard.press('Enter');
 await expect(page.locator('html')).toHaveAttribute('data-theme','light');
 await expect(page.locator('body')).toHaveCSS('background-color','rgb(245, 241, 233)');
 expect(await page.evaluate(()=>localStorage.getItem('vlasy-theme'))).toBe('light');
 await page.reload();await expect(page.locator('html')).toHaveAttribute('data-theme','light');
 await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content','#f5f1e9');
 await page.getByRole('button',{name:'Services',exact:true}).click();await expect(page.locator('#services-menu')).toBeVisible();
 await page.locator('#services-menu').getByRole('link',{name:'Hair Replacement',exact:true}).click();
 await expect(page).toHaveURL(/\/services\/hair-replacement$/);await expect(page.locator('html')).toHaveAttribute('data-theme','light');
 await page.getByRole('button',{name:'Switch to dark theme'}).click();await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
 await page.reload();await expect(page.locator('body')).toHaveCSS('background-color','rgb(36, 35, 33)');
});

test('light theme supports mobile pages, forms and navigation at common widths',async({page})=>{
 await page.goto('/');await page.getByRole('button',{name:'Switch to light theme'}).click();await page.emulateMedia({reducedMotion:'reduce'});
 for(const width of [375,768,1024]){
  await page.setViewportSize({width,height:900});await page.goto('/contact');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await expect(page.getByRole('button',{name:'Switch to dark theme'})).toBeVisible();
  await page.getByRole('button',{name:'Open navigation'}).click();await expect(page.locator('#mobile-nav')).toBeVisible();
  await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'Open navigation'})).toBeFocused();
 }
 await page.setViewportSize({width:375,height:812});
 for(const route of ['/','/services','/services/hair-replacement','/academy','/academy/beauty-makeup','/approach','/contact','/transformations']){
  await page.goto(route);await expect(page.locator('html')).toHaveAttribute('data-theme','light');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),route).toBe(true);
 }
 await page.goto('/contact');await page.getByRole('button',{name:'Send enquiry',exact:true}).click();await expect(page.locator('.field-error').first()).toBeVisible();
 await expect(page.locator('.field-error').first()).toHaveCSS('color','rgb(154, 51, 38)');
});

test('hero motion loop plays silently and offers pause and offscreen handling',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('/');
 const video=page.locator('.hero-video');await expect.poll(()=>video.evaluate((media:HTMLVideoElement)=>media.readyState>=2&&!media.paused)).toBe(true);
 expect(await video.evaluate((media:HTMLVideoElement)=>media.muted&&media.loop&&media.playsInline)).toBe(true);
 await page.getByRole('button',{name:'Pause hero video'}).click();await expect.poll(()=>video.evaluate((media:HTMLVideoElement)=>media.paused)).toBe(true);
 await page.getByRole('button',{name:'Play hero video'}).click();await expect.poll(()=>video.evaluate((media:HTMLVideoElement)=>!media.paused)).toBe(true);
 await page.locator('.footer').scrollIntoViewIfNeeded();await expect.poll(()=>video.evaluate((media:HTMLVideoElement)=>media.paused)).toBe(true);
});

test('hero retains static fallback for reduced motion, data saver and media failure',async({browser})=>{
 for(const mode of ['reduced','data-saver','failure']){
  const context=await browser.newContext({baseURL:'http://127.0.0.1:3000',reducedMotion:mode==='reduced'?'reduce':'no-preference'});
  const page=await context.newPage();await page.addInitScript(()=>sessionStorage.setItem('vlasy-enquiry-shown','true'));
  if(mode==='data-saver')await page.addInitScript(()=>Object.defineProperty(navigator,'connection',{value:{saveData:true}}));
  if(mode==='failure')await page.route('**/videos/hero-loop.mp4',route=>route.abort());
  const requests:string[]=[];page.on('request',request=>{if(request.url().includes('/videos/'))requests.push(request.url());});
  await page.goto('/');await expect.poll(()=>page.locator('.hero-image').evaluate((image:HTMLImageElement)=>image.complete&&image.naturalWidth>0)).toBe(true);
  if(mode!=='failure'){expect(requests).toHaveLength(0);expect(await page.locator('.hero-video').getAttribute('src')).toBeNull();}
  else await expect.poll(()=>page.locator('.hero-video').evaluate((media:HTMLVideoElement)=>Boolean(media.error))).toBe(true);
  await expect(page.getByRole('heading',{level:1})).toBeVisible();await context.close();
 }
});

test('key reading surfaces retain readable text contrast in both themes',async({page})=>{
 for(const theme of ['dark','light'])for(const path of ['/','/contact','/services/hair-replacement','/academy/beauty-makeup']){
  await page.goto(path);
  const button=page.getByRole('button',{name:`Switch to ${theme} theme`});if(await button.count())await button.click();
  const failures=await page.evaluate(()=>{
   const rgb=(value:string)=>{const c=value.match(/[\d.]+/g)?.map(Number)||[0,0,0];return[c[0],c[1],c[2],c[3]??1];};
   const bg=(node:Element|null):number[]=>{if(!node)return[255,255,255];const c=rgb(getComputedStyle(node).backgroundColor);if(c[3]>=1)return c.slice(0,3);const under=bg(node.parentElement);return c.slice(0,3).map((v,i)=>v*c[3]+under[i]*(1-c[3]));};
   const luminance=(c:number[])=>c.slice(0,3).map(v=>{const n=v/255;return n<=.04045?n/12.92:((n+.055)/1.055)**2.4;}).reduce((sum,v,i)=>sum+v*[.2126,.7152,.0722][i],0);
   return [...document.querySelectorAll('.page-hero>p,.form-note,.hr-story-copy>p,.hr-cta-bottom>p,.comparison figcaption p,.comparison-control p,.guide-grid article p,.program-focus-list p,.expertise-card p')].filter(node=>node.getClientRects().length).map(node=>{const a=luminance(rgb(getComputedStyle(node).color)),b=luminance(bg(node));return{text:node.textContent?.slice(0,55),ratio:(Math.max(a,b)+.05)/(Math.min(a,b)+.05)};}).filter(result=>result.ratio<4.5);
  });
  expect(failures,`${theme}: ${path}`).toEqual([]);
 }
});
