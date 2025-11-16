import type { Recipe, RecipeCreate, RecipeUpdate } from "@shopping-list-project/sl-api-models";
import { fetchWrapper, host } from "./utils/fetchWrapper";
import mocks from "../../mocks/mocks";

const path = "recipes/";

export async function getRecipesForUser(): Promise<Recipe[]> {

  const url = host + path + mocks.userId;
  return fetchWrapper<Recipe[]>({url})
}

export async function getPublicRecipes(): Promise<Recipe[]> {
  const url = host + path + "publicRecipes";
  
  return fetchWrapper<Recipe[]>({url})
}

export async function createNewRecipe(newRecipe: RecipeCreate): Promise<Recipe> {
  const url = host + path + mocks.userId;
  const method = "POST";
  const data = newRecipe;

  return fetchWrapper<Recipe>({url, method, data});
}

export async function updateExistingRecipe(recipe: RecipeUpdate): Promise<Recipe> {
  const url = host + path + mocks.userId + "/" + recipe.recipeId;
  const method = "PUT";

  return fetchWrapper<Recipe>({url, method});
}