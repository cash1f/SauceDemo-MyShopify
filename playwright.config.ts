import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://www.saucedemo.com',
    testIdAttribute: 'data-test',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Stops Chrome's password popups (browser UI, not part of the page)
        launchOptions: {
          args: ['--disable-features=PasswordLeakDetection,PasswordManagerOnboarding'],
        },
      },
    },
  ],
});
