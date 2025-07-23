import { useState } from "react";
import type { CategorizedItems, ShoppingListItem } from "../../../models/shoppingList";
import { XMarkIcon } from "@heroicons/react/16/solid";

interface ShoppingListModalProps {
  itemsPerCategory: CategorizedItems[]
}

function ShoppingListModal({itemsPerCategory}: ShoppingListModalProps) {

  const [editedItemsPerCategory, setEditeditemsPerCategory] = useState<CategorizedItems[]>(itemsPerCategory);

  function handleOnChangeName(categoryIdx: number, itemIdx: number, newName: string) {
    setEditeditemsPerCategory( (prevItemsPerCategory) => {

      return prevItemsPerCategory.map( (categorizedItems, cIdx) => {
        
        if(categoryIdx != cIdx)
          return categorizedItems;

        const newItems = categorizedItems.items.map((item, iIdx) => {
          if(itemIdx != iIdx)
            return item;

          return {
            ...item,
            name: newName
          }
        })
        
        return {
          ...categorizedItems,
          items: newItems
        }
      })
     
    })
  }

  function handleOnChangeQuantity(categoryIdx: number, itemIdx: number, newQuantity: string) {
    setEditeditemsPerCategory( (prevItemsPerCategory) => {

      return prevItemsPerCategory.map( (categorizedItems, cIdx) => {
        
        if(categoryIdx != cIdx)
          return categorizedItems;

        const newItems = categorizedItems.items.map((item, iIdx) => {
          if(itemIdx != iIdx)
            return item;

          return {
            ...item,
            quantity: parseFloat(newQuantity)
          }
        })
        
        return {
          ...categorizedItems,
          items: newItems
        }
      })

    })
  }

    function handleOnChangeUnit(categoryIdx: number, itemIdx: number, newUnit: string) {
      setEditeditemsPerCategory( (prevCategoryItems) => {
       
        return prevCategoryItems.map( (categorizedItems, cIdx) => {
        
          if(categoryIdx != cIdx)
            return categorizedItems;

          const newItems = categorizedItems.items.map((item, iIdx) => {
            if(itemIdx != iIdx)
              return item;

            return {
              ...item,
              unit: newUnit
            }
          })
          
          return {
            ...categorizedItems,
            items: newItems
          }
        })

      })
  }

  function markItem(categoryIdx: number, itemIdx: number) {
      setEditeditemsPerCategory( (prevCategoryItems) => {
      
           return prevCategoryItems.map( (categorizedItems, cIdx) => {
        
          if(categoryIdx != cIdx)
            return categorizedItems;

          const newItems = categorizedItems.items.map((item, iIdx) => {
            if(itemIdx != iIdx)
              return item;

            return {
              ...item,
              purchased: !item.purchased
            }
          })
          
          return {
            ...categorizedItems,
            items: newItems
          }
        })


      })
  }

  return (
    <div className="bg-blue-200 p-4">
      <ul>
        {editedItemsPerCategory.map( ({category, items}: CategorizedItems, categoryIdx) =>
          <li key={categoryIdx}>
            <h1 className="text-sm text-center p-1">{category}</h1>
            <ul className="p-1 rounded border-2">
              {items.map( (item: ShoppingListItem, itemIdx) => 
                <li key={itemIdx} className="flex p-2 rounded items-center justify-between gap-2">
                  <div className="flex w-40 sm:w-auto">
                    <span>{`${itemIdx + 1}.`}</span>
                    <input className="ml-1 w-full" type="text" value={item.name} onChange={e => handleOnChangeName(categoryIdx, itemIdx, e.target.value)} ></input>
                  </div>
                  <div className="flex flex-col sm:flex-row">
                    <input className="p-1 w-12" value={item.quantity} type="number" onChange={e => handleOnChangeQuantity(categoryIdx, itemIdx, e.target.value)} ></input>
                    <select value={item.unit} onChange={e => handleOnChangeUnit(categoryIdx, itemIdx, e.target.value)}>
                      <option value="kg">kg</option>
                      <option value="g">g</option>
                      <option value="l">l</option>
                      <option value="ml">ml</option>
                      <option value="pieces">pieces</option>
                    </select>
                  </div>
                  <button className="w-5 h-5 bg-blue-300 hover:bg-blue-400 rounded cursor-pointer " onClick={() => markItem(categoryIdx, itemIdx)}>
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