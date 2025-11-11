import { useEffect, useRef, useState, type RefObject } from "react";
import PageContent from "../shared/PageContent";
import Pagination from "../shared/table/Pagination";
import SearchInput from "../shared/table/SearchInput";
import Table from "../shared/table/Table";
import type { Recipe } from "@shopping-list-project/sl-api-models";
import { getPublicRecipes } from "../../api/receipes";
import { getCategories } from "../../api/categories";
import { getUnits } from "../../api/units";
import type { TableRow } from "../../models/tableModels";
import Modal, { type ModalRef } from "../shared/modal/Modal";
import RecipeModal from "./recipe-modal/RecipeModal";
import CreationButton from "../shared/CreationButton";

function Recipes() {

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentOpenRecipe, setCurrentOpenRecipe] = useState<Recipe | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [units, setUnits] = useState<string[]>([]);
  const [modalKey, setModalKey] = useState(0);

  const modalRef: RefObject<ModalRef | null> = useRef(null);

  useEffect( () => {

    getPublicRecipes()
      .then(setRecipes)
      .catch( err => console.error(err) )

    getCategories()
      .then(setCategories)
      .catch( err => console.error(err) )

    getUnits()
      .then(setUnits)
      .catch( err => console.error(err) )

  }, [])

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
    
    modalRef.current?.open();
  }

  function handleOnClose() {
    modalRef.current?.close();

    refreshModal();
  }

  function refreshModal() {
    setModalKey(prevKey => prevKey + 1)
  }

  return (
    <PageContent title="Recipes">

      <SearchInput placeholder="Spaghetti" />
      <Table headerName="Recipe Name" rows={convertRecipesToTableRows(recipes)} onClickItem={handleOnClickRecipe} />
      <Pagination/>
      <CreationButton text="Create Empty Recipe"/> 

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
        />}
      </Modal>

    </PageContent>
  );
}

export default Recipes;