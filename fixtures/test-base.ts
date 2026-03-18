import { Page, BrowserContext } from '@playwright/test';
import { BrowserUtils } from '../utils/browser-utils';

export class TestBase {
  protected page: Page;
  protected context: BrowserContext;

  constructor(page: Page, context?: BrowserContext) {
    this.page = page;
    this.context = context!;
  }

  async setUp(): Promise<void> {
    BrowserUtils.setupConsoleListener(this.page);
  }

  async tearDown(): Promise<void> {
  }
}
