import { useState, useEffect } from "react";
import type { ShoppingList } from "@shopping-list-project/sl-api-models";
import { getShoppingLists } from "./fetch-functions/shoppingList";

export const itemsPerPage = 3;

export function useGetShoppingLists() {
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function retrieveShoppingLists(
    offset: number,
    querySearch?: string
  ) {
    try {
      
      const shoppingLists = await getShoppingLists(offset, itemsPerPage, querySearch);
      setShoppingLists(shoppingLists);

    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    retrieveShoppingLists(0);
  }, []);

  return { shoppingLists, retrieveShoppingLists, loading, error };
}