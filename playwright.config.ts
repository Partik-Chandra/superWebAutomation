import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: 0,             // Retry failed tests once
  timeout: 200 * 1000,      // 30 seconds per test timeout     
  use: {
    headless: true,      // Run tests in headed mode for debugging
    trace: 'on',          // Record trace for each test
    screenshot: 'only-on-failure', // Capture screenshots only on failures
    video: 'retain-on-failure',     // Record video on failures
  },
  reporter: [
    ['list', { printSteps: true }],                     // Show test results in the console
    ['html', { open: 'never' }]  // Generate HTML report
  ],

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'],
    //    },
    // },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'], 
    //     headless: false,
    //   },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
});
