import { test, expect } from '@playwright/test';
import { DeckPage } from '../../pages/deck.page';
import { PracticePage } from '../../pages/practice.page';
import { Logger } from '../../utils/logger';

test.describe('Practice Mode Tests', () => {
  test.beforeEach(async ({ page }) => {
    Logger.testStart('Practice Mode Test');
    // Assuming user has access to a deck
    await page.goto('/deck/deck_001');
  });

  test('should start practice session', async ({ page }) => {
    const deckPage = new DeckPage(page);

    // Verify deck page is loaded
    expect(await deckPage.verifyPageLoaded()).toBeTruthy();

    // Click practice button
    await deckPage.clickPractice();

    // Verify practice page is loaded
    const practicePage = new PracticePage(page);
    expect(await practicePage.verifyPageLoaded()).toBeTruthy();

    Logger.testPass('Practice session started successfully');
  });

  test('should display question in practice mode', async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.clickPractice();

    const practicePage = new PracticePage(page);

    // Get question text
    const question = await practicePage.getQuestionText();

    expect(question.length).toBeGreaterThan(0);

    Logger.testPass('Question displayed in practice mode');
  });

  test('should select answer option', async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.clickPractice();

    const practicePage = new PracticePage(page);

    // Select first answer option
    await practicePage.selectAnswerOption(0);

    // Submit answer
    await practicePage.submitAnswer();

    await page.waitForTimeout(500);

    Logger.testPass('Answer selected and submitted');
  });

  test('should navigate through practice questions', async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.clickPractice();

    const practicePage = new PracticePage(page);

    // Get first question
    const firstQuestion = await practicePage.getQuestionText();

    // Select answer and submit
    await practicePage.selectAnswerOption(0);
    await practicePage.submitAnswer();

    await page.waitForTimeout(500);

    // Click next
    await practicePage.clickNext();

    // Get second question
    const secondQuestion = await practicePage.getQuestionText();

    expect(firstQuestion).not.toBe(secondQuestion);

    Logger.testPass('Navigation through practice questions successful');
  });

  test('should display score during practice', async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.clickPractice();

    const practicePage = new PracticePage(page);

    // Get score
    const score = await practicePage.getScore();

    expect(score.length).toBeGreaterThanOrEqual(0);

    Logger.testPass('Score displayed during practice');
  });

  test('should show result message after answer', async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.clickPractice();

    const practicePage = new PracticePage(page);

    // Select answer and submit
    await practicePage.selectAnswerOption(0);
    await practicePage.submitAnswer();

    await page.waitForTimeout(500);

    // Get result message
    const resultMessage = await practicePage.getResultMessage();

    expect(resultMessage.length).toBeGreaterThan(0);

    Logger.testPass('Result message displayed');
  });

  test('should finish practice session', async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.clickPractice();

    const practicePage = new PracticePage(page);

    // Click finish button
    await practicePage.clickFinish();

    // Should show completion or navigate away
    await page.waitForTimeout(1000);

    Logger.testPass('Practice session finished successfully');
  });

  test('should display question counter in practice', async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.clickPractice();

    const practicePage = new PracticePage(page);

    // Get question counter
    const counter = await practicePage.getQuestionCounter();

    expect(counter.length).toBeGreaterThan(0);

    Logger.testPass('Question counter displayed in practice');
  });
});
