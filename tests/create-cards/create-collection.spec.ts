import { CreateFlashcardFromScratchPage } from './../../pages/create-flashcard-from-scratch.page';
import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { mapToDeck } from '../../factories/deck.mapper';
import deckData from '../../test-data/deck1.json';

test.describe('Create collection Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    // homePage = await login(page);
    homePage = new HomePage(page);
    await homePage.goto('https://knowt.com/flashcards/ad6eadd3-6e45-48c1-a478-932761eb2ce0/edit');
  });

  test('create a new deck with many cards', async () => {
    // const materialsPage = await homePage.dashboardSidebar().clickMaterials();
    //  const createFlashcardModel = await materialsPage.clickCreateButton();
    // const createFlashcardFromScratchPage = await createFlashcardModel.gotoCreateFlashcard();
    const createFlashcardFromScratchPage = new CreateFlashcardFromScratchPage(homePage.page);
    const deck = mapToDeck(deckData);
    await createFlashcardFromScratchPage.createDeck(deck);
  });

  //should search for a deck in library
  //should open a deck and view cards
  //should display card count
});
