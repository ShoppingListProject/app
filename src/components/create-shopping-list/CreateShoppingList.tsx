import PageContent from "../shared/PageContent";
import Pagination from "../shared/table/Pagination";
import CreationButtons from "./CreationButtons";
import CreationTable from "./CreationTable";
import type { Recipe } from "@shopping-list-project/sl-api-models";
import type { CreationTableRow } from "../../models/tableModels";
import { useGetRecipes } from "../../api-hooks/useGetRecipes";
import { useRef, useState, type RefObject } from "react";
import type { RecipeIdWithNumber } from "@shopping-list-project/sl-api-models/dist/generated/models/RecipeIdWithNumber";
import Modal, { type ModalRef } from "../shared/modal/Modal";
import ModalConfirmation from "./ModalConfirmation";
import { useNavigate } from "react-router";
import Filter from "../shared/table/Filter";

export interface RecipeWithNumber {
  recipeId: string;
  number: number;
  isPublic: boolean;
}

function CreateShoppingList() {

  const {recipes} = useGetRecipes();
  const [selectedRecipesWithNumbers, setSelectedRecipesWithNumbers] = useState<RecipeWithNumber[]>([]);
  const [modalKey, setModalKey] = useState(0);
  const [userRecipeArray, setUserRecipeArray] = useState<RecipeIdWithNumber[]>([]);
  const [publicRecipeArray, setPublicRecipeArray] = useState<RecipeIdWithNumber[]>([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const navigate = useNavigate();

  const modalRef: RefObject<ModalRef | null> = useRef(null);

  
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

    setUserRecipeArray(userRecipeArray);
    setPublicRecipeArray(publicRecipeArray);

    modalRef.current?.open();
  }

  function handleOnConfirmCreation() {
    navigate("/shopping-lists");
  }

  function handleOnResetShoppingList() {
    setSelectedRecipesWithNumbers([]);
    setUserRecipeArray([]);
    setPublicRecipeArray([]);
  }

  function handleOnCancel() {

    function refreshModal() {
      setModalKey(prevKey => prevKey + 1)
    }

    refreshModal();
  }

  function onClickCheckbox() {
    setIsCheckboxChecked(isCheckboxChecked => !isCheckboxChecked)
  }


  const isAnyRecipeAdded = selectedRecipesWithNumbers.length > 0;

  return (
    <PageContent title="Create Shopping List">

      <Filter 
        placeholder="Spaghetti"
        isCheckboxChecked={isCheckboxChecked}
        onClickCheckbox={onClickCheckbox}
      />

      <CreationTable 
        rows={convertRecipesToTableRows(recipes, selectedRecipesWithNumbers)}
        addRecipe={addRecipe}
        removeRecipe={removeRecipe}
      />
      <Pagination />
      
      <CreationButtons 
        onCreate={handleOnCreateShoppingList}
        onReset={handleOnResetShoppingList}
        isCreateButtonDisabled={!isAnyRecipeAdded} 
        isResetButtonDisabled={!isAnyRecipeAdded}        
      />

      <Modal 
        key={modalKey}
        ref={modalRef} 
        onClose={handleOnCancel}
      >
        {isAnyRecipeAdded && <ModalConfirmation 
          onCanel={handleOnCancel} 
          onConfirmCreation={handleOnConfirmCreation}
          userRecipeArray={userRecipeArray} 
          publicRecipeArray={publicRecipeArray}
        />}
      </Modal>

    </PageContent>
  )
}

export default CreateShoppingList;