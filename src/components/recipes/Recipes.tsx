import { useEffect, useState } from "react";
import PageContent from "../shared/PageContent";
import Pagination from "../shared/table/Pagination";
import SearchInput from "../shared/table/SearchInput";
import Table from "../shared/table/Table";
import type { Recipe } from "../../models/shoppingList";
import { getRecipes } from "../../api/receipes";
import type { TableRow } from "../../models/tableModels";

function Recipes() {

  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect( () => {
    getRecipes()
      .then(setRecipes)
      .catch( err => console.log(err) )

  }, [])

 function convertRecipesToTableRows(recipes: Recipe[]): TableRow[] {

  console.log("recipes input:", recipes);
  console.log("Type of recipes:", typeof recipes);
  console.log("Is array?", Array.isArray(recipes));
    
    return recipes.map( (recipe) => {

      const creationDate = new Date(recipe.createdAt).toLocaleDateString();

      return {
        id: recipe.name,
        name: recipe.name,
        createdAt: creationDate
      }

    })
  }

  return (
    <PageContent title="Recipes">

      <SearchInput placeholder="Spaghetti" />
      <Table headerName="Recipe Name" rows={convertRecipesToTableRows(recipes)} />
      <Pagination/>

    </PageContent>
  );
}

export default Recipes;