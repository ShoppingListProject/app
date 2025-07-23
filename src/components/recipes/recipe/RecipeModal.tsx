import { useState } from "react";
import type { RecipeItem } from "../../../models/shoppingList";

interface RecipeModalProps {
  items: RecipeItem[];
}

function RecipeModal({items}: RecipeModalProps) {

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
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="l">l</option>
                <option value="ml">ml</option>
                <option value="pieces">pieces</option>
              </select>
            </div>
            
            <span className="ml-5">Category: </span>

            <select value={item.category} onChange={e => handleOnChangeCategory(itemIdx, e.target.value)}>
              <option value="Vegetables & Fruits">Vegetables & Fruits</option>
              <option value="Bread">Bread</option>
              <option value="Dairy & Eggs">Dairy & Eggs</option>
              <option value="Pantry / Dry Goods">Pantry / Dry Goods</option>
              <option value="Personal Care">Personal Care</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Snacks">Snacks</option>
              <option value="Other">Other</option>
            </select>
            
        </li>     
        )}
      </ul>

      <div className="mt-3 flex justify-center w-full">
        <div className="flex justify-center w-1/2 gap-2">
          <button className="bg-green-300 hover:bg-green-400 rounded p-2 flex-1 cursor-pointer">Save</button>
          <button className="bg-red-300 hover:bg-red-400 rounded p-2 flex-1 cursor-pointer">Cancel</button>
        </div>
      </div>

    </div>
  )
}

export default RecipeModal;