import { Page, Locator } from '@playwright/test';

export class WaitUtils {
  /**
   * Wait for a specific amount of time (in milliseconds)
   */
  static async waitFor(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Wait for an element to be visible
   */
  static async waitForElementVisible(
    locator: Locator,
    timeout: number = 30000
  ): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for an element to be hidden
   */
  static async waitForElementHidden(
    locator: Locator,
    timeout: number = 30000
  ): Promise<void> {
    await locator.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Wait for an element to be enabled
   */
  static async waitForElementEnabled(
    locator: Locator,
    timeout: number = 30000
  ): Promise<void> {
    await locator.waitFor({ state: 'attached', timeout });
  }

  /**
   * Wait for page to load completely
   */
  static async waitForPageLoad(page: Page, timeout: number = 30000): Promise<void> {
    await page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Wait for URL to change
   */
  static async waitForURLChange(page: Page, timeout: number = 30000): Promise<string> {
    await page.waitForURL('**', { timeout });
    return page.url();
  }

  /**
   * Wait for text to appear on page
   */
  static async waitForText(page: Page, text: string, timeout: number = 30000): Promise<void> {
    await page.waitForFunction(
      (searchText) => document.body.innerText.includes(searchText),
      text,
      { timeout }
    );
  }

  /**
   * Retry a function multiple times
   */
  static async retry<T>(
    fn: () => Promise<T>,
    maxAttempts: number = 3,
    delayMs: number = 1000
  ): Promise<T> {
    let lastError: Error = new Error('No attempts made');

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        if (attempt < maxAttempts) {
          await this.waitFor(delayMs);
        }
      }
    }

    throw lastError;
  }
}
