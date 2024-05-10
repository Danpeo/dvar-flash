import { Entity } from "./entity.ts";
import { Flashcard } from "./flashcard.ts";

export class FlashcardCollection extends Entity {
  name: string | undefined = "";
  flashcards: Flashcard[] = [];

  constructor() {
    super();
  }
}
