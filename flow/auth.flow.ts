import { Page } from "@playwright/test";
import { BasePage } from "../pages/base.page";
import { HomePage } from "../pages/home.page";

export async function login(page: Page, email: string, password: string): Promise<HomePage> {
    const basePage = new BasePage(page);
    const landingPage = await basePage.navigateToLandingPage();
    const loginModal = await landingPage.clickLogin();
    return await loginModal.login(email, password);
}