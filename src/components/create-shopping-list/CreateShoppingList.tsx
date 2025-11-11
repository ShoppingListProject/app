import { useEffect, useState } from "react";
import PageContent from "../shared/PageContent";
import Pagination from "../shared/table/Pagination";
import SearchInput from "../shared/table/SearchInput";
import CreationButtons from "./CreationButtons";
import CreationTable from "./CreationTable";
import type { Recipe } from "@shopping-list-project/sl-api-models";
import { getPublicRecipes } from "../../api/receipes";
import type { CreationTableRow } from "../../models/tableModels";

function CreateShoppingList() {

    const [recipes, setRecipes] = useState<Recipe[]>([]);
  
    useEffect( () => {
      getPublicRecipes()
        .then(setRecipes)
        .catch( err => console.error(err) )
  
    }, [])
  
   function convertRecipesToTableRows(recipes: Recipe[]): CreationTableRow[] {
      
      return recipes.map( (recipe) => {
        return {
          id: recipe.recipeId,
          name: recipe.name,
        }
      })
    }

  return (
    <PageContent title="Create Shopping List">

      <SearchInput placeholder="Spaghetti"/>
      <CreationTable rows={convertRecipesToTableRows(recipes)}/>
      <Pagination />
      <CreationButtons />

    </PageContent>
  )
}

export default CreateShoppingList;