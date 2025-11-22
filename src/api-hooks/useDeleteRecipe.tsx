import type { Recipe } from "@shopping-list-project/sl-api-models";
import { useState } from "react";
import { deleteRecipe } from "./fetch-functions/receipes";

function useDeleteRecipe() {
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function removeRecipe(recipeId: string): Promise<Recipe | null> {
    
    try {
      setLoading(true);
      setError(null);
      
      return deleteRecipe(recipeId);
      
    } catch(err: any) {

      console.error(err);
      setError(err.message);
      
      return null;

    } finally {
      setLoading(false);
    }
  }

  return { removeRecipe, error, loading }
}

export default useDeleteRecipe;