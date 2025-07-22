import { useState } from "react";
import type { ShoppingCategoryMap } from "../../../models/shoppingList";
import { XMarkIcon } from "@heroicons/react/16/solid";

interface ShoppingListModalProps {
  itemsPerCategory: ShoppingCategoryMap
}

function ShoppingListModal({itemsPerCategory}: ShoppingListModalProps) {

  const [editedItems, setEditedItems] = useState<ShoppingCategoryMap>(itemsPerCategory);

  function handleOnChangeName(category: string, idx: number, newName: string) {
    setEditedItems( (prevCategoryItems) => {
      const updatedCategoryItems = [...prevCategoryItems[category]];

      updatedCategoryItems[idx] = {
        ...updatedCategoryItems[idx],
        name: newName,
      };
      
      return {
        ...prevCategoryItems,
        [category]: updatedCategoryItems 
      };
    })
  }

  function handleOnChangeQuantity(category: string, idx: number, newQuantity: string) {
    setEditedItems( (prevCategoryItems) => {
      const updatedCategoryItems = [...prevCategoryItems[category]];

      updatedCategoryItems[idx] = {
        ...updatedCategoryItems[idx],
        quantity: parseFloat(newQuantity),
      };
      
      return {
        ...prevCategoryItems,
        [category]: updatedCategoryItems 
      };
    })
  }

    function handleOnChangeUnit(category: string, idx: number, newUnit: string) {
      setEditedItems( (prevCategoryItems) => {
        const updatedCategoryItems = [...prevCategoryItems[category]];

        updatedCategoryItems[idx] = {
          ...updatedCategoryItems[idx],
          unit: newUnit,
        };
        
        return {
          ...prevCategoryItems,
          [category]: updatedCategoryItems 
        };
      })
  }

  function markItem(category: string, idx: number) {
      setEditedItems( (prevCategoryItems) => {
        const updatedCategoryItems = [...prevCategoryItems[category]];

        updatedCategoryItems[idx] = {
          ...updatedCategoryItems[idx],
          purchased: !updatedCategoryItems[idx].purchased,
        };
        
        return {
          ...prevCategoryItems,
          [category]: updatedCategoryItems 
        };
      })
  }

  return (
    <div className="bg-blue-200 p-4">
      <ul>
        {Object.keys(editedItems).map( (category: string) =>
          <li>
            <h1 className="text-sm text-center p-1">{category}</h1>
            <ul className="p-1 rounded border-2">
              {editedItems[category].map( (item, idx) => 
                <li key={idx} className="flex p-2 rounded items-center justify-between gap-2">
                  <div>
                    <span>{`${idx + 1}.`}</span>
                    <input className="ml-1" type="text" value={item.name} onChange={e => handleOnChangeName(category, idx, e.target.value)} ></input>
                  </div>
                  <div>
                    <input className="w-15" value={item.quantity} type="number" onChange={e => handleOnChangeQuantity(category, idx, e.target.value)} ></input>
                    <select value={item.unit} onChange={e => handleOnChangeUnit(category, idx, e.target.value)}>
                      <option value="kg">kg</option>
                      <option value="g">g</option>
                      <option value="l">l</option>
                      <option value="ml">ml</option>
                      <option value="pieces">pieces</option>
                    </select>
                  </div>
                  <button className="w-5 h-5 bg-blue-300 hover:bg-blue-400 rounded cursor-pointer " onClick={() => markItem(category, idx)}>
                    {item.purchased && <XMarkIcon />}
                  </button>
                </li>
             )}
            </ul>
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

export default ShoppingListModal;