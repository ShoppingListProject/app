import { useEffect, useRef, useState, type RefObject } from "react";
import PageContent from "../shared/PageContent";
import Pagination from "../shared/table/Pagination";
import SearchInput from "../shared/table/SearchInput";
import Table from "../shared/table/Table";
import type { Recipe, RecipeItem } from "../../models/shoppingList";
import { getRecipes } from "../../api/receipes";
import { getCategories } from "../../api/categories";
import { getUnits } from "../../api/units";
import type { TableRow } from "../../models/tableModels";
import Modal, { type ModalRef } from "../shared/Modal";
import RecipeModal from "./recipe-modal/RecipeModal";

function Recipes() {

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentOpenRecipeName, setCurrentOpenRecipeName] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [units, setUnits] = useState<string[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);

  const modalRef: RefObject<ModalRef | null> = useRef(null);

  useEffect( () => {

    getRecipes()
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
        name: recipe.name,
        createdAt: creationDate
      }

    })
  }

  function handleOnClickItem(name: string) {
    setCurrentOpenRecipeName(name);
    modalRef.current?.open();
  }

  function findItemsOfSelctedRecipe(currentOpenRecipeName: string): RecipeItem[] {
    return recipes.find( recipe => recipe.name === currentOpenRecipeName)!.items;
  }

  function handleOnCancel() {
    setIsEditMode(false);
  }

  function handleOnEdit() {
    setIsEditMode(true);
  }

  return (
    <PageContent title="Recipes">

      <SearchInput placeholder="Spaghetti" />
      <Table headerName="Recipe Name" rows={convertRecipesToTableRows(recipes)} onClickItem={handleOnClickItem} />
      <Pagination/>

      <Modal
        ref={modalRef} 
        title={currentOpenRecipeName} 
      >
        {currentOpenRecipeName != null && 
          <RecipeModal 
            key={currentOpenRecipeName} 
            items={findItemsOfSelctedRecipe(currentOpenRecipeName)} 
            onCancel={handleOnCancel}
            units={units}
            categories={categories}
            isEditMode={isEditMode}
            onEdit={handleOnEdit}
        />}
      </Modal>

    </PageContent>
  );
}

export default Recipes;