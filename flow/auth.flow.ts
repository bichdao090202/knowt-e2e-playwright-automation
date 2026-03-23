import { Page } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LandingPage } from '../pages/landing.page';
import { TEST_USERS } from "../constants/config";

export async function login(page: Page, email?: string, password?: string): Promise<HomePage> {
    const finalEmail = email ?? TEST_USERS.validUser.email;
    const finalPassword = password ?? TEST_USERS.validUser.password;

    const landingPage = new LandingPage(page);
    await landingPage.open();

    const loginModal = await landingPage.clickLogin();
    return await loginModal.login(finalEmail, finalPassword);
}