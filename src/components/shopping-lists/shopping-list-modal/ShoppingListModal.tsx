import { useState } from "react";
import type { CategorizedItems, ShoppingListItem } from "../../../models/shoppingList";
import ShoppingListEditRow from "./ShoppingListEditRow";
import ShoppingListRow from "./ShoppingListRow";
import { PlusIcon } from "@heroicons/react/16/solid";
import CategoriesModal from "./CategoriesModal";

interface ShoppingListModalProps {
  itemsPerCategory: CategorizedItems[],
  units: string[],
  categories: string[],
}

function ShoppingListModal(props: ShoppingListModalProps) {

  const {
    itemsPerCategory, 
    units, 
    categories,
  } = props;

  const [editedItemsPerCategory, setEditeditemsPerCategory] = useState<CategorizedItems[]>(itemsPerCategory);
  const [isEditMode, setIsEditMode] = useState(false);

  function handleOnChangeName(categoryIdx: number, itemIdx: number, newName: string) {
    setEditeditemsPerCategory( (prevItemsPerCategory) => {

      return prevItemsPerCategory.map( (categorizedItems, cIdx) => {
        
        if(categoryIdx != cIdx)
          return categorizedItems;

        const newItems: ShoppingListItem[] = categorizedItems.items.map((item, iIdx) => {
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

        const newItems: ShoppingListItem[] = categorizedItems.items.map((item, iIdx) => {
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
      setEditeditemsPerCategory( (prevItemsPerCategory) => {
       
        return prevItemsPerCategory.map( (categorizedItems, cIdx) => {
        
          if(categoryIdx != cIdx)
            return categorizedItems;

          const newItems: ShoppingListItem[] = categorizedItems.items.map((item, iIdx) => {
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
      setEditeditemsPerCategory( (prevItemsPerCategory) => {
      
          return prevItemsPerCategory.map( (categorizedItems, cIdx) => {
        
          if(categoryIdx != cIdx)
            return categorizedItems;

          const newItems: ShoppingListItem[] = categorizedItems.items.map((item, iIdx) => {
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

  function handleOnRemoveItem(categoryIdx: number, itemIdx: number) {
    setEditeditemsPerCategory( (prevItemsPerCategory) => {

      // Remove the whole category if there is no elements there
      if(prevItemsPerCategory[categoryIdx].items.length === 1) {

        const newCategoryItems: CategorizedItems[] = [...prevItemsPerCategory];
        newCategoryItems.splice(categoryIdx, 1);

        return newCategoryItems;
      }
      
      return prevItemsPerCategory.map( (categorizedItem, cIdx) => {
        
        if(categoryIdx != cIdx)
          return categorizedItem;

        const newItems: ShoppingListItem[] = [...categorizedItem.items];
        newItems[itemIdx] = {...newItems[itemIdx]};
        newItems.splice(itemIdx, 1);

        return {
          category: categorizedItem.category,
          items: newItems
        }

      })
    })
  }

  function handleOnAddItem(categoryName: string) {

    setEditeditemsPerCategory( prevItemsPerCategory => {

      const newItemsPerCategory = [...prevItemsPerCategory];

      return newItemsPerCategory.map( catagorizedItems => {
        
        if(catagorizedItems.category !== categoryName)
          return catagorizedItems;

        const newItem: ShoppingListItem = {
          name: "New Item",
          quantity: 1,
          unit: "pieces",
          purchased: false
        }

        const newItems: ShoppingListItem[] = [...catagorizedItems.items];
        newItems.push(newItem);
        
        return {
          category: catagorizedItems.category,
          items: newItems,
        }

      })
    })
  }

  function handleOnAddNewCategory(newCategory: string) {
    setEditeditemsPerCategory( prevItemsPerCategory => {

        const newItemsPerCategory = [...prevItemsPerCategory];
        const newItem: ShoppingListItem = {
          name: "New Item",
          quantity: 1,
          unit: "pieces",
          purchased: false
        }

        newItemsPerCategory.push({
          category: newCategory,
          items: [newItem]
        })

        return newItemsPerCategory;
    })
  }

  function onCancelChanges() {
    // Restore initial items
    setEditeditemsPerCategory([...itemsPerCategory]);
    setIsEditMode(false);
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
    onChangeName: handleOnChangeName,
    onChangeQuantity: handleOnChangeQuantity, 
    onChangeUnit: handleOnChangeUnit,
    onRemoveItem: handleOnRemoveItem,
  };

  return (
    <div className="bg-blue-200 p-4">
      <ul>
        {editedItemsPerCategory.map( ({category, items}: CategorizedItems, categoryIdx) =>
          <li key={categoryIdx}>
            <h1 className="text-sm text-center p-1">{category}</h1>
            <ul className="p-1 rounded border-2">
              { 
                items.map( (item: ShoppingListItem, itemIdx) => {

                  if(isEditMode)
                    return <ShoppingListEditRow
                      key={itemIdx} 
                      {...handlers} 
                      categoryIdx={categoryIdx} 
                      itemIdxInCategory={itemIdx}
                      itemNumber={countItemNumber(categoryIdx, itemIdx)}
                      units={units}
                      item={item} 
                    />
                  else
                    return <ShoppingListRow
                      key={itemIdx} 
                      markItem={markItem}
                      categoryIdx={categoryIdx} 
                      itemIdxInCategory={itemIdx}
                      itemNumber={countItemNumber(categoryIdx, itemIdx)}
                      item={item} 
                    />

                }
             )}

              {
                isEditMode && 
                  <li className="pl-1 pb-1">
                    <div 
                      className="w-7 bg-green-300 rounded hover:bg-green-400 cursor-pointer shadow"
                      onClick={() => handleOnAddItem(category)}>
                      <PlusIcon />
                    </div>
                  </li>
              }

            </ul>
          </li>
        )}
      </ul>

      {
        isEditMode && 
        <CategoriesModal
          categories={categories} 
          editedItemsPerCategory={editedItemsPerCategory}
          onAddNewCategory={handleOnAddNewCategory}
        />
      }

      <div className="mt-3 flex justify-center w-full">
        <div className="flex justify-center w-1/2 gap-2">
          {
            isEditMode ?
              <>
                <button className="bg-green-300 hover:bg-green-400 rounded p-2 flex-1 cursor-pointer shadow">Save</button>
                <button className="bg-red-300 hover:bg-red-400 rounded p-2 flex-1 cursor-pointer shadow" onClick={onCancelChanges}>Cancel</button>
              </> :
             <button className="bg-green-300 hover:bg-green-400 rounded p-2 flex-1 cursor-pointer shadow" onClick={() => setIsEditMode(true)}>Edit</button>
          }
        </div>
      </div>      

    </div>
  )
}

export default ShoppingListModal;