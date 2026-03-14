import { Page, Locator } from '@playwright/test';
import { Logger } from '../utils/logger';
import { LABELS, PLACEHOLDERS } from '../constants/label-title';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;
  readonly forgotPasswordLink: Locator;
  readonly signUpLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator(`input[placeholder="${PLACEHOLDERS.emailInput}"]`);
    this.passwordInput = page.locator(`input[placeholder="${PLACEHOLDERS.passwordInput}"]`);
    this.signInButton = page.locator(`button:has-text("${LABELS.loginBtn}")`);
    this.errorMessage = page.locator('[data-testid="error-message"]');
    this.forgotPasswordLink = page.locator('text=Forgot Password');
    this.signUpLink = page.locator('text=Sign Up');
  }

  /**
   * Navigate to login page
   */
  async goto(): Promise<void> {
    Logger.step('Navigating to login page');
    await this.page.goto('/login');
  }

  /**
   * Login with email and password
   */
  async login(email: string, password: string): Promise<void> {
    Logger.step(`Logging in with email: ${email}`);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    const text = await this.errorMessage.textContent();
    return text || '';
  }

  /**
   * Verify error message is visible
   */
  async isErrorVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  /**
   * Click forgot password link
   */
  async clickForgotPassword(): Promise<void> {
    Logger.step('Clicking forgot password link');
    await this.forgotPasswordLink.click();
  }

  /**
   * Click sign up link
   */
  async clickSignUp(): Promise<void> {
    Logger.step('Clicking sign up link');
    await this.signUpLink.click();
  }

  /**
   * Verify login page is loaded
   */
  async verifyPageLoaded(): Promise<boolean> {
    return await this.emailInput.isVisible();
  }

  /**
   * Check if sign in button is enabled
   */
  async isSignInButtonEnabled(): Promise<boolean> {
    return await this.signInButton.isEnabled();
  }

  /**
   * Clear email input
   */
  async clearEmail(): Promise<void> {
    await this.emailInput.clear();
  }

  /**
   * Clear password input
   */
  async clearPassword(): Promise<void> {
    await this.passwordInput.clear();
  }
}
