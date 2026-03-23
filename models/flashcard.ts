export class Flashcard {
    term: string;
    definition: string;

    constructor(term: string, definition: string) {
        this.term = term;
        this.definition = definition;
    }

    static create(term: string, definition: string): Flashcard {
        return new Flashcard(term, definition);
    }

    toJSON() {
        return {
            term: this.term,
            definition: this.definition,
        };
    }
}