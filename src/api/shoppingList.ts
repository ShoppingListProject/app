import mocks from "../mocks/mocks";
import type { ShoppingList } from "@shopping-list-project/sl-api-models";
import { fetchWrapper, host } from "./utils/fetchWrapper";

const path = "shoppingLists/";

export async function getShoppingLists(): Promise<ShoppingList[]> {
  
  const url = host + path + mocks.userId;
  return fetchWrapper<ShoppingList[]>({url})
}