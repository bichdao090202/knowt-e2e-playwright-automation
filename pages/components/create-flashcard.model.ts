import { Locator, Page } from "@playwright/test";
import { CreateFlashcardFromScratchPage } from "../create-flashcard-from-scratch.page";

export class CreateFlashcardModel {
    readonly page: Page;
    readonly createFromScratch: Locator;
    readonly importManually: Locator;

    constructor(page: Page) {
        this.page = page;
        this.createFromScratch = page.getByText('Create from scratch', { exact: true });
        this.importManually = page.getByText('Import manually', { exact: true });
    }

    async gotoCreateFlashcard() {
        await this.createFromScratch.click();
        return new CreateFlashcardFromScratchPage(this.page);
    }


}
