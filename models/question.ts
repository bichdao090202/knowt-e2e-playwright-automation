import { QuestionType, DifficultyLevel } from '../enums/question-types';

export interface IQuestion {
  id: string;
  question: string;
  answer: string;
  type: QuestionType;
  difficulty: DifficultyLevel;
  explanation?: string;
  options?: string[];
  tags?: string[];
}

export class Question implements IQuestion {
  id: string;
  question: string;
  answer: string;
  type: QuestionType;
  difficulty: DifficultyLevel;
  explanation?: string;
  options?: string[];
  tags?: string[];

  constructor(data: IQuestion) {
    this.id = data.id;
    this.question = data.question;
    this.answer = data.answer;
    this.type = data.type;
    this.difficulty = data.difficulty;
    this.explanation = data.explanation;
    this.options = data.options;
    this.tags = data.tags;
  }

  isValid(): boolean {
    return (
      this.question.trim().length > 0 &&
      this.answer.trim().length > 0 &&
      this.id.trim().length > 0
    );
  }

  getDisplayText(): string {
    return `${this.question} (${this.type})`;
  }
}
