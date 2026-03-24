import { Locator, Page } from "@playwright/test";
import { CreateFlashcardModel } from './components/create-flashcard.model';
import { ViewCollectionPage } from "./view-collection.page";

export class MaterialsPage {
    readonly page: Page;
    readonly createButton: Locator;
    readonly cards: Locator;

    constructor(page: Page) {
        this.page = page;
        this.createButton = page.getByRole('button', { name: 'Create' });
        this.cards = page.locator('[data-testid="notebook-card"]');

    }

    async clickCollectionByIndex(index: number) {
        const card = this.cards.nth(index);
        await card.scrollIntoViewIfNeeded();
        await card.click();
        return new ViewCollectionPage(this.page);
    }

    async clickCreateButton() {
        await this.cards.first().waitFor();
        await this.createButton.click();
        return new CreateFlashcardModel(this.page);
    }

}