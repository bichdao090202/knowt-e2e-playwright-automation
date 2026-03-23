import { test, expect } from '@playwright/test';
import { TEST_USERS } from '../../constants/config';
import { LandingPage } from '../../pages/landing.page';
import { LoginModal } from '../../pages/components/login.modal';

test.describe('Authentication Tests', () => {
    let loginModal: LoginModal;

    test.beforeEach(async ({ page }) => {
        const landingPage = new LandingPage(page);
        await landingPage.open();
        loginModal = await landingPage.clickLogin();
    });

    test('should successfully login with valid credentials', async () => {
        await loginModal.login(TEST_USERS.validUser.email, TEST_USERS.validUser.password);
    });
});