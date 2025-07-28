import { useState } from "react";
import type { RecipeItem } from "../../../models/shoppingList";

interface RecipeModalProps {
  items: RecipeItem[];
  categories: string[];
  units: string[];
  onCancel: () => void;
}

function RecipeModal({items, categories, units, onCancel}: RecipeModalProps) {

  const [editedItems, setEditedItems] = useState<RecipeItem[]>(items);

  function handleOnChangeName(itemIdx: number, newName: string) {
    
  }

  function handleOnChangeQuantity(itemIdx: number, newQuantity: string) {

  }

  function handleOnChangeUnit(itemIdx: number, newUnit: string) {

  }

  function handleOnChangeCategory(itemIdx: number, newCategory: string) {

  }

  return (
    <div className="bg-blue-200 p-4">
      <ul>
        {editedItems.map( (item: RecipeItem, itemIdx) =>
          <li key={itemIdx} className="flex p-2 rounded items-center justify-between gap-2">

            <div className="flex w-40 sm:w-auto">
              <span>{`${itemIdx + 1}.`}</span>
              <input className="ml-1 w-full" type="text" value={item.name} onChange={e => handleOnChangeName(itemIdx, e.target.value)} ></input>
            </div>
            <div className="flex flex-col sm:flex-row">
              <input className="p-1 w-12" value={item.quantity} type="number" onChange={e => handleOnChangeQuantity(itemIdx, e.target.value)} ></input>
              <select value={item.unit} onChange={e => handleOnChangeUnit(itemIdx, e.target.value)}>
                {
                  // TODO - Remove name property from unit object
                  units.map(unit => 
                    <option key={unit.name} value={unit.name}>{unit.name}</option>
                  )}
              </select>
            </div>
            
            <span className="ml-5">Category: </span>

            <select value={item.category} onChange={e => handleOnChangeCategory(itemIdx, e.target.value)}>
              {
                // TODO - Remove name property from category object
                categories.map(category =>
                  <option key={category.name} value={category.name}>{category.name}</option>
                )}
            </select>
            
        </li>     
        )}
      </ul>

      <div className="mt-3 flex justify-center w-full">
        <div className="flex justify-center w-1/2 gap-2">
          <button className="bg-green-300 hover:bg-green-400 rounded p-2 flex-1 cursor-pointer">Save</button>
          <button className="bg-red-300 hover:bg-red-400 rounded p-2 flex-1 cursor-pointer" onClick={onCancel}>Cancel</button>
        </div>
      </div>

    </div>
  )
}

export default RecipeModal;