import PageContent from "../shared/PageContent";
import Pagination from "../shared/table/Pagination";
import SearchInput from "../shared/table/SearchInput";
import CreationButtons from "./CreationButtons";
import CreationTable from "./CreationTable";
import type { Recipe } from "@shopping-list-project/sl-api-models";
import type { CreationTableRow } from "../../models/tableModels";
import { useGetRecipes } from "../../api-hooks/useGetRecipes";
import { useState } from "react";

export interface RecipeWithNumber {
  recipeId: string;
  number: number;
}

function CreateShoppingList() {

  const {recipes} = useGetRecipes();
  const [selectedRecipesWithNumbers, setSelectedRecipesWithNumbers] = useState<RecipeWithNumber[]>([]);
  
  function convertRecipesToTableRows(
    recipes: Recipe[], 
    selectedRecipesWithNumbers: RecipeWithNumber[]
  ): CreationTableRow[] {
    
    return recipes.map( (recipe) => {

      const optionalRecipeCounter: RecipeWithNumber | undefined = selectedRecipesWithNumbers.find( recipeWithNumber =>
        recipeWithNumber.recipeId === recipe.recipeId
      );

      return {
        recipeId: recipe.recipeId,
        recipeName: recipe.name,
        recipeCounter: optionalRecipeCounter ? optionalRecipeCounter.number : 0,
      }
    })
  }

  function addRecipe(recipeId: string) {

    setSelectedRecipesWithNumbers( (oldRecipesWithNumbers) => {

      const oldRecipeWithNumber: RecipeWithNumber | undefined = oldRecipesWithNumbers.find( recipeWithNumber => 
        recipeWithNumber.recipeId === recipeId
      )

      if (oldRecipeWithNumber !== undefined) {

        const newRecipeWithNumber: RecipeWithNumber = {...oldRecipeWithNumber}
        newRecipeWithNumber.number = oldRecipeWithNumber.number + 1;

        return oldRecipesWithNumbers.map( recipeWithNumer => {

          if(recipeWithNumer.recipeId === recipeId)
            return newRecipeWithNumber;

          return recipeWithNumer;
        })
      }

      const newRecipeWithNumber: RecipeWithNumber = {
        recipeId,
        number: 1,
      };

      return [...oldRecipesWithNumbers, newRecipeWithNumber];
    });
  }

  function removeRecipe(recipeId: string) {

    setSelectedRecipesWithNumbers( (oldRecipesWithNumbers) => {

      const oldRecipeWithNumber: RecipeWithNumber | undefined = oldRecipesWithNumbers.find( recipeWithNumber => 
        recipeWithNumber.recipeId === recipeId
      );

      if(oldRecipeWithNumber === undefined) {

        // If oldRecipeWithNumber is undefined then return the previous list without changes as
        // there is nothing to remove from the list. 
        return oldRecipesWithNumbers;
      }

      if (oldRecipeWithNumber.number > 1) {
        const newRecipeWithNumber: RecipeWithNumber = {...oldRecipeWithNumber}
        newRecipeWithNumber.number = oldRecipeWithNumber.number - 1;

        return oldRecipesWithNumbers.map( recipeWithNumer => {

          if(recipeWithNumer.recipeId === recipeId)
            return newRecipeWithNumber;

          return recipeWithNumer;
        });
      }
      else {
        return oldRecipesWithNumbers.filter(oldRecipeWithNumber => 
          oldRecipeWithNumber.recipeId !== recipeId
        );
      }
    })
  }
  


  return (
    <PageContent title="Create Shopping List">

      <SearchInput placeholder="Spaghetti"/>
      <CreationTable 
        rows={convertRecipesToTableRows(recipes, selectedRecipesWithNumbers)}
        addRecipe={addRecipe}
        removeRecipe={removeRecipe}
      />
      <Pagination />
      
      <CreationButtons />

    </PageContent>
  )
}

export default CreateShoppingList;