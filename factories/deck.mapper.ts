import { Deck } from "../models/deck";
import { Flashcard } from "../models/flashcard";


export function mapToDeck(data: any): Deck {
  return new Deck(
    data.title,
    data.description,
    data.cards.map(
      (f: any) => new Flashcard(f.term, f.definition)
    )
  );
}