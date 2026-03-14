import { Page, Locator } from '@playwright/test';
import { Logger } from '../utils/logger';
import { LABELS, PLACEHOLDERS } from '../constants/label-title';

export class LibraryPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly createDeckButton: Locator;
  readonly decksList: Locator;
  readonly filterButton: Locator;
  readonly sortButton: Locator;
  readonly noDeckMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator(`input[placeholder="${PLACEHOLDERS.searchInput}"]`);
    this.createDeckButton = page.locator(`button:has-text("${LABELS.createDeckBtn}")`);
    this.decksList = page.locator('[data-testid="decks-list"]');
    this.filterButton = page.locator('[data-testid="filter-button"]');
    this.sortButton = page.locator('[data-testid="sort-button"]');
    this.noDeckMessage = page.locator(
      'text="No decks found. Create one to get started!"'
    );
  }

  /**
   * Navigate to library
   */
  async goto(): Promise<void> {
    Logger.step('Navigating to library');
    await this.page.goto('/library');
  }

  /**
   * Search for a deck
   */
  async searchDeck(deckName: string): Promise<void> {
    Logger.step(`Searching for deck: ${deckName}`);
    await this.searchInput.clear();
    await this.searchInput.fill(deckName);
    await this.page.waitForTimeout(500); // Wait for search results
  }

  /**
   * Click create deck button
   */
  async clickCreateDeck(): Promise<void> {
    Logger.step('Clicking create deck button');
    await this.createDeckButton.click();
  }

  /**
   * Get number of decks
   */
  async getDecksCount(): Promise<number> {
    const locators = this.decksList.locator('[data-testid="deck-item"]');
    return await locators.count();
  }

  /**
   * Click on a deck
   */
  async clickDeck(deckName: string): Promise<void> {
    Logger.step(`Clicking on deck: ${deckName}`);
    await this.decksList.locator(`text=${deckName}`).click();
  }

  /**
   * Verify library page is loaded
   */
  async verifyPageLoaded(): Promise<boolean> {
    return await this.searchInput.isVisible();
  }

  /**
   * Check if no decks message is visible
   */
  async isNoDeckMessageVisible(): Promise<boolean> {
    return await this.noDeckMessage.isVisible().catch(() => false);
  }

  /**
   * Open filter menu
   */
  async openFilter(): Promise<void> {
    Logger.step('Opening filter menu');
    await this.filterButton.click();
  }

  /**
   * Open sort menu
   */
  async openSort(): Promise<void> {
    Logger.step('Opening sort menu');
    await this.sortButton.click();
  }
}
