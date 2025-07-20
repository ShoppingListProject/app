import { useState } from "react";
import type { ShoppingListItem } from "../../../models/shoppingList";
import { XMarkIcon } from "@heroicons/react/16/solid";

interface ShoppingListModalProps {
  items: ShoppingListItem[]
}

function ShoppingListModal({items}: ShoppingListModalProps) {

  const [editedItems, setEditedItems] = useState<ShoppingListItem[]>(items);

  function handleOnChangeName(idx: number, newName: string) {
    setEditedItems( (prevItems) => {
      const newItems = [...prevItems.map(v => v)];

      newItems[idx] = {
        ...prevItems[idx], 
        name: newName
      };
      
      return newItems;
    })
  }

  function handleOnChangeQuantity(idx: number, newQuantity: string) {
    setEditedItems( (prevItems) => {
      const newItems = [...prevItems.map(v => v)];

      newItems[idx] = {
        ...prevItems[idx], 
        quantity: parseFloat(newQuantity)
      };
      
      return newItems;
    })
  }

    function handleOnChangeUnit(idx: number, newUnit: string) {
    setEditedItems( (prevItems) => {
      const newItems = [...prevItems.map(v => v)];

      newItems[idx] = {
        ...prevItems[idx], 
        unit: newUnit
      };
      
      return newItems;
    })
  }

  function purchaseItem(idx: number) {
     setEditedItems( (prevItems) => {
      const newItems = [...prevItems.map(v => v)];

      const isPurchased = newItems[idx].purchased;

      newItems[idx] = {
        ...prevItems[idx], 
        purchased: !isPurchased
      };
      
      return newItems;
    })
  }

  return (
    <div className="bg-blue-200 p-4">
      <ul>
        {editedItems.map( (item, idx) => 
          <li key={idx} className="flex p-2 rounded items-center justify-between gap-2">
            <div>
              <span>{`${idx + 1}.`}</span>
              <input className="ml-1" type="text" value={item.name} onChange={e => handleOnChangeName(idx, e.target.value)} ></input>
            </div>
            <div>
              <input className="w-15" value={item.quantity} type="number" onChange={e => handleOnChangeQuantity(idx, e.target.value)} ></input>
              <select value={item.unit} onChange={e => handleOnChangeUnit(idx, e.target.value)}>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="l">l</option>
                <option value="ml">ml</option>
                <option value="pieces">pieces</option>
              </select>
            </div>
            <button className="w-5 h-5 bg-blue-300 hover:bg-blue-400 rounded cursor-pointer " onClick={() => purchaseItem(idx)}>
              {item.purchased && <XMarkIcon />}
            </button>
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