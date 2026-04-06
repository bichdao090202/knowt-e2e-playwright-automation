import { test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';

test.use({ storageState: "storageState.json" });

test.describe('Verify collection work correctly in learn mode', () => {

  test('Verify collection work correctly in learn mode with flashcards', async ({page}) => {
    const homePage = new HomePage(page);
    await homePage.open();
    const materialsPage = await homePage.dashboardSidebar().clickMaterials();
    const viewCollectionPage = await materialsPage.clickCollectionByIndex(0);

    const flashcards = await viewCollectionPage.getListCard();
    console.log(flashcards);
    const learnPage = await viewCollectionPage.clickLearnButton();

    // await learnPage.resetSetting();
    await learnPage.setToggleByLabel('Flashcards', true);
    await learnPage.setToggleByLabel('Multiple Choice', false);
    await learnPage.setToggleByLabel('Written', false);
    await learnPage.setToggleByLabel('True & False', false);
    await learnPage.clickStartButton();
    learnPage.page.pause();
  });
});
