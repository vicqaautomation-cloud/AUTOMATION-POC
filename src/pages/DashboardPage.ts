import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {

  // Stable selector — semantic H1, unlikely to change
  private dashboardHeading = this.page.locator('h1');

  async isLoaded(): Promise<void> {
    await expect(this.page).toHaveURL('/admin/');
    await expect(this.dashboardHeading).toContainText('Dashboard');
  }
}