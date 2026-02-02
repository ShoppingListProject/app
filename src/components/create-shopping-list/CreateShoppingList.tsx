import PageContent from "../shared/PageContent";
import Pagination from "../shared/table/Pagination";
import SearchInput from "../shared/table/SearchInput";
import CreationButtons from "./CreationButtons";
import CreationTable from "./CreationTable";
import type { Recipe, ShoppingListCreateFromRecipes } from "@shopping-list-project/sl-api-models";
import type { CreationTableRow } from "../../models/tableModels";
import { useGetRecipes } from "../../api-hooks/useGetRecipes";
import { useState } from "react";
import useCreateShoppingListFromRecipes from "../../api-hooks/useCreateShoppingListFromRecipes";
import type { RecipeIdWithNumber } from "@shopping-list-project/sl-api-models/dist/generated/models/RecipeIdWithNumber";

export interface RecipeWithNumber {
  recipeId: string;
  number: number;
  isPublic: boolean;
}

function CreateShoppingList() {

  const {recipes} = useGetRecipes();
  const [selectedRecipesWithNumbers, setSelectedRecipesWithNumbers] = useState<RecipeWithNumber[]>([]);
  const {createShoppingListFromRecipes} = useCreateShoppingListFromRecipes();
  
  function convertRecipesToTableRows(
    recipes: Recipe[], 
    selectedRecipesWithNumbers: RecipeWithNumber[]
  ): CreationTableRow[] {
    
    return recipes.map( (recipe) => {

      const optionalRecipeCounter: RecipeWithNumber | undefined = selectedRecipesWithNumbers.find( recipeWithNumber =>
        recipeWithNumber.recipeId === recipe.recipeId
      );

      return {
        recipe,
        recipeCounter: optionalRecipeCounter ? optionalRecipeCounter.number : 0,
      }
    })
  }

  function addRecipe(recipe: Recipe) {

    const recipeId = recipe.recipeId;

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
        isPublic: recipe.isGlobal
      };

      return [...oldRecipesWithNumbers, newRecipeWithNumber];
    });
  }

  function removeRecipe(recipe: Recipe) {

    const recipeId = recipe.recipeId;

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

  function handleOnCreateShoppingList() {

    if(setSelectedRecipesWithNumbers.length === 0) {
      return;
    }

    const selectedUserRecipes: RecipeWithNumber[] = selectedRecipesWithNumbers.filter(recipeWithNumber => 
      !recipeWithNumber.isPublic
    ) ?? [];

    const selectedPublicRecipes: RecipeWithNumber[] = selectedRecipesWithNumbers.filter(recipeWithNumber => 
      recipeWithNumber.isPublic
    ) ?? [];

    const userRecipeArray: RecipeIdWithNumber[] = selectedUserRecipes.map( recipeWithNumber => {
      return {
        recipeId: recipeWithNumber.recipeId,
        amount: recipeWithNumber.number,
      }
    });

    const publicRecipeArray: RecipeIdWithNumber[] = selectedPublicRecipes.map( recipeWithNumber => {
      return {
        recipeId: recipeWithNumber.recipeId,
        amount: recipeWithNumber.number,
      }
    });

    const bodyRequest: ShoppingListCreateFromRecipes = {
      name: "randomName",
      userRecipeArray,
      publicRecipeArray,
    }

    createShoppingListFromRecipes(bodyRequest);
  }

  function handleOnResetShoppingList() {

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
      
      <CreationButtons 
        onCreate={handleOnCreateShoppingList}
        onReset={handleOnResetShoppingList}
      />

    </PageContent>
  )
}

export default CreateShoppingList;