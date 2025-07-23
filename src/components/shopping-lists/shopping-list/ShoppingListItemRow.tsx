import { XMarkIcon } from "@heroicons/react/16/solid";
import type { ShoppingListItem } from "../../../models/shoppingList"

interface ShoppingListItemProps {
  itemIdx: number,
  categoryIdx: number,
  item: ShoppingListItem,
  handleOnChangeName: (categoryIdx: number, itemIdx: number, newName: string) => void,
  handleOnChangeQuantity: (categoryIdx: number, itemIdx: number, newValue: string) => void,
  handleOnChangeUnit: (categoryIdx: number, itemIdx: number, newValue: string) => void
  markItem: (categoryIdx: number, itemIdx: number) => void
}

function ShoppingListItemRow(props: ShoppingListItemProps) {

  const {
    itemIdx,
    categoryIdx, 
    item, 
    handleOnChangeName, 
    handleOnChangeQuantity, 
    handleOnChangeUnit,
    markItem
  } = props;

  return (
    <li className="flex p-2 rounded items-center justify-between gap-2">
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
  )
}

export default ShoppingListItemRow;