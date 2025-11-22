import { MinusIcon } from "@heroicons/react/16/solid";
import type { RecipeItem } from "@shopping-list-project/sl-api-models";

interface RecipeEditRowProps {
    itemIdx: number
    item: RecipeItem,
    units: string[],
    categories: string[],
    handleOnChangeName: (itemIdx: number, newName: string) => void,
    handleOnChangeQuantity: (itemIdx: number, newValue: string) => void,
    handleOnChangeUnit: (itemIdx: number, newValue: string) => void,
    handleOnChangeCategory: (itemIdx: number, newCategory: string) => void,
    handleOnRemoveItem: (itemIdx: number) => void,
}

function RecipeEditRow(props: RecipeEditRowProps) {

  const {
    itemIdx,
    item,
    units,
    categories,
    handleOnChangeName,
    handleOnChangeQuantity,
    handleOnChangeUnit,
    handleOnChangeCategory,
    handleOnRemoveItem,
  } = props;

  return (
    <li key={itemIdx} className="flex p-2 rounded items-center justify-between gap-2">

      <button 
        className="w-5 h-5 bg-red-300 hover:bg-red-400 rounded cursor-pointer"
        onClick={() => handleOnRemoveItem(itemIdx)}>
          <MinusIcon />
      </button>

      <div className="flex w-40 sm:w-auto">
        <span>{`${itemIdx + 1}.`}</span>
        <input className="ml-1 w-full" type="text" value={item.name} onChange={e => handleOnChangeName(itemIdx, e.target.value)} ></input>
      </div>
      <div className="flex flex-col sm:flex-row">
        <input className="p-1 w-14" value={item.quantity} type="number" onChange={e => handleOnChangeQuantity(itemIdx, e.target.value)} ></input>
        <select value={item.unit} onChange={e => handleOnChangeUnit(itemIdx, e.target.value)}>
          {
            units.map(unit => 
              <option key={unit} value={unit}>{unit}</option>
            )}
        </select>
      </div>
      
      <span className="ml-5 hidden sm:block">Category: </span>

      <select value={item.category} onChange={e => handleOnChangeCategory(itemIdx, e.target.value)}>
        {
          categories.map(category =>
            <option key={category} value={category}>{category}</option>
          )}
      </select>
      
    </li>     
  )
}

export default RecipeEditRow;