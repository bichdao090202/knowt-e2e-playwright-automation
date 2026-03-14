import { Page, Locator } from '@playwright/test';
import { Logger } from '../utils/logger';
import { LABELS, TITLES } from '../constants/label-title';

export class LandingPage {
  readonly page: Page;
  readonly signInButton: Locator;
  readonly signUpButton: Locator;
  readonly featureSection: Locator;
  readonly heroHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.locator(`button:has-text("${LABELS.loginBtn}")`);
    this.signUpButton = page.locator(`button:has-text("${LABELS.signupBtn}")`);
    this.featureSection = page.locator('[data-testid="features"]');
    this.heroHeading = page.locator('h1');
  }

  /**
   * Navigate to landing page
   */
  async goto(): Promise<void> {
    Logger.step('Navigating to landing page');
    await this.page.goto('/');
  }

  /**
   * Click sign in button
   */
  async clickSignIn(): Promise<void> {
    Logger.step('Clicking sign in button');
    await this.signInButton.click();
  }

  /**
   * Click sign up button
   */
  async clickSignUp(): Promise<void> {
    Logger.step('Clicking sign up button');
    await this.signUpButton.click();
  }

  /**
   * Verify landing page is loaded
   */
  async verifyPageLoaded(): Promise<boolean> {
    Logger.step('Verifying landing page is loaded');
    return await this.heroHeading.isVisible();
  }

  /**
   * Get hero heading text
   */
  async getHeroHeadingText(): Promise<string> {
    const text = await this.heroHeading.textContent();
    return text || '';
  }

  /**
   * Verify features section is visible
   */
  async isFeaturesVisible(): Promise<boolean> {
    return await this.featureSection.isVisible();
  }
}
