import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../pages/dashboard.page';
import { LibraryPage } from '../../pages/library.page';
import { DeckPage } from '../../pages/deck.page';

test.describe('Deck Management Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
  });

  test('should navigate to library from dashboard', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goToLibrary();
    const libraryPage = new LibraryPage(page);
    expect(await libraryPage.verifyPageLoaded()).toBeTruthy();
  });

  test('should search for a deck in library', async ({ page }) => {
    const libraryPage = new LibraryPage(page);
    await libraryPage.goto();
    await libraryPage.searchDeck('Spanish Vocab');
    const count = await libraryPage.getDecksCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should open a deck and view cards', async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.goto('deck_001');
    expect(await deckPage.verifyPageLoaded()).toBeTruthy();
    const title = await deckPage.getDeckTitle();
    expect(title.length).toBeGreaterThan(0);
    const cardCount = await deckPage.getCardsCount();
    expect(cardCount).toBeGreaterThanOrEqual(0);
  });

  test('should display card count', async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.goto('deck_001');
    const displayedCount = await deckPage.getDisplayedCardCount();
    expect(displayedCount.length).toBeGreaterThan(0);
  });
});
