import { Page, Locator } from '@playwright/test';
import { LABELS } from '../constants/label-title';

export class HomePage {
  readonly page: Page;
  readonly welcomeMessage: Locator;
  readonly userMenu: Locator;
  readonly logoutButton: Locator;
  readonly libraryLink: Locator;
  readonly createDeckButton: Locator;
  readonly recentDecks: Locator;
  readonly profileIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeMessage = page.locator('[data-testid="welcome-message"]');
    this.userMenu = page.locator('[data-testid="user-menu"]');
    this.logoutButton = page.locator(`button:has-text("${LABELS.logoutBtn}")`);
    this.libraryLink = page.locator('a:has-text("Library")');
    this.createDeckButton = page.locator(`button:has-text("${LABELS.createDeckBtn}")`);
    this.recentDecks = page.locator('[data-testid="recent-decks"]');
    this.profileIcon = page.locator('[data-testid="profile-icon"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/dashboard');
  }

  async getWelcomeMessage(): Promise<string> {
    const text = await this.welcomeMessage.textContent();
    return text || '';
  }

  async clickUserMenu(): Promise<void> {
    await this.userMenu.click();
  }

  async logout(): Promise<void> {
    await this.userMenu.click();
    await this.logoutButton.click();
  }

  async goToLibrary(): Promise<void> {
    await this.libraryLink.click();
  }

  async clickCreateDeck(): Promise<void> {
    await this.createDeckButton.click();
  }

  async clickDeck(deckName: string): Promise<void> {
    await this.page.locator(`text=${deckName}`).click();
  }
}
