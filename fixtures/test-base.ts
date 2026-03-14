import { Page, BrowserContext } from '@playwright/test';
import { Logger } from '../utils/logger';
import { WaitUtils } from '../utils/wait';
import { BrowserUtils } from '../utils/browser-utils';
import { CONFIG } from '../constants/config';

export class TestBase {
  protected page: Page;
  protected context: BrowserContext;

  constructor(page: Page, context?: BrowserContext) {
    this.page = page;
    this.context = context!;
  }

  /**
   * Navigate to base URL
   */
  async navigateToBaseURL(): Promise<void> {
    Logger.step(`Navigating to ${CONFIG.baseUrl}`);
    await this.page.goto(CONFIG.baseUrl);
    await WaitUtils.waitForPageLoad(this.page);
  }

  /**
   * Navigate to a specific path
   */
  async navigateTo(path: string): Promise<void> {
    const url = `${CONFIG.baseUrl}${path}`;
    Logger.step(`Navigating to ${url}`);
    await this.page.goto(url);
    await WaitUtils.waitForPageLoad(this.page);
  }

  /**
   * Get current page title
   */
  async getPageTitle(): Promise<string> {
    return await BrowserUtils.getPageTitle(this.page);
  }

  /**
   * Get current URL
   */
  async getCurrentURL(): Promise<string> {
    return await BrowserUtils.getCurrentURL(this.page);
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    await BrowserUtils.takeScreenshot(this.page, name);
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(selector: string): Promise<boolean> {
    return await BrowserUtils.isElementVisible(this.page, selector);
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(selector: string, timeout?: number): Promise<void> {
    const locator = this.page.locator(selector);
    await WaitUtils.waitForElementVisible(locator, timeout);
  }

  /**
   * Click an element
   */
  async click(selector: string): Promise<void> {
    Logger.step(`Clicking on ${selector}`);
    await this.page.click(selector);
  }

  /**
   * Fill input field
   */
  async fill(selector: string, value: string): Promise<void> {
    Logger.step(`Filling ${selector} with ${value}`);
    await this.page.fill(selector, value);
  }

  /**
   * Get text content
   */
  async getText(selector: string): Promise<string> {
    return await this.page.textContent(selector) || '';
  }

  /**
   * Get input value
   */
  async getInputValue(selector: string): Promise<string> {
    return await this.page.inputValue(selector);
  }

  /**
   * Refresh page
   */
  async refreshPage(): Promise<void> {
    await BrowserUtils.refreshPage(this.page);
  }

  /**
   * Go back
   */
  async goBack(): Promise<void> {
    await BrowserUtils.goBack(this.page);
  }

  /**
   * Wait for navigation
   */
  async waitForNavigation(): Promise<void> {
    await this.page.waitForURL('**');
  }

  /**
   * Setup test
   */
  async setUp(): Promise<void> {
    Logger.info('Setting up test...');
    BrowserUtils.setupConsoleListener(this.page);
  }

  /**
   * Clean up after test
   */
  async tearDown(): Promise<void> {
    Logger.info('Cleaning up test...');
  }
}
