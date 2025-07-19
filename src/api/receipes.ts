import type { Recipe } from "../models/shoppingList";
import { fetchWrapper, host } from "./utils/fetchWrapper";

const path = "recipes/";
const url = host + path;

export async function getRecipes(): Promise<Recipe[]> {
  return fetchWrapper<Recipe[]>({url})
}