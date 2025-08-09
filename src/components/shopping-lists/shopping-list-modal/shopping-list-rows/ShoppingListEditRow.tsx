import { MinusIcon } from "@heroicons/react/16/solid";
import type { ShoppingListItem } from "../../../../models/shoppingList"

interface ShoppingListEditRowProps {
  itemNumber: number
  itemIdxInCategory: number,
  categoryIdx: number,
  item: ShoppingListItem,
  units: string[],
  onChangeName: (categoryIdx: number, itemIdx: number, newName: string) => void,
  onChangeQuantity: (categoryIdx: number, itemIdx: number, newValue: string) => void,
  onChangeUnit: (categoryIdx: number, itemIdx: number, newValue: string) => void
  onRemoveItem: (categoryIdx: number, itemIdx: number) => void,
}

function ShoppingListEditRow(props: ShoppingListEditRowProps) {

  const {
    itemNumber,
    itemIdxInCategory,
    categoryIdx, 
    item, 
    units,
    onChangeName, 
    onChangeQuantity, 
    onChangeUnit,
    onRemoveItem,
  } = props;

  return (
    <li className="flex p-2 rounded items-center justify-between gap-2">

      <button 
        className="w-5 h-5 bg-red-300 hover:bg-red-400 rounded cursor-pointer"
        onClick={() => onRemoveItem(categoryIdx, itemIdxInCategory)}>
          <MinusIcon />
      </button>

      <div className="flex w-40 sm:w-auto">
        <span>{`${itemNumber + 1}.`}</span>
        <input className="ml-1 w-full" type="text" value={item.name} onChange={e => onChangeName(categoryIdx, itemIdxInCategory, e.target.value)} ></input>
      </div>
      <div className="flex flex-col sm:flex-row">
        <input className="p-1 w-14" value={item.quantity} type="number" onChange={e => onChangeQuantity(categoryIdx, itemIdxInCategory, e.target.value)} ></input>
        <select value={item.unit} onChange={e => onChangeUnit(categoryIdx, itemIdxInCategory, e.target.value)}>
          {
            // TODO - remove the name property from the unit model
            units.map((unit, idx) => 
              <option key={idx} value={unit.name}>{unit.name}</option>)
          }
        </select>
      </div>
    </li>     
  )
}

export default ShoppingListEditRow;