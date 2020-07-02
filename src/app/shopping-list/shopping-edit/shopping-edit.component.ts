import { v4 as uuidv4 } from "uuid";
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  shoppingEditForm: FormGroup;
  subscription: Subscription;
  editMode = false;
  editItemId: string;
  editItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    this.shoppingEditForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      amount: new FormControl("", [Validators.required]),
    });

    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (ingredientId: string) => {
        this.editMode = true;
        this.editItemId = ingredientId;
        this.editItem = this.shoppingListService.getIngredient(ingredientId);

        this.shoppingEditForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount,
        });
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddItem() {
    if (this.shoppingEditForm.invalid) {
      return;
    }

    const ingName = this.shoppingEditForm.value.name;
    const ingAmount = this.shoppingEditForm.value.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editItemId, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }

    this.onResetForm();
  }

  onDeleteItem() {
    this.shoppingListService.deleteIngredient(this.editItemId);

    this.onResetForm();
  }

  onResetForm() {
    this.editMode = false;
    this.shoppingEditForm.reset();
  }
}
