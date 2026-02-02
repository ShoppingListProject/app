import type { ShoppingList, ShoppingListCreateFromRecipes } from "@shopping-list-project/sl-api-models";
import { useState } from "react";
import { createNewShoppingListFromRecipes } from "./fetch-functions/shoppingList";

function useCreateShoppingListFromRecipes() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function createShoppingListFromRecipes(
        requestBody: ShoppingListCreateFromRecipes
    ): Promise<ShoppingList | null> {
    
        try {
            setLoading(true);
            setError(null);
            
            return createNewShoppingListFromRecipes(requestBody);
            
        } catch(err: any) {

            console.error(err);
            setError(err.message);
            
            return null;

        } finally {
            setLoading(false);
        }
    }   

    return {loading, error, createShoppingListFromRecipes}
}

export default useCreateShoppingListFromRecipes