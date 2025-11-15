interface ModalButtonsProps {
  isEditMode: boolean;
  onCancelChanges: () => void;
  turnOnEditMode: () => void;
  onSaveChanges: () => void;
}

function ModalButtons(props: ModalButtonsProps) {

  const {
    isEditMode, 
    onCancelChanges, 
    turnOnEditMode,
    onSaveChanges,
  } = props;

  return (
    <div className="mt-3 flex justify-center w-full">
      <div className="flex justify-center w-1/2 gap-2">
        {
          isEditMode ?
            <>
              <button className="bg-green-300 hover:bg-green-400 rounded p-2 flex-1 cursor-pointer shadow" onClick={onSaveChanges}>Save</button>
              <button className="bg-red-300 hover:bg-red-400 rounded p-2 flex-1 cursor-pointer shadow" onClick={onCancelChanges}>Cancel</button>
            </> :
            <button className="bg-green-300 hover:bg-green-400 rounded p-2 flex-1 cursor-pointer shadow" onClick={turnOnEditMode}>Edit</button>
        }
      </div>
    </div>      
  )
}

export default ModalButtons