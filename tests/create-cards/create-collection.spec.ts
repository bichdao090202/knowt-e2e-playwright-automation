import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { mapToDeck } from '../../factories/deck.mapper';
import deckData from '../../test-data/deck1.json';

test.use({ storageState: "storageState.json" });

test.describe('Create collection Tests', () => {

  test('create a new deck with many cards', async ({ page }) => {
    const deck = mapToDeck(deckData);
    const homePage = new HomePage(page);
    await homePage.open();
    const materialsPage = await homePage.dashboardSidebar().clickMaterials();
    const createFlashcardModel = await materialsPage.clickCreateButton();
    const createFlashcardFromScratchPage = await createFlashcardModel.gotoCreateFlashcard();
    await createFlashcardFromScratchPage.createDeck(deck);
  });

  //should search for a deck in library
  //should open a deck and view cards
  //should display card count
});
