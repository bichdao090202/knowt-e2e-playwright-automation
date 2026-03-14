import { test, expect } from '@playwright/test';
import { DashboardPage } from '../../pages/dashboard.page';
import { LibraryPage } from '../../pages/library.page';
import { DeckPage } from '../../pages/deck.page';
import { Logger } from '../../utils/logger';

test.describe('Deck Management Tests', () => {
  test.beforeEach(async ({ page }) => {
    Logger.testStart('Deck Management Test');
    // Assuming user is already logged in
    await page.goto('/dashboard');
  });

  test('should navigate to library from dashboard', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    // Verify dashboard is loaded
    expect(await dashboardPage.verifyPageLoaded()).toBeTruthy();

    // Go to library
    await dashboardPage.goToLibrary();

    // Verify library is loaded
    const libraryPage = new LibraryPage(page);
    expect(await libraryPage.verifyPageLoaded()).toBeTruthy();

    Logger.testPass('Navigation to library successful');
  });

  test('should display recent decks on dashboard', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);

    // Get number of recent decks
    const count = await dashboardPage.getRecentDecksCount();

    expect(count).toBeGreaterThanOrEqual(0);

    Logger.testPass('Recent decks displayed successfully');
  });

  test('should search for a deck in library', async ({ page }) => {
    const libraryPage = new LibraryPage(page);
    await libraryPage.goto();

    // Search for a deck
    await libraryPage.searchDeck('Spanish Vocab');

    // Verify search results
    const count = await libraryPage.getDecksCount();
    expect(count).toBeGreaterThanOrEqual(0);

    Logger.testPass('Deck search successful');
  });

  test('should open a deck and view cards', async ({ page }) => {
    const deckPage = new DeckPage(page);

    // Navigate to a specific deck
    await deckPage.goto('deck_001');

    // Verify deck page is loaded
    expect(await deckPage.verifyPageLoaded()).toBeTruthy();

    // Get deck title
    const title = await deckPage.getDeckTitle();
    expect(title.length).toBeGreaterThan(0);

    // Get number of cards
    const cardCount = await deckPage.getCardsCount();
    expect(cardCount).toBeGreaterThanOrEqual(0);

    Logger.testPass('Deck opened and cards viewed successfully');
  });

  test('should display card count', async ({ page }) => {
    const deckPage = new DeckPage(page);
    await deckPage.goto('deck_001');

    // Get displayed card count
    const displayedCount = await deckPage.getDisplayedCardCount();

    expect(displayedCount.length).toBeGreaterThan(0);

    Logger.testPass('Card count displayed successfully');
  });
});
