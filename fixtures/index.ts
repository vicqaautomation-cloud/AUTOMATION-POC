import { test as base, Browser, Page } from '@playwright/test';
import { chromium } from '../utils/browser';
import { LoginPage } from '../src/pages/LoginPage';
import { DashboardPage } from '../src/pages/DashboardPage';
import { config } from '../utils/config';

interface AppFixtures {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  authenticatedPage: DashboardPage;
}

interface WorkerFixtures {
  stealthBrowser: Browser;
}

export const test = base.extend<AppFixtures, WorkerFixtures>({

  // Worker-scoped stealth browser instance
  stealthBrowser: [async ({}, use) => {
    const browser = await chromium.launch({ headless: false });
    await use(browser);
    await browser.close();
  }, { scope: 'worker' }],

  // Provides LoginPage with stealth browser
  loginPage: async ({ stealthBrowser }, use) => {
    const page = await stealthBrowser.newPage();
    await page.goto(config.baseURL + '/login');
    const loginPage = new LoginPage(page);
    await use(loginPage);
    await page.close();
  },

  // Provides DashboardPage with stealth browser
  dashboardPage: async ({ stealthBrowser }, use) => {
    const page = await stealthBrowser.newPage();
    await use(new DashboardPage(page));
    await page.close();
  },

  // Provides already authenticated session
  authenticatedPage: async ({ stealthBrowser }, use) => {
    const page = await stealthBrowser.newPage();
    await page.goto(config.baseURL + '/login');
    const loginPage = new LoginPage(page);
    await loginPage.login({
      email: config.adminEmail,
      password: config.adminPassword,
    });
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.isLoaded();
    await use(dashboardPage);
    await page.close();
  },

});

export { expect } from '@playwright/test';