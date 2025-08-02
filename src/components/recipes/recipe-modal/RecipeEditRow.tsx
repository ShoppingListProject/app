import type { RecipeItem } from "../../../models/shoppingList";

interface RecipeEditRowProps {
    itemIdx: number
    item: RecipeItem,
    units: string[],
    categories: string[],
    handleOnChangeName: (itemIdx: number, newName: string) => void,
    handleOnChangeQuantity: (itemIdx: number, newValue: string) => void,
    handleOnChangeUnit: (itemIdx: number, newValue: string) => void,
    handleOnChangeCategory: (itemIdx: number, newCategory: string) => void
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
    handleOnChangeCategory
  } = props;

  return (
    <li key={itemIdx} className="flex p-2 rounded items-center justify-between gap-2">

      <div className="flex w-40 sm:w-auto">
        <span>{`${itemIdx + 1}.`}</span>
        <input className="ml-1 w-full" type="text" value={item.name} onChange={e => handleOnChangeName(itemIdx, e.target.value)} ></input>
      </div>
      <div className="flex flex-col sm:flex-row">
        <input className="p-1 w-14" value={item.quantity} type="number" onChange={e => handleOnChangeQuantity(itemIdx, e.target.value)} ></input>
        <select value={item.unit} onChange={e => handleOnChangeUnit(itemIdx, e.target.value)}>
          {
            // TODO - Remove name property from unit object
            units.map(unit => 
              <option key={unit.name} value={unit.name}>{unit.name}</option>
            )}
        </select>
      </div>
      
      <span className="ml-5 hidden sm:block">Category: </span>

      <select value={item.category} onChange={e => handleOnChangeCategory(itemIdx, e.target.value)}>
        {
          // TODO - Remove name property from category object
          categories.map(category =>
            <option key={category.name} value={category.name}>{category.name}</option>
          )}
      </select>
      
    </li>     
  )
}

export default RecipeEditRow;