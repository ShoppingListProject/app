import { useState, useEffect } from "react";
import { getPublicRecipes } from "./fetch-functions/receipes";
import type { Recipe } from "@shopping-list-project/sl-api-models";

export function useFetchRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const recipesData = await getPublicRecipes();
        setRecipes(recipesData);

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