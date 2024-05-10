import { Entity } from "./entity.ts";

export class Flashcard extends Entity {
  main: string = "";
  sub: string = "";
  back: string = "";
  doRemember: boolean = false;
  rememberedInARow: number = 0;

  constructor() {
    super();
  }
}
