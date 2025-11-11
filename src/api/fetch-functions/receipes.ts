import type { Recipe, RecipeBase } from "@shopping-list-project/sl-api-models";
import { fetchWrapper, host } from "../utils/fetchWrapper";
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

export async function createNewRecipe(newRecipe: RecipeBase): Promise<Recipe> {
  const url = host + path + mocks.userId;

  return fetchWrapper<Recipe>({url});
}