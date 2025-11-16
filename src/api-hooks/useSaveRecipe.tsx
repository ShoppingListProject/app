import type { Recipe, RecipeCreate, RecipeUpdate } from "@shopping-list-project/sl-api-models";
import { useState } from "react";
import { createNewRecipe, updateExistingRecipe } from "./fetch-functions/receipes";

function useSaveRecipe() {
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function saveExistingRecipe(recipe: RecipeUpdate): Promise<Recipe | null> {
    
    try {
      setLoading(true);
      setError(null);
      
      return updateExistingRecipe(recipe);
      
    } catch(err: any) {

      console.error(err);
      setError(err.message || "Failed to load data");
      
      return null;

    } finally {
      setLoading(false);
    }
  }

  async function saveNewRecipe(newRecipe: RecipeCreate): Promise<Recipe | null> {
    
    try {
      setLoading(true);
      setError(null);
      
      return createNewRecipe(newRecipe);
      
    } catch(err: any) {

      console.error(err);
      setError(err.message || "Failed to load data");
      
      return null;

    } finally {
      setLoading(false);
    }
  }

  return { saveExistingRecipe, saveNewRecipe, error, loading }
}

export default useSaveRecipe;