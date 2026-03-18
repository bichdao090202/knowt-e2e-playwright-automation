import { test, expect } from '@playwright/test';
import { DeckPage } from '../../pages/deck.page';
import { PracticePage } from '../../pages/practice.page';

test.describe('Practice Mode Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/deck/deck_001');
  });

  test('should start practice session', async ({ page }) => {
    const deckPage = new DeckPage(page);
    expect(await deckPage.verifyPageLoaded()).toBeTruthy();
    await deckPage.clickPractice();
    const practicePage = new PracticePage(page);
    expect(await practicePage.verifyPageLoaded()).toBeTruthy();
  });

  test('should display question in practice mode', async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.clickPractice();
    const practicePage = new PracticePage(page);
    const question = await practicePage.getQuestionText();
    expect(question.length).toBeGreaterThan(0);
  });

  test('should select answer option', async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.clickPractice();
    const practicePage = new PracticePage(page);
    await practicePage.selectAnswerOption(0);
    await practicePage.submitAnswer();
  });

  test('should navigate through practice questions', async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.clickPractice();
    const practicePage = new PracticePage(page);
    const firstQuestion = await practicePage.getQuestionText();
    await practicePage.selectAnswerOption(0);
    await practicePage.submitAnswer();
    await page.waitForTimeout(500);
    await practicePage.clickNext();
    const secondQuestion = await practicePage.getQuestionText();
    expect(firstQuestion).not.toBe(secondQuestion);
  });

  test('should display score during practice', async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.clickPractice();
    const practicePage = new PracticePage(page);
    const score = await practicePage.getScore();
  });

  test('should show result message after answer', async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.clickPractice();
    const practicePage = new PracticePage(page);
    await practicePage.selectAnswerOption(0);
    await practicePage.submitAnswer();
    await page.waitForTimeout(500);
    const resultMessage = await practicePage.getResultMessage();
  });

  test('should finish practice session', async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.clickPractice();
    const practicePage = new PracticePage(page);
    await practicePage.clickFinish();
  });

  test('should display question counter in practice', async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.clickPractice();
    const practicePage = new PracticePage(page);
    const counter = await practicePage.getQuestionCounter();
    expect(counter.length).toBeGreaterThan(0);
  });;
});
