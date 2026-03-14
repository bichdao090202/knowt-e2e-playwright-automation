import { Question, IQuestion } from './question';

export interface IDeck {
  id: string;
  name: string;
  description?: string;
  cards: IQuestion[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class Deck implements IDeck {
  id: string;
  name: string;
  description?: string;
  cards: Question[];
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: IDeck) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.cards = data.cards.map((card) => new Question(card));
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  getCardCount(): number {
    return this.cards.length;
  }

  addCard(card: Question): void {
    this.cards.push(card);
  }

  removeCard(cardId: string): void {
    this.cards = this.cards.filter((card) => card.id !== cardId);
  }

  getCardById(cardId: string): Question | undefined {
    return this.cards.find((card) => card.id === cardId);
  }

  isValid(): boolean {
    return this.name.trim().length > 0 && this.id.trim().length > 0;
  }
}
