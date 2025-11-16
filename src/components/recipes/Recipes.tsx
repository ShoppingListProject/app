import { useRef, useState, type RefObject } from "react";
import PageContent from "../shared/PageContent";
import Pagination from "../shared/table/Pagination";
import SearchInput from "../shared/table/SearchInput";
import Table from "../shared/table/Table";
import type { Recipe } from "@shopping-list-project/sl-api-models";
import type { TableRow } from "../../models/tableModels";
import Modal, { type ModalRef } from "../shared/modal/Modal";
import RecipeModal from "./recipe-modal/RecipeModal";
import CreationButton from "../shared/CreationButton";
import { useGetConstants } from "../../api-hooks/useGetConstants";
import { useGetRecipes } from "../../api-hooks/useGetRecipes";

function Recipes() {

  const { categories, units } = useGetConstants();
  const { recipes } = useGetRecipes();

  const [currentOpenRecipe, setCurrentOpenRecipe] = useState<Recipe | null>(null);
  const [modalKey, setModalKey] = useState(0);
  const [doesCurrentOpenRecipeExist, setDoesCurrentOpenRecipeExist] = useState<boolean | null>(null);
  const [isNecessaryToRefreshData, setIsNecessaryToRefreshData] = useState(false);

  const modalRef: RefObject<ModalRef | null> = useRef(null);

 function convertRecipesToTableRows(recipes: Recipe[]): TableRow[] {
    
    return recipes.map( (recipe) => {

      const creationDate = new Date(recipe.createdAt).toLocaleDateString();

      return {
        id: recipe.recipeId,
        name: recipe.name,
        createdAt: creationDate
      }

    })
  }

  function handleOnClickRecipe(recipeId: string) {
    const currentOpenRecipe: Recipe = recipes.find( recipe => recipe.recipeId === recipeId)!;
    setCurrentOpenRecipe(currentOpenRecipe);
    
    setDoesCurrentOpenRecipeExist(true);
    modalRef.current?.open();
  }

  function handleOnClose() {

    function refreshModal() {
      setModalKey(prevKey => prevKey + 1)
    }

    modalRef.current?.close();
    refreshModal();
    setDoesCurrentOpenRecipeExist(null);
    
    if(isNecessaryToRefreshData) {
      // TODO refresh data here
    }

    setIsNecessaryToRefreshData(false);
  }

  function openEmptyRecipe() {

    const newEmptyRecipe: Recipe = {
      name: "My New Recipe",
      items: [],
      recipeId: crypto.randomUUID(),
      updatedAt: new Date(),
      createdAt: new Date(),
    }

    setDoesCurrentOpenRecipeExist(false);
    setCurrentOpenRecipe(newEmptyRecipe);
    modalRef.current?.open();
  }

  function handleOnSaveChanges() {
    setIsNecessaryToRefreshData(true);
  }

  return (
    <PageContent title="Recipes">

      <SearchInput placeholder="Spaghetti" />
      <Table headerName="Recipe Name" rows={convertRecipesToTableRows(recipes)} onClickItem={handleOnClickRecipe} />
      <Pagination/>
      <CreationButton text="Create Empty Recipe" onClick={openEmptyRecipe}/> 

      <Modal
        key={modalKey}
        ref={modalRef} 
        onClose={handleOnClose}
      >
        {currentOpenRecipe != null && 
          <RecipeModal 
            key={currentOpenRecipe.recipeId} 
            recipe={currentOpenRecipe}
            units={units}
            categories={categories}
            onClose={handleOnClose}
            onSaveChanges={handleOnSaveChanges}
            doesRecipeExist={doesCurrentOpenRecipeExist!}
        />}
      </Modal>

    </PageContent>
  );
}

export default Recipes;