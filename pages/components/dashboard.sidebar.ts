import { Page, Locator } from '@playwright/test';
import { HomePage } from '../home.page';
import { MaterialsPage } from '../materials.page';

export class DashboardSidebar {

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    const homeText = page.getByText('Home', { exact: true });
    const materialsText = page.getByText('Materials', { exact: true });
  }

  async clickHome() {
    await this.page.getByText('Home', { exact: true }).click();
    return new HomePage(this.page);
  }

  async clickMaterials() {
    await this.page.getByText('Materials', { exact: true }).click();
    return new MaterialsPage(this.page);
  }
}
