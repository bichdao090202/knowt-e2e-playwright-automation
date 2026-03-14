import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { DashboardPage } from '../../pages/dashboard.page';
import { Logger } from '../../utils/logger';
import { TEST_USERS } from '../../constants/config';

test.describe('Authentication Tests', () => {
  test.beforeEach(async ({ page }) => {
    Logger.testStart('Authentication Test');
    await page.goto('/login');
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Verify login page is loaded
    expect(await loginPage.verifyPageLoaded()).toBeTruthy();

    // Perform login
    await loginPage.login(TEST_USERS.validUser.email, TEST_USERS.validUser.password);

    // Wait for navigation
    await page.waitForURL('**/dashboard');

    // Verify we're on dashboard
    const dashboardPage = new DashboardPage(page);
    expect(await dashboardPage.verifyPageLoaded()).toBeTruthy();

    Logger.testPass('Login with valid credentials successful');
  });

  test('should display error with invalid email', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Try login with invalid credentials
    await loginPage.login(TEST_USERS.invalidUser.email, TEST_USERS.invalidUser.password);

    // Verify error is displayed
    await page.waitForTimeout(500);
    expect(await loginPage.isErrorVisible()).toBeTruthy();

    Logger.testPass('Error displayed with invalid credentials');
  });

  test('should not allow login with empty fields', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Try to submit without filling fields
    const isSignInEnabled = await loginPage.isSignInButtonEnabled();

    // Sign in button should be disabled or clicking should not navigate
    if (isSignInEnabled) {
      await loginPage.page.locator('button:has-text("Sign In")').click();
      // Should stay on login page or show error
      expect(await loginPage.verifyPageLoaded()).toBeTruthy();
    }

    Logger.testPass('Login prevented with empty fields');
  });

  test('should clear email and password inputs', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Fill inputs
    await loginPage.fill('[data-testid="email-input"]', 'test@example.com');
    await loginPage.fill('[data-testid="password-input"]', 'password123');

    // Clear inputs
    await loginPage.clearEmail();
    await loginPage.clearPassword();

    // Verify they are cleared
    const email = await loginPage.getInputValue('[data-testid="email-input"]');
    const password = await loginPage.getInputValue('[data-testid="password-input"]');

    expect(email).toBe('');
    expect(password).toBe('');

    Logger.testPass('Inputs cleared successfully');
  });

  test('should navigate to forgot password page', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Click forgot password link
    await loginPage.clickForgotPassword();

    // Verify URL changed
    expect(page.url()).toContain('forgot-password');

    Logger.testPass('Navigation to forgot password successful');
  });

  test('should navigate to sign up page', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Click sign up link
    await loginPage.clickSignUp();

    // Verify URL changed
    expect(page.url()).toContain('signup');

    Logger.testPass('Navigation to sign up successful');
  });
});
