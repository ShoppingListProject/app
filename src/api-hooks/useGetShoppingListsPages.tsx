import { useState, useEffect } from "react";
import type { NumberOfPages } from "@shopping-list-project/sl-api-models";
import { getPages } from "./fetch-functions/shoppingList";
import { itemsPerPage } from "./useGetShoppingLists";

export function useGetShoppingListsPages() {
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function getNumberOfPages() {
    try {
      
      const objectWithNumberOfPages: NumberOfPages = await getPages(itemsPerPage);
      let numberOfPagesFromServer= objectWithNumberOfPages.numberOfPages;

      if(numberOfPages === 0) 
        setNumberOfPages(1);
      else
        setNumberOfPages(numberOfPagesFromServer);

    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getNumberOfPages();
  }, []);

  return { numberOfPages, getNumberOfPages, loading, error };
}