import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/landing.page';
import { LoginPage } from '../pages/login.page';
import { Logger } from '../utils/logger';

test.describe('StudyKid E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    Logger.testStart('StudyKid E2E Test');
    await page.goto('/');
  });

  test('should verify landing page loads successfully', async ({ page }) => {
    const landingPage = new LandingPage(page);

    // Verify page is loaded
    const isLoaded = await landingPage.verifyPageLoaded();
    expect(isLoaded).toBeTruthy();

    // Verify hero heading is visible
    const heroText = await landingPage.getHeroHeadingText();
    expect(heroText.length).toBeGreaterThan(0);

    Logger.testPass('Landing page loads successfully');
  });

  test('should navigate to login page from landing page', async ({ page }) => {
    const landingPage = new LandingPage(page);

    // Click sign in button
    await landingPage.clickSignIn();

    // Verify we're on login page
    const loginPage = new LoginPage(page);
    const isLoginLoaded = await loginPage.verifyPageLoaded();
    expect(isLoginLoaded).toBeTruthy();

    Logger.testPass('Navigation to login page successful');
  });

  test('should display error on invalid login', async ({ page }) => {
    const landingPage = new LandingPage(page);
    await landingPage.clickSignIn();

    const loginPage = new LoginPage(page);

    // Try to login with invalid credentials
    await loginPage.login('invalid@example.com', 'wrongpassword');

    // Wait for error message
    await page.waitForTimeout(1000);

    // Verify error is shown
    const isErrorVisible = await loginPage.isErrorVisible();
    expect(isErrorVisible).toBeTruthy();

    const errorText = await loginPage.getErrorMessage();
    expect(errorText.length).toBeGreaterThan(0);

    Logger.testPass('Error displayed on invalid login');
  });

  test('should have accessible sign up option', async ({ page }) => {
    const landingPage = new LandingPage(page);
    await landingPage.clickSignIn();

    const loginPage = new LoginPage(page);

    // Verify sign up link is visible
    expect(await loginPage.page.locator('text=Sign Up').isVisible()).toBeTruthy();

    Logger.testPass('Sign up option is accessible');
  });
});
