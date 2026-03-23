import { Flashcard } from "./flashcard";

export class Deck {
  constructor(
    public title: string,
    public description: string,
    public flashcards: Flashcard[] = []
  ) {}

  addFlashcard(term: string, definition: string) {
    this.flashcards.push(new Flashcard(term, definition));
  }
  
}

// export interface IDeck {
//   id: string;
//   name: string;
//   description?: string;
// }

// export class Deck implements IDeck {
//   id: string;
//   name: string;
//   description?: string;

//   constructor(data: IDeck) {
//     this.id = data.id;
//     this.name = data.name;
//     this.description = data.description;
//   }

// }
