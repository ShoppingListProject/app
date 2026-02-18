import mocks from "../../mocks/mocks";
import type { NumberOfPages, ShoppingList, ShoppingListCreate, ShoppingListCreateFromRecipes, ShoppingListUpdate } from "@shopping-list-project/sl-api-models";
import { fetchWrapper, host } from "./utils/fetchWrapper";

const path = "shoppingLists/";

export async function getShoppingLists(
  offset: number,
  limit: number,
  querySearch?: string
): Promise<ShoppingList[]> {

  let queryParams = `?offset=${offset}&limit=${limit}`;

  if(querySearch !== undefined) 
    queryParams+=`&querySearch=${querySearch}`;
  
  const url = host + path + mocks.userId + queryParams;
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

export async function createNewShoppingListFromRecipes(requestBody: ShoppingListCreateFromRecipes) {
  const url = host + path + "fromRecipes/" + mocks.userId;
  const method = "POST";
  const data = requestBody;

  return fetchWrapper<ShoppingList>({url, method, data});
}

export async function getPages(
  itemsPerPage: number,
  querySearch?: string
) {

  let queryParams = `?itemsPerPage=${itemsPerPage}`;

  if(querySearch !== undefined) 
    queryParams+=`&querySearch=${querySearch}`;
  
  const url = host + path + "pages/" + mocks.userId + queryParams;
  return fetchWrapper<NumberOfPages>({url})
}