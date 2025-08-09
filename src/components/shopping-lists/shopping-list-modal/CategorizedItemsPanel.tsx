import { PlusIcon } from "@heroicons/react/16/solid";
import type { ShoppingListItem } from "../../../models/shoppingList"
import ShoppingListEditRow from "./shopping-list-rows/ShoppingListEditRow"
import ShoppingListRow from "./shopping-list-rows/ShoppingListRow"

interface CategorizedItemsPanelProps {
  categoryIdx: number,
  category: string,
  isEditMode: boolean,
  items: ShoppingListItem[],
  units: string[],
  countItemNumber: (categoryIdx: number, itemIdx: number) => number,
  handleOnAddItem: (categoryName: string) => void,
  markItem: (categoryIdx: number, itemIdx: number) => void,
  handlers: {  
    onChangeName: (categoryIdx: number, itemIdx: number, newName: string) => void,
    onChangeQuantity: (categoryIdx: number, itemIdx: number, newValue: string) => void,
    onChangeUnit: (categoryIdx: number, itemIdx: number, newValue: string) => void
    onRemoveItem: (categoryIdx: number, itemIdx: number) => void,
  }
}

function CategorizedItemsPanel(props: CategorizedItemsPanelProps) {

  const {
    categoryIdx,
    category,
    isEditMode,
    items,
    units,
    countItemNumber,
    markItem,
    handleOnAddItem,
    handlers,
  } = props;

  return (
    <li>
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
  )
}

export default CategorizedItemsPanel;