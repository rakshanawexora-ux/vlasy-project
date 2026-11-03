import { test as base, expect } from '@playwright/test';

// Keep timed consultation prompts from interrupting unrelated navigation tests.
export const test = base.extend<{ dismissConsultationPrompt: void }>({
  dismissConsultationPrompt: [
    async ({ page }, use) => {
      await page.addInitScript(() => sessionStorage.setItem('vlasy-enquiry-shown', 'true'));
      await use();
    },
    { auto: true },
  ],
});
export { expect };
