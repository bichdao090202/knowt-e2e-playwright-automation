import { Page, Locator } from '@playwright/test';
import { LABELS } from '../constants/label-title';

export class DeckPage {
  readonly page: Page;
  readonly deckTitle: Locator;
  readonly deckDescription: Locator;
  readonly cardsList: Locator;
  readonly addCardButton: Locator;
  readonly editDeckButton: Locator;
  readonly deleteDeckButton: Locator;
  readonly studyButton: Locator;
  readonly practiceButton: Locator;
  readonly cardCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.deckTitle = page.locator('[data-testid="deck-title"]');
    this.deckDescription = page.locator('[data-testid="deck-description"]');
    this.cardsList = page.locator('[data-testid="cards-list"]');
    this.addCardButton = page.locator(`button:has-text("${LABELS.addCardBtn}")`);
    this.editDeckButton = page.locator(`button:has-text("${LABELS.editBtn}")`);
    this.deleteDeckButton = page.locator(`button:has-text("${LABELS.deleteBtn}")`);
    this.studyButton = page.locator(`button:has-text("${LABELS.studyBtn}")`);
    this.practiceButton = page.locator(`button:has-text("${LABELS.practiceBtn}")`);
    this.cardCount = page.locator('[data-testid="card-count"]');
  }

  /**
   * Navigate to a specific deck
   */
  async goto(deckId: string): Promise<void> {
    await this.page.goto(`/deck/${deckId}`);
  }

  /**
   * Get deck title
   */
  async getDeckTitle(): Promise<string> {
    const text = await this.deckTitle.textContent();
    return text || '';
  }

  /**
   * Get deck description
   */
  async getDeckDescription(): Promise<string> {
    const text = await this.deckDescription.textContent();
    return text || '';
  }

  /**
   * Click add card button
   */
  async clickAddCard(): Promise<void> {
    await this.addCardButton.click();
  }

  /**
   * Click study button
   */
  async clickStudy(): Promise<void> {
    await this.studyButton.click();
  }

  /**
   * Click practice button
   */
  async clickPractice(): Promise<void> {
    await this.practiceButton.click();
  }

  /**
   * Get number of cards
   */
  async getCardsCount(): Promise<number> {
    const locators = this.cardsList.locator('[data-testid="card-item"]');
    return await locators.count();
  }

  /**
   * Click on a specific card
   */
  async clickCard(cardIndex: number): Promise<void> {
    const cards = this.cardsList.locator('[data-testid="card-item"]');
    await cards.nth(cardIndex).click();
  }

  /**
   * Verify deck page is loaded
   */
  async verifyPageLoaded(): Promise<boolean> {
    return await this.deckTitle.isVisible();
  }

  /**
   * Get card count from display
   */
  async getDisplayedCardCount(): Promise<string> {
    const text = await this.cardCount.textContent();
    return text || '';
  }
}
