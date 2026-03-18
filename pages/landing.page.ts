import { Page, Locator } from '@playwright/test';
import { LoginModal } from './components/login.modal';

export class LandingPage {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly loginModel: LoginModal;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.loginModel = new LoginModal(this.page);
  }

  async clickLogin(): Promise<LoginModal> {
    await this.loginButton.click();
    return new LoginModal(this.page);
  }

}
