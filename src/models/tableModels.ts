import type { Recipe } from "@shopping-list-project/sl-api-models";

export interface TableRow {
  id: string;
  name: string;
  createdAt: string;
}

export interface CreationTableRow {
  recipe: Recipe
  recipeCounter: number;
}