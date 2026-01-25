import { useState, useEffect } from "react";
import { getRecipesForUser } from "./fetch-functions/receipes";
import type { Recipe } from "@shopping-list-project/sl-api-models";

export function useGetRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function getRecipes() {
    try {

      const userRecipes = await getRecipesForUser();
      setRecipes(userRecipes);

    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getRecipes();
  }, []);

  return { recipes, getRecipes, loading, error };
}