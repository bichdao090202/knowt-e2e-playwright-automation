import { Page, Browser } from '@playwright/test';
import { Logger } from './logger';

export class BrowserUtils {
  /**
   * Take a screenshot
   */
  static async takeScreenshot(page: Page, name: string): Promise<string> {
    const filename = `screenshots/${name}-${Date.now()}.png`;
    await page.screenshot({ path: filename });
    Logger.info(`Screenshot saved: ${filename}`);
    return filename;
  }

  /**
   * Get page title
   */
  static async getPageTitle(page: Page): Promise<string> {
    return await page.title();
  }

  /**
   * Get current URL
   */
  static async getCurrentURL(page: Page): Promise<string> {
    return page.url();
  }

  /**
   * Go back to previous page
   */
  static async goBack(page: Page): Promise<void> {
    await page.goBack();
  }

  /**
   * Go forward to next page
   */
  static async goForward(page: Page): Promise<void> {
    await page.goForward();
  }

  /**
   * Refresh the page
   */
  static async refreshPage(page: Page): Promise<void> {
    await page.reload();
  }

  /**
   * Set viewport size
   */
  static async setViewportSize(page: Page, width: number, height: number): Promise<void> {
    await page.setViewportSize({ width, height });
    Logger.info(`Viewport set to ${width}x${height}`);
  }

  /**
   * Get page content
   */
  static async getPageContent(page: Page): Promise<string> {
    return await page.content();
  }

  /**
   * Check if element is visible
   */
  static async isElementVisible(page: Page, selector: string): Promise<boolean> {
    const element = page.locator(selector);
    return await element.isVisible().catch(() => false);
  }

  /**
   * Get console messages
   */
  static setupConsoleListener(page: Page): void {
    page.on('console', (msg) => {
      Logger.debug(`Console [${msg.type()}]: ${msg.text()}`);
    });
  }

  /**
   * Handle dialog (alert, confirm, prompt)
   */
  static setupDialogHandler(page: Page, action: 'accept' | 'dismiss' = 'accept'): void {
    page.on('dialog', async (dialog) => {
      Logger.info(`Dialog detected: ${dialog.message()}`);
      if (action === 'accept') {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });
  }
}
