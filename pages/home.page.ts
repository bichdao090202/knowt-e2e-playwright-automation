import { Page, Locator } from '@playwright/test';
import { DashboardSidebar } from './components/dashboard.sidebar';
import { CONFIG } from '../constants/config';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(): Promise<void> {
    await this.page.goto(CONFIG.baseUrl);
  }

  dashboardSidebar() {
    return new DashboardSidebar(this.page);
  }

  async goto(url: string) {
    await this.page.goto(url);
  }
}
