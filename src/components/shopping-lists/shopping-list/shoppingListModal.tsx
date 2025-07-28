import { useState } from "react";
import type { CategorizedItems, ShoppingListItem } from "../../../models/shoppingList";
import ShoppingListItemRow from "./ShoppingListItemRow";

interface ShoppingListModalProps {
  itemsPerCategory: CategorizedItems[],
  onCancel: () => void
}

function ShoppingListModal({itemsPerCategory, onCancel}: ShoppingListModalProps) {

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

  function countItemNumber(categoryIdx: number, itemIdx: number): number {
    let itemNumberInList = 0;
    for(let i = 0; i < categoryIdx; i++) {
      itemNumberInList += editedItemsPerCategory[i].items.length;
    }
    itemNumberInList += itemIdx;
    return itemNumberInList;
  }

  const handlers = {
    handleOnChangeName,
    handleOnChangeQuantity, 
    handleOnChangeUnit, 
    markItem
  };

  return (
    <div className="bg-blue-200 p-4">
      <ul>
        {editedItemsPerCategory.map( ({category, items}: CategorizedItems, categoryIdx) =>
          <li key={categoryIdx}>
            <h1 className="text-sm text-center p-1">{category}</h1>
            <ul className="p-1 rounded border-2">
              { items.map( (item: ShoppingListItem, itemIdx) =>     

                  <ShoppingListItemRow
                    key={itemIdx} 
                    {...handlers} 
                    categoryIdx={categoryIdx} 
                    itemIdxInCategory={itemIdx}
                    itemNumber={countItemNumber(categoryIdx, itemIdx)} 
                    item={item} 
                  />
             )}
            </ul>
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

export default ShoppingListModal;