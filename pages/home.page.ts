import { Page, Locator } from '@playwright/test';
import { DashboardSidebar } from './components/dashboard.sidebar';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  dashboardSidebar() {
    return new DashboardSidebar(this.page);
  }

  async goto(url: string) {
    await this.page.goto(url);
}
}
