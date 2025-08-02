import { XMarkIcon } from "@heroicons/react/16/solid";
import type { ShoppingListItem } from "../../../models/shoppingList";

interface ShoppingListRowProps {
  itemNumber: number
  itemIdxInCategory: number,
  categoryIdx: number,
  item: ShoppingListItem,
  markItem: (categoryIdx: number, itemIdx: number) => void,
}

function ShoppingListRow(props: ShoppingListRowProps) {

  const {
    itemNumber,
    itemIdxInCategory,
    categoryIdx, 
    item,
    markItem
  } = props;

  return (
    <li className="flex p-2 rounded items-center justify-between gap-2">
      <div className="flex w-40">
        <span>{`${itemNumber + 1}. ${item.name}`}</span>
      </div>
      <div>
        <span>{`${item.quantity} ${item.unit}`}</span>
      </div>
      <button className="w-5 h-5 bg-blue-300 hover:bg-blue-400 rounded cursor-pointer shadow" onClick={() => markItem(categoryIdx, itemIdxInCategory)}>
        {item.purchased && <XMarkIcon />}
      </button>
    </li>     
  )
  
}

export default ShoppingListRow;