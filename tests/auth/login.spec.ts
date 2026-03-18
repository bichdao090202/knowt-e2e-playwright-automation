import { test, expect } from '@playwright/test';
import { TEST_USERS } from '../../constants/config';
import { LandingPage } from '../../pages/landing.page';
import { BasePage } from '../../pages/base.page';

test.describe('Authentication Tests', () => {
    let landingPage: LandingPage;
    
    test.beforeEach(async ({ page }) => {
        const basePage = new BasePage(page);
        landingPage = await basePage.navigateToLandingPage();
    });

    test('should successfully login with valid credentials', async () => {
        const loginModal = await landingPage.clickLogin();
        await loginModal.login(TEST_USERS.validUser.email, TEST_USERS.validUser.password); 
    });

});