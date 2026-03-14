import { Page, Locator } from '@playwright/test';
import { Logger } from '../utils/logger';
import { LABELS } from '../constants/label-title';

export class DashboardPage {
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

  /**
   * Navigate to dashboard
   */
  async goto(): Promise<void> {
    Logger.step('Navigating to dashboard');
    await this.page.goto('/dashboard');
  }

  /**
   * Get welcome message text
   */
  async getWelcomeMessage(): Promise<string> {
    const text = await this.welcomeMessage.textContent();
    return text || '';
  }

  /**
   * Click user menu
   */
  async clickUserMenu(): Promise<void> {
    Logger.step('Clicking user menu');
    await this.userMenu.click();
  }

  /**
   * Logout
   */
  async logout(): Promise<void> {
    Logger.step('Logging out');
    await this.userMenu.click();
    await this.logoutButton.click();
  }

  /**
   * Click on library link
   */
  async goToLibrary(): Promise<void> {
    Logger.step('Going to library');
    await this.libraryLink.click();
  }

  /**
   * Click create deck button
   */
  async clickCreateDeck(): Promise<void> {
    Logger.step('Clicking create deck button');
    await this.createDeckButton.click();
  }

  /**
   * Verify dashboard is loaded
   */
  async verifyPageLoaded(): Promise<boolean> {
    return await this.welcomeMessage.isVisible();
  }

  /**
   * Get number of recent decks
   */
  async getRecentDecksCount(): Promise<number> {
    const locators = this.recentDecks.locator('[data-testid="deck-card"]');
    return await locators.count();
  }

  /**
   * Click on a specific deck
   */
  async clickDeck(deckName: string): Promise<void> {
    Logger.step(`Clicking on deck: ${deckName}`);
    await this.page.locator(`text=${deckName}`).click();
  }
}
