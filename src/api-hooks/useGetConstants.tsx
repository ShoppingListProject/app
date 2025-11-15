import { useState, useEffect } from "react";
import { getCategories } from "./fetch-functions/categories";
import { getUnits } from "./fetch-functions/units";

export function useGetConstants() {

  const [categories, setCategories] = useState<string[]>([]);
  const [units, setUnits] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {

      const [categoriesData, unitsData] = await Promise.all([
        getCategories(),
        getUnits(),
      ]);

      setCategories(categoriesData);
      setUnits(unitsData);

    }

    fetchData();
  }, []);

  return { categories, units };
}