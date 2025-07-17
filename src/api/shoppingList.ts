import type { ShoppingList } from "../models/shoppingList";
import { fetchWrapper, host } from "./utils/fetchWrapper";

const path = "shoppingLists";

export async function getShoppingLists(): Promise<ShoppingList[]> {

  const url = host + path;

  return fetchWrapper<ShoppingList[]>({url})
}