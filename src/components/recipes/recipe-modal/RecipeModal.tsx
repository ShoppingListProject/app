import { useState } from "react";
import type { RecipeItem } from "../../../models/shoppingList";
import RecipeEditRow from "./RecipeEditRow";
import RecipeRow from "./RecipeRow";

interface RecipeModalProps {
  items: RecipeItem[];
  categories: string[];
  units: string[];
  isEditMode: boolean;
  onCancel: () => void;
  onEdit: () => void;
}

function RecipeModal({items, categories, units, isEditMode, onCancel, onEdit}: RecipeModalProps) {

  const [editedItems, setEditedItems] = useState<RecipeItem[]>(items);

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

  const handlers = {
    handleOnChangeName,
    handleOnChangeQuantity,
    handleOnChangeCategory,
    handleOnChangeUnit
  }

  return (
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
      </ul>

      <div className="mt-3 flex justify-center w-full">
        <div className="flex justify-center w-1/2 gap-2">
          {
            isEditMode ?
            <>
              <button className="bg-green-300 hover:bg-green-400 rounded p-2 flex-1 cursor-pointer">Save</button>
              <button className="bg-red-300 hover:bg-red-400 rounded p-2 flex-1 cursor-pointer" onClick={onCancel}>Cancel</button>
            </> :
            <button className="bg-green-300 hover:bg-green-400 rounded p-2 flex-1 cursor-pointer" onClick={onEdit}>Edit</button>
          }
        </div>
      </div>

    </div>
  )
}

export default RecipeModal;