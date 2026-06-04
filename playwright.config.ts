import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ["line"],
    ["allure-playwright", { outputFolder: "allure-results" }],
  ],

  use: {
    baseURL: "https://admin-demo.nopcommerce.com",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome", // Uses installed Google Chrome instead of Playwright's Chromium
      },
    },
  ],
});
