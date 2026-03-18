import { test, expect } from '@playwright/test';
import { DeckPage } from '../../pages/deck.page';
import { StudyPage } from '../../pages/study.page';

test.describe('Study Mode Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/deck/deck_001');
  });

  test('should start study session', async ({ page }) => {
    const deckPage = new DeckPage(page);
    expect(await deckPage.verifyPageLoaded()).toBeTruthy();
    await deckPage.clickStudy();
    const studyPage = new StudyPage(page);
    expect(await studyPage.verifyPageLoaded()).toBeTruthy();
  });

  test('should display question in study mode', async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.clickStudy();
    const studyPage = new StudyPage(page);
    const question = await studyPage.getQuestionText();
    expect(question.length).toBeGreaterThan(0);
  });

  test('should reveal answer in study mode', async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.clickStudy();
    const studyPage = new StudyPage(page);
    await studyPage.clickReveal();
    const answer = await studyPage.getAnswerText();
    expect(answer.length).toBeGreaterThan(0);
  });

  test('should navigate through cards in study mode', async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.clickStudy();
    const studyPage = new StudyPage(page);
    const firstQuestion = await studyPage.getQuestionText();
    await studyPage.clickNext();
    const secondQuestion = await studyPage.getQuestionText();
    expect(firstQuestion).not.toBe(secondQuestion);
  });

  test('should mark card as easy or hard', async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.clickStudy();
    const studyPage = new StudyPage(page);
    await studyPage.markAsEasy();
    const question = await studyPage.getQuestionText();
    expect(question.length).toBeGreaterThan(0);
  });

  test('should finish study session', async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.clickStudy();
    const studyPage = new StudyPage(page);
    await studyPage.clickFinish();
  });

  test('should display card counter in study mode', async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.clickStudy();
    const studyPage = new StudyPage(page);
    const counter = await studyPage.getCardCounter();
    expect(counter.length).toBeGreaterThan(0);
  });
});
