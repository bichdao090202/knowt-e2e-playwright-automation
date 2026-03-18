import { Page, Locator } from '@playwright/test';
import { HomePage } from '../home.page';

export class LoginModal {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' })
    this.signInButton = page.getByRole('button', { name: 'Log in' })
    this.errorMessage = page.locator('[data-testid="error-message"]');
  }

  async login(email: string, password: string): Promise<HomePage> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
    return new HomePage(this.page);
  }

  async getErrorMessage(): Promise<string> {
    const text = await this.errorMessage.textContent();
    return text || '';
  }

}
