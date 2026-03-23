import { expect, Locator, Page } from "@playwright/test";
import { Deck } from "../models/deck";
import { Flashcard } from '../models/flashcard';

export class CreateFlashcardFromScratchPage {
    readonly page: Page;
    readonly deckTitleInput: Locator;
    readonly deckDescriptionInput: Locator;
    readonly addCardButton: Locator;
    readonly saveAndCreateButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.deckTitleInput = this.page.getByRole('textbox', { name: 'Enter a title, like “Chemistry”' });
        this.deckDescriptionInput = this.page.getByRole('textbox', { name: 'Add description' });
        this.addCardButton = this.page.getByText('Add card(s)', { exact: true }).first();
        this.saveAndCreateButton = this.page.getByRole('button', { name: 'Save & Create' }).first();
    }

    cardItemByIndex(index: number) {
        return this.page.locator(`[data-index="${index}"]`);
    }

    async createDeck(deck: Deck) {
        await this.deckTitleInput.fill(deck.title);
        await this.deckDescriptionInput.fill(deck.description);
        await this.inputValueForCards(deck.flashcards);
        await this.saveAndCreateButton.click();
    }

    async inputValueForCards(flashcards: Flashcard[]) {
        await expect(this.cardItemByIndex(0)).toBeVisible();
        for (let i = 0; i < flashcards.length; i++) {
            const card = flashcards[i];
            if (i > 4) {
                await this.addCardButton.click();
            }
            await this.enterTextInCard(i, card.term, card.definition);
        }
    }

    async enterTextInCard(index: number, frontText: string, backText: string) {
        const row = this.cardItemByIndex(index);
        const inputs = row.locator('.tiptap.ProseMirror');
        await inputs.nth(0).fill(frontText);
        await inputs.nth(1).fill(backText);
    }
}
