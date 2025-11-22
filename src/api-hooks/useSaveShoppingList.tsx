import type { ShoppingList, ShoppingListCreate, ShoppingListUpdate } from "@shopping-list-project/sl-api-models";
import { useState } from "react";
import { createNewShoppingList, updateExistingShoppingList } from "./fetch-functions/shoppingList";

function useSaveShoppingList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  async function saveExistingShoppingList(shoppingList: ShoppingListUpdate): Promise<ShoppingList | null> {
    
    try {
      setLoading(true);
      setError(null);
      
      return updateExistingShoppingList(shoppingList);
      
    } catch(err: any) {

      console.error(err);
      setError(err.message);
      
      return null;

    } finally {
      setLoading(false);
    }
  }

  async function saveNewShoppingList(newShoppingList: ShoppingListCreate): Promise<ShoppingList | null> {
    
    try {
      setLoading(true);
      setError(null);
      
      return createNewShoppingList(newShoppingList);
      
    } catch(err: any) {

      console.error(err);
      setError(err.message);
      
      return null;

    } finally {
      setLoading(false);
    }
  }

  return { saveExistingShoppingList, saveNewShoppingList, error, loading }
}

export default useSaveShoppingList;