interface ShoppingListButtons {
  isEditMode: boolean
  onCancelChanges: () => void
  turnOnEditMode: () => void
}

function ShoppingListButtons({isEditMode, onCancelChanges, turnOnEditMode}: ShoppingListButtons) {
  return (
    <div className="mt-3 flex justify-center w-full">
      <div className="flex justify-center w-1/2 gap-2">
        {
          isEditMode ?
            <>
              <button className="bg-green-300 hover:bg-green-400 rounded p-2 flex-1 cursor-pointer shadow">Save</button>
              <button className="bg-red-300 hover:bg-red-400 rounded p-2 flex-1 cursor-pointer shadow" onClick={onCancelChanges}>Cancel</button>
            </> :
            <button className="bg-green-300 hover:bg-green-400 rounded p-2 flex-1 cursor-pointer shadow" onClick={turnOnEditMode}>Edit</button>
        }
      </div>
    </div>      
  )
}

export default ShoppingListButtons