import type { ShoppingList } from "@shopping-list-project/sl-api-models";
import { useState } from "react";
import { deleteShoppingList } from "./fetch-functions/shoppingList";

function useDeleteShoppingList() {
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function removeShoppingList(recipeId: string): Promise<ShoppingList | null> {
    
    try {
      setLoading(true);
      setError(null);
      
      return deleteShoppingList(recipeId);
      
    } catch(err: any) {

      console.error(err);
      setError(err.message);
      
      return null;

    } finally {
      setLoading(false);
    }
  }

  return { removeShoppingList, error, loading }
}

export default useDeleteShoppingList;