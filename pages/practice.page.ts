import { Page, Locator } from '@playwright/test';
import { LABELS } from '../constants/label-title';

export class PracticePage {
  readonly page: Page;
  readonly questionText: Locator;
  readonly answerOptions: Locator;
  readonly selectedAnswer: Locator;
  readonly submitButton: Locator;
  readonly nextButton: Locator;
  readonly scoreDisplay: Locator;
  readonly resultMessage: Locator;
  readonly progressBar: Locator;
  readonly questionCounter: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.questionText = page.locator('[data-testid="question-text"]');
    this.answerOptions = page.locator('[data-testid="answer-options"]');
    this.selectedAnswer = page.locator('[data-testid="selected-answer"]');
    this.submitButton = page.locator(`button:has-text("${LABELS.submitBtn}")`);
    this.nextButton = page.locator(`button:has-text("${LABELS.nextBtn}")`);
    this.scoreDisplay = page.locator('[data-testid="score"]');
    this.resultMessage = page.locator('[data-testid="result-message"]');
    this.progressBar = page.locator('[data-testid="progress"]');
    this.questionCounter = page.locator('[data-testid="question-counter"]');
    this.finishButton = page.locator(`button:has-text("${LABELS.finishBtn}")`);
  }

  /**
   * Navigate to practice mode
   */
  async goto(deckId: string): Promise<void> {
    await this.page.goto(`/practice/${deckId}`);
  }

  /**
   * Get question text
   */
  async getQuestionText(): Promise<string> {
    const text = await this.questionText.textContent();
    return text || '';
  }

  /**
   * Select an answer option by index
   */
  async selectAnswerOption(index: number): Promise<void> {
    const options = this.answerOptions.locator('[data-testid="option"]');
    await options.nth(index).click();
  }

  /**
   * Select an answer option by text
   */
  async selectAnswerByText(answerText: string): Promise<void> {
    await this.page.locator(`text=${answerText}`).click();
  }

  /**
   * Submit answer
   */
  async submitAnswer(): Promise<void> {
    await this.submitButton.click();
  }

  /**
   * Click next button
   */
  async clickNext(): Promise<void> {
    await this.nextButton.click();
  }

  /**
   * Get current score
   */
  async getScore(): Promise<string> {
    const text = await this.scoreDisplay.textContent();
    return text || '';
  }

  /**
   * Get result message
   */
  async getResultMessage(): Promise<string> {
    const text = await this.resultMessage.textContent();
    return text || '';
  }

  /**
   * Get question counter
   */
  async getQuestionCounter(): Promise<string> {
    const text = await this.questionCounter.textContent();
    return text || '';
  }

  /**
   * Click finish button
   */
  async clickFinish(): Promise<void> {
    await this.finishButton.click();
  }

  /**
   * Verify practice page is loaded
   */
  async verifyPageLoaded(): Promise<boolean> {
    return await this.questionText.isVisible();
  }
}
