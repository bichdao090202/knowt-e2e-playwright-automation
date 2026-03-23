import { TEST_USERS } from '../../constants/config';
import { LandingPage } from '../../pages/landing.page';
import { test as setup } from '@playwright/test';

setup('login and save state', async ({ page }) => {
    const landingPage = new LandingPage(page);
    await landingPage.open();
    const loginModal = await landingPage.clickLogin();
    await loginModal.login(TEST_USERS.validUser.email, TEST_USERS.validUser.password);
    await page.waitForURL('**/home');
    await page.context().storageState({ path: 'storageState.json' });
});