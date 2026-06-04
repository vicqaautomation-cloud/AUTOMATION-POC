import { test, expect } from '../../fixtures';
import { config } from '../../utils/config';

// =============================================================================
// EPIC: Authentication & Access Control
// USER STORY: US-001 - Admin Login
//   As an admin user
//   I want to log into the admin panel
//   So that I can manage the store
// =============================================================================

test.describe('US-001 | Admin Login', () => {

  test('TC-001 | Successful login with valid credentials', {
    annotation: [
      { type: 'Epic',        description: 'Authentication & Access Control' },
      { type: 'Story',       description: 'US-001 - Admin Login' },
      { type: 'Type',        description: 'Smoke' },
      { type: 'Priority',    description: 'Critical' },
      { type: 'Status',      description: 'Automated' },
    ],
  }, async ({ loginPage, dashboardPage }) => {
    // Act
    await loginPage.login({
      email: config.adminEmail,
      password: config.adminPassword,
    });

    // Assert
    await dashboardPage.isLoaded();
  });

  test('TC-002 | Failed login with invalid credentials', {
    annotation: [
      { type: 'Epic',        description: 'Authentication & Access Control' },
      { type: 'Story',       description: 'US-001 - Admin Login' },
      { type: 'Type',        description: 'Sanity' },
      { type: 'Priority',    description: 'High' },
      { type: 'Status',      description: 'Automated' },
    ],
  }, async ({ loginPage, page }) => {
    // Act
    await loginPage.login({
      email: 'invalid@email.com',
      password: 'wrongpassword',
    });

    // Assert
    await expect(page.locator('div.validation-summary-errors')).toBeVisible();
    await expect(page.locator('div.validation-summary-errors'))
      .toContainText('The credentials provided are incorrect');
  });

});