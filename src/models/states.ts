import type { Recipe, ShoppingList } from "@shopping-list-project/sl-api-models"

export interface shoppingListState {
  currentOpenList: ShoppingList | null
  doesCurrentOpenListExist: boolean | null
}

export interface recipeState {
  currentOpenRecipe: Recipe | null
  doesCurrentOpenRecipeExist: boolean | null
}

