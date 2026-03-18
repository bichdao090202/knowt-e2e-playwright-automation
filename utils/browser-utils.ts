import { Page, Browser } from '@playwright/test';

export class BrowserUtils {
  /**
   * Take a screenshot
   */
  static async takeScreenshot(page: Page, name: string): Promise<string> {
    const filename = `screenshots/${name}-${Date.now()}.png`;
    await page.screenshot({ path: filename });
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
  }

  /**
   * Get page content
   */
  static async getPageContent(page: Page): Promise<string> {
    return await page.content();
  }

  /**
   * Get console messages
   */
  static setupConsoleListener(page: Page): void {
    page.on('console', (msg) => {
      //Handle console messages
    });
  }

  /**
   * Handle dialog (alert, confirm, prompt)
   */
  static setupDialogHandler(page: Page, action: 'accept' | 'dismiss' = 'accept'): void {
    page.on('dialog', async (dialog) => {
      if (action === 'accept') {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });
  }
}
