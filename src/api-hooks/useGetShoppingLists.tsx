import { useState, useEffect } from "react";
import type { ShoppingList } from "@shopping-list-project/sl-api-models";
import { getShoppingLists } from "./fetch-functions/shoppingList";

export function useGetShoppingLists() {
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function retrieveShoppingLists() {
    try {
      
      const shoppingLists = await getShoppingLists();
      setShoppingLists(shoppingLists);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {

    retrieveShoppingLists();
  }, []);

  return { shoppingLists, retrieveShoppingLists, loading, error };
}