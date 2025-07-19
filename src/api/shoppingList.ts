import type { ShoppingList } from "../models/shoppingList";
import { fetchWrapper, host } from "./utils/fetchWrapper";

const path = "shoppingLists/";
const url = host + path;

export async function getShoppingLists(): Promise<ShoppingList[]> {
  return fetchWrapper<ShoppingList[]>({url})
}