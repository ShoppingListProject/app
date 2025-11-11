import { useState } from "react";
import type { RecipeItem } from "@shopping-list-project/sl-api-models";
import RecipeEditRow from "./RecipeEditRow";
import RecipeRow from "./RecipeRow";
import { PlusIcon } from "@heroicons/react/16/solid";
import ModalButtons from "../../shared/modal/ModalButtons";
import ModalHeader from "../../shared/modal/ModalHeader";

interface RecipeModalProps {
  recipeName: string,
  items: RecipeItem[],
  categories: string[],
  units: string[],
  onClose: () => void,
}

function RecipeModal(props: RecipeModalProps) {

  const {
    recipeName, 
    items,
    categories, 
    units,
    onClose,
  } = props;

  const [editedItems, setEditedItems] = useState<RecipeItem[]>(items);
  const [editedRecipeName, setEditedRecipeName] = useState(recipeName);
  const [isEditMode, setIsEditMode] = useState(false);

  function handleOnChangeName(itemIdx: number, newName: string) {
    setEditedItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[itemIdx] = {...updatedItems[itemIdx], name: newName};
      return updatedItems;
    });
  }

  function handleOnChangeQuantity(itemIdx: number, newQuantity: string) {
    setEditedItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[itemIdx] = {...updatedItems[itemIdx], quantity: parseFloat(newQuantity)};
      return updatedItems;
    })
  }

  function handleOnChangeUnit(itemIdx: number, newUnit: string) {
    setEditedItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[itemIdx] = {...updatedItems[itemIdx], unit: newUnit};
      return updatedItems;
    })
  }

  function handleOnChangeCategory(itemIdx: number, newCategory: string) {
    setEditedItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[itemIdx] = {...updatedItems[itemIdx], category: newCategory};
      return updatedItems;
    })
  }

  function handleOnAddItem() {
    setEditedItems(prevItems => {

      const newItem: RecipeItem = {
        name: "New Item",
        quantity: 1,
        unit: "pieces",
        category: "Other",
      }

      const newItems = [...prevItems];
      newItems.push(newItem);

      return newItems;
    })
  }

  function handleOnCancelChanges() {
    // Restore initial items
    setEditedItems([...items]);
    setEditedRecipeName(recipeName);
    setIsEditMode(false);
  }

  const handlers = {
    handleOnChangeName,
    handleOnChangeQuantity,
    handleOnChangeCategory,
    handleOnChangeUnit
  }

  return (
    <>
      <ModalHeader title={editedRecipeName} onClose={onClose} onChangeTitle={setEditedRecipeName} isEditMode={isEditMode}/>

      <div className="bg-blue-200 p-4 text-sm sm:text-base">
        <ul>
          {editedItems.map( (item: RecipeItem, itemIdx) =>

          isEditMode ? 
            <RecipeEditRow
              key={itemIdx}
              {...handlers}
              itemIdx={itemIdx}
              units={units}
              categories={categories}
              item={item}
            /> :
            <RecipeRow
              key={itemIdx}
              itemIdx={itemIdx}
              item={item}
            />
            
          )}
          {
            isEditMode && 
            <li className="pl-1 pb-1">
              <div 
                className="w-7 bg-green-300 rounded hover:bg-green-400 cursor-pointer shadow"
                onClick={handleOnAddItem}>
                <PlusIcon />
              </div>
            </li>
          }
        </ul>

        <ModalButtons 
          isEditMode={isEditMode}
          onCancelChanges={handleOnCancelChanges} 
          turnOnEditMode={() => setIsEditMode(true)}
        />
     </div>
    </>
  )
}

export default RecipeModal;