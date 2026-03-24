import { Page, Locator } from '@playwright/test';
import { Flashcard } from '../models/flashcard';
import { LearnPage } from './learn.page';

export class ViewCollectionPage {
    readonly page: Page;
    readonly cardLabel: Locator;
    readonly countCardLabel: Locator;
    readonly learnButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cardLabel = this.page.locator('.ProseMirror');
        this.countCardLabel = this.page.locator('.new_heading5');
        this.learnButton = this.page.getByText('Learn', { exact: true }).first();
    }

    async getListCard(): Promise<Flashcard[]> {
        const text = await this.countCardLabel.innerText();
        const count = parseInt(text.match(/\d+/)?.[0] || '0', 10);

        const flashcards: Flashcard[] = [];

        for (let i = 0; i < count; i++) {
            const cardTerm = await this.getCardTextByIndex(i * 2 );
            const cardDefine = await this.getCardTextByIndex(i * 2 + 1);

            const flashcard = Flashcard.create(
                cardTerm ?? '',
                cardDefine ?? ''
            );
            flashcards.push(flashcard);
        }

        return flashcards;
    }

    async getCardTextByIndex(index: number) {
        const card = this.cardLabel.nth(index);
        return await card.textContent();
    }

    async clickLearnButton() {
        await this.countCardLabel.waitFor({ state: 'visible' });
        await this.learnButton.click();
        return new LearnPage(this.page);
    }

}
