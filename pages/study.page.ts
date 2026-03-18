import { Page, Locator } from '@playwright/test';
import { LABELS } from '../constants/label-title';

export class StudyPage {
  readonly page: Page;
  readonly cardQuestion: Locator;
  readonly cardAnswer: Locator;
  readonly revealButton: Locator;
  readonly nextButton: Locator;
  readonly prevButton: Locator;
  readonly progressBar: Locator;
  readonly cardCounter: Locator;
  readonly finishButton: Locator;
  readonly easyButton: Locator;
  readonly hardButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cardQuestion = page.locator('[data-testid="card-question"]');
    this.cardAnswer = page.locator('[data-testid="card-answer"]');
    this.revealButton = page.locator('button:has-text("Reveal Answer")');
    this.nextButton = page.locator(`button:has-text("${LABELS.nextBtn}")`);
    this.prevButton = page.locator(`button:has-text("${LABELS.prevBtn}")`);
    this.progressBar = page.locator('[data-testid="progress-bar"]');
    this.cardCounter = page.locator('[data-testid="card-counter"]');
    this.finishButton = page.locator(`button:has-text("${LABELS.finishBtn}")`);
    this.easyButton = page.locator('button:has-text("Easy")');
    this.hardButton = page.locator('button:has-text("Hard")');
  }

  /**
   * Navigate to study mode
   */
  async goto(deckId: string): Promise<void> {
    await this.page.goto(`/study/${deckId}`);
  }

  /**
   * Get question text
   */
  async getQuestionText(): Promise<string> {
    const text = await this.cardQuestion.textContent();
    return text || '';
  }

  /**
   * Get answer text
   */
  async getAnswerText(): Promise<string> {
    const text = await this.cardAnswer.textContent();
    return text || '';
  }

  /**
   * Click reveal answer button
   */
  async clickReveal(): Promise<void> {
    await this.revealButton.click();
  }

  /**
   * Click next button
   */
  async clickNext(): Promise<void> {
    await this.nextButton.click();
  }

  /**
   * Click previous button
   */
  async clickPrevious(): Promise<void> {
    await this.prevButton.click();
  }

  /**
   * Mark as easy
   */
  async markAsEasy(): Promise<void> {
    await this.easyButton.click();
  }

  /**
   * Mark as hard
   */
  async markAsHard(): Promise<void> {
    await this.hardButton.click();
  }

  /**
   * Get card counter text
   */
  async getCardCounter(): Promise<string> {
    const text = await this.cardCounter.textContent();
    return text || '';
  }

  /**
   * Click finish button
   */
  async clickFinish(): Promise<void> {
    await this.finishButton.click();
  }

  /**
   * Verify study page is loaded
   */
  async verifyPageLoaded(): Promise<boolean> {
    return await this.cardQuestion.isVisible();
  }
}
