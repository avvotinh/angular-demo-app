import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<string>();

  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 10),
  ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(ingredientId: string): Ingredient {
    return this.ingredients.find((e) => (e.id = ingredientId));
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(ingredientId: string, newIngredient: Ingredient) {
    let ingredient = this.ingredients.find((e) => (e.id = ingredientId));

    ingredient.amount = newIngredient.amount;
    ingredient.name = newIngredient.name;

    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(ingredientId: string) {
    this.ingredients = this.ingredients.filter((e) => e.id !== ingredientId);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
