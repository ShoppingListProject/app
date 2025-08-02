import type { RecipeItem } from "../../../models/shoppingList";

interface RecipeRowProps {
  itemIdx: number
  item: RecipeItem,
}

function RecipeRow(props: RecipeRowProps) {

  const {
    itemIdx,
    item,
  } = props;

  return (
    <li key={itemIdx} className="flex p-2 rounded items-center justify-between gap-10">

      <div className="flex w-40 sm:w-auto">
        <span>{`${itemIdx + 1}. ${item.name}`}</span>
      </div>

      <div>
        <span>{`${item.quantity} ${item.unit}`}</span>
      </div>
      
    </li>     
  )
}

export default RecipeRow;