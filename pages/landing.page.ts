import { Page, Locator } from '@playwright/test';
import { LoginModal } from './components/login.modal';
import { CONFIG } from '../constants/config';

export class LandingPage {
  readonly page: Page;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async open(): Promise<void> {
    await this.page.goto(CONFIG.baseUrl);
    // await this.page.waitForLoadState('networkidle');
  }

  async clickLogin(): Promise<LoginModal> {
    await this.loginButton.click();
    return new LoginModal(this.page);
  }
}
