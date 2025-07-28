import { XMarkIcon } from "@heroicons/react/16/solid";
import type { ShoppingListItem } from "../../../models/shoppingList"

interface ShoppingListItemProps {
  itemNumber: number
  itemIdxInCategory: number,
  categoryIdx: number,
  item: ShoppingListItem,
  units: string[],
  handleOnChangeName: (categoryIdx: number, itemIdx: number, newName: string) => void,
  handleOnChangeQuantity: (categoryIdx: number, itemIdx: number, newValue: string) => void,
  handleOnChangeUnit: (categoryIdx: number, itemIdx: number, newValue: string) => void
  markItem: (categoryIdx: number, itemIdx: number) => void
}

function ShoppingListItemRow(props: ShoppingListItemProps) {

  const {
    itemNumber,
    itemIdxInCategory,
    categoryIdx, 
    item, 
    units,
    handleOnChangeName, 
    handleOnChangeQuantity, 
    handleOnChangeUnit,
    markItem
  } = props;

  return (
    <li className="flex p-2 rounded items-center justify-between gap-2">
      <div className="flex w-40 sm:w-auto">
        <span>{`${itemNumber + 1}.`}</span>
        <input className="ml-1 w-full" type="text" value={item.name} onChange={e => handleOnChangeName(categoryIdx, itemIdxInCategory, e.target.value)} ></input>
      </div>
      <div className="flex flex-col sm:flex-row">
        <input className="p-1 w-14" value={item.quantity} type="number" onChange={e => handleOnChangeQuantity(categoryIdx, itemIdxInCategory, e.target.value)} ></input>
        <select value={item.unit} onChange={e => handleOnChangeUnit(categoryIdx, itemIdxInCategory, e.target.value)}>
          {
            // TODO - remove the name property from the unit model
            units.map((unit, idx) => 
              <option key={idx} value={unit.name}>{unit.name}</option>)
          }
        </select>
      </div>
      <button className="w-5 h-5 bg-blue-300 hover:bg-blue-400 rounded cursor-pointer " onClick={() => markItem(categoryIdx, itemIdxInCategory)}>
        {item.purchased && <XMarkIcon />}
      </button>
    </li>     
  )
}

export default ShoppingListItemRow;