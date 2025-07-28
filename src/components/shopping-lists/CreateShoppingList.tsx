import { useEffect, useState } from "react";
import PageContent from "../shared/PageContent";
import Pagination from "../shared/table/Pagination";
import SearchInput from "../shared/table/SearchInput";
import CreationButtons from "./create-shopping-list/CreationButtons";
import CreationTable from "./create-shopping-list/CreationTable";
import type { Recipe } from "../../models/shoppingList";
import { getRecipes } from "../../api/receipes";
import type { CreationTableRow } from "../../models/tableModels";

function CreateShoppingList() {

    const [recipes, setRecipes] = useState<Recipe[]>([]);
  
    useEffect( () => {
      getRecipes()
        .then(setRecipes)
        .catch( err => console.error(err) )
  
    }, [])
  
   function convertRecipesToTableRows(recipes: Recipe[]): CreationTableRow[] {
      
      return recipes.map( (recipe) => {
        return {
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