import { v4 as uuidv4 } from "uuid";

export class Ingredient {
  id: string = uuidv4();

  constructor(public name: string, public amount: number) {}
}
