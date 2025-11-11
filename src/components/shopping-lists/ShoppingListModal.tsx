import { useState } from "react";
import type { ShoppingListItem, CategorizedItems, ShoppingList } from "@shopping-list-project/sl-api-models";
import CategoriesModal from "./shopping-list-modal/CategoriesModal";
import CategorizedItemsPanel from "./shopping-list-modal/CategorizedItemsPanel";
import ModalButtons from "../shared/modal/ModalButtons";
import ModalHeader from "../shared/modal/ModalHeader";

interface ShoppingListModalProps {
  shoppingList: ShoppingList,
  units: string[],
  categories: string[],
  onClose: () => void,
}

function ShoppingListModal(props: ShoppingListModalProps) {

  const {
    shoppingList,
    units, 
    categories,
    onClose
  } = props;

  const {
    itemsPerCategory, 
    name: shoppingListName,
  } = shoppingList;

  const [editedItemsPerCategory, setEditeditemsPerCategory] = useState<CategorizedItems[]>(itemsPerCategory);
  const [editedListName, setEditedListName] = useState(shoppingListName);
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

  function handleOnCancelChanges() {
    // Restore initial items
    setEditeditemsPerCategory(itemsPerCategory);
    setEditedListName(shoppingListName);
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
    <>
      <ModalHeader title={editedListName} onClose={onClose} onChangeTitle={setEditedListName} isEditMode={isEditMode}/>

      <div className="bg-blue-200 p-4">
        <ul>
          {editedItemsPerCategory.map( ({category, items}: CategorizedItems, categoryIdx) =>
            <CategorizedItemsPanel
              key={categoryIdx} 
              categoryIdx={categoryIdx} 
              category={category} 
              isEditMode={isEditMode} 
              items={items} 
              units={units} 
              countItemNumber={countItemNumber}
              handleOnAddItem={handleOnAddItem} 
              markItem={markItem} 
              handlers={handlers} 
            />
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

        <ModalButtons 
          isEditMode={isEditMode}
          onCancelChanges={handleOnCancelChanges}
          turnOnEditMode={() => setIsEditMode(true)}
        />

      </div>
    </>
  )
}

export default ShoppingListModal;