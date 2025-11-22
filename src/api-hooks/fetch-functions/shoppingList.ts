import mocks from "../../mocks/mocks";
import type { ShoppingList, ShoppingListCreate, ShoppingListUpdate } from "@shopping-list-project/sl-api-models";
import { fetchWrapper, host } from "./utils/fetchWrapper";

const path = "shoppingLists/";

export async function getShoppingLists(): Promise<ShoppingList[]> {
  
  const url = host + path + mocks.userId;
  return fetchWrapper<ShoppingList[]>({url})
}

export async function createNewShoppingList(newShoppingList: ShoppingListCreate): Promise<ShoppingList> {

  const url = host + path + mocks.userId;
  const method = "POST";
  const data = newShoppingList;

  return fetchWrapper<ShoppingList>({url, method, data});
}

export async function updateExistingShoppingList(shoppingList: ShoppingListUpdate): Promise<ShoppingList> {
  
  const url = host + path + mocks.userId + "/" + shoppingList.shoppingListId;
  const method = "PUT";
  const data = shoppingList;

  return fetchWrapper<ShoppingList>({url, method, data});
}

export async function deleteShoppingList(shoppingListId: string): Promise<ShoppingList> {
  
  const url = host + path + mocks.userId + "/" + shoppingListId;
  const method = "DELETE";

  return fetchWrapper<ShoppingList>({url, method});
}