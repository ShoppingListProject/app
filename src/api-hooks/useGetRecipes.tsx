import { useState, useEffect } from "react";
import { getPublicRecipes, getRecipesForUser } from "./fetch-functions/receipes";
import type { Recipe } from "@shopping-list-project/sl-api-models";

export function useGetRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {

        const [publicRecipes, userRecipes] = await Promise.all([
          getPublicRecipes(),
          getRecipesForUser(),
        ]);

        const allRecipes = publicRecipes.concat(userRecipes)
        setRecipes(allRecipes);

      } catch (err: any) {
        console.error(err);
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { recipes, loading, error };
}