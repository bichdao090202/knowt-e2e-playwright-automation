import { CreateFlashcardFromScratchPage } from '../../pages/create-flashcard-from-scratch.page';
import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { ViewCollectionPage } from '../../pages/view-collection.page';
import { LearnPage } from '../../pages/learn.page';
import { Flashcard } from '../../models/flashcard';

const flashcards: Flashcard[] = [
    new Flashcard(
        'What is the capital of France?',
        'The capital of France is Paris.'
    ),
    new Flashcard(
        'What is the largest planet in our solar system?',
        'The largest planet in our solar system is Jupiter.'
    ),
    new Flashcard(
        "Who wrote 'To Kill a Mockingbird'?",
        "'To Kill a Mockingbird' was written by Harper Lee."
    ),
    new Flashcard(
        'What is the chemical symbol for water?',
        'The chemical symbol for water is H2O.'
    ),
];

test.describe('Verify collection work correctly in learn mode', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    // homePage = await login(page);
    homePage = new HomePage(page);
    // await homePage.goto('https://knowt.com/flashcards/599b0de2-97f0-4882-9e42-a45b37309db9');
    await homePage.goto('https://knowt.com/study/flashcards/599b0de2-97f0-4882-9e42-a45b37309db9/learn');
  });

  test('Verify collection work correctly in learn mode with flashcards', async () => {
    // const materialsPage = await homePage.dashboardSidebar().clickMaterials();
    // const viewCollectionPage = await materialsPage.clickCollectionByIndex(0);

    // const viewCollectionPage = new ViewCollectionPage(homePage.page);
    // const flashcards = await viewCollectionPage.getListCard();
    // console.log(flashcards);
    // const learnPage = await viewCollectionPage.clickLearnButton();

    const learnPage = new LearnPage(homePage.page);
    // await learnPage.setToggleByLabel('Flashcards', true);
    // await learnPage.setToggleByLabel('Multiple Choice', false);
    // await learnPage.setToggleByLabel('Written', false);
    // await learnPage.setToggleByLabel('True & False', false);
    // await learnPage.clickStartButton();
    console.log(flashcards);
    learnPage.page.pause();
  });
});
