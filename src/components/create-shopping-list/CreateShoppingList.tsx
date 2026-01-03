import PageContent from "../shared/PageContent";
import Pagination from "../shared/table/Pagination";
import SearchInput from "../shared/table/SearchInput";
import CreationButtons from "./CreationButtons";
import CreationTable from "./CreationTable";
import type { Recipe } from "@shopping-list-project/sl-api-models";
import type { CreationTableRow } from "../../models/tableModels";
import { useGetRecipes } from "../../api-hooks/useGetRecipes";

function CreateShoppingList() {

    const {recipes} = useGetRecipes();
  
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