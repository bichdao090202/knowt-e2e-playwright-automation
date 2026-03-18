import { Locator, Page } from '@playwright/test';
import { CONFIG } from '../constants/config';
import { LandingPage } from './landing.page';
import { BrowserUtils } from '../utils/browser-utils';

export class BasePage {
  readonly page: Page;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async navigateToLandingPage(): Promise<LandingPage> {
    await this.page.goto(CONFIG.baseUrl);
    return new LandingPage(this.page);
  }

   async navigateTo(path: string): Promise<void> {
      const url = `${CONFIG.baseUrl}${path}`;
      await this.page.goto(url);
      await this.page.waitForLoadState('networkidle');
    }
  
    async getPageTitle(): Promise<string> {
      return await BrowserUtils.getPageTitle(this.page);
    }
  
    async getCurrentURL(): Promise<string> {
      return await BrowserUtils.getCurrentURL(this.page);
    }

}
