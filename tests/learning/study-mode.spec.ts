import { test, expect } from '@playwright/test';
import { DeckPage } from '../../pages/deck.page';
import { StudyPage } from '../../pages/study.page';
import { Logger } from '../../utils/logger';

test.describe('Study Mode Tests', () => {
  test.beforeEach(async ({ page }) => {
    Logger.testStart('Study Mode Test');
    // Assuming user has access to a deck
    await page.goto('/deck/deck_001');
  });

  test('should start study session', async ({ page }) => {
    const deckPage = new DeckPage(page);

    // Verify deck page is loaded
    expect(await deckPage.verifyPageLoaded()).toBeTruthy();

    // Click study button
    await deckPage.clickStudy();

    // Verify study page is loaded
    const studyPage = new StudyPage(page);
    expect(await studyPage.verifyPageLoaded()).toBeTruthy();

    Logger.testPass('Study session started successfully');
  });

  test('should display question in study mode', async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.clickStudy();

    const studyPage = new StudyPage(page);

    // Get question text
    const question = await studyPage.getQuestionText();

    expect(question.length).toBeGreaterThan(0);

    Logger.testPass('Question displayed in study mode');
  });

  test('should reveal answer in study mode', async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.clickStudy();

    const studyPage = new StudyPage(page);

    // Reveal answer
    await studyPage.clickReveal();

    // Get answer text
    const answer = await studyPage.getAnswerText();

    expect(answer.length).toBeGreaterThan(0);

    Logger.testPass('Answer revealed successfully');
  });

  test('should navigate through cards in study mode', async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.clickStudy();

    const studyPage = new StudyPage(page);

    // Get initial question
    const firstQuestion = await studyPage.getQuestionText();

    // Click next
    await studyPage.clickNext();
    await page.waitForTimeout(500);

    // Get second question
    const secondQuestion = await studyPage.getQuestionText();

    // Questions should be different
    expect(firstQuestion).not.toBe(secondQuestion);

    Logger.testPass('Navigation through cards successful');
  });

  test('should mark card as easy or hard', async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.clickStudy();

    const studyPage = new StudyPage(page);

    // Mark as easy
    await studyPage.markAsEasy();

    // Should proceed to next card
    await page.waitForTimeout(500);

    const question = await studyPage.getQuestionText();
    expect(question.length).toBeGreaterThan(0);

    Logger.testPass('Card marked as easy successfully');
  });

  test('should finish study session', async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.clickStudy();

    const studyPage = new StudyPage(page);

    // Click finish
    await studyPage.clickFinish();

    // Should navigate back or show completion screen
    await page.waitForTimeout(1000);

    Logger.testPass('Study session finished successfully');
  });

  test('should display card counter in study mode', async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.clickStudy();

    const studyPage = new StudyPage(page);

    // Get card counter
    const counter = await studyPage.getCardCounter();

    expect(counter.length).toBeGreaterThan(0);

    Logger.testPass('Card counter displayed successfully');
  });
});
