interface CreationButtonsProps {
  onCreate: () => void
  onReset: () => void
  isCreateButtonDisabled: boolean;
  isResetButtonDisabled: boolean;
}

function CreationButtons({onCreate, onReset, isCreateButtonDisabled, isResetButtonDisabled}: CreationButtonsProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="border-b-4 w-full mb-2"></div>
      <div className="flex justify-center gap-2 w-1/2">
        <button 
          type="submit" className="bg-green-300 hover:bg-green-400 p-2 rounded cursor-pointer flex-1 shadow-lg"
          onClick={onCreate}
          disabled={isCreateButtonDisabled}
        >
          Create
        </button>
        <button 
          type="button" 
          className="bg-red-300 hover:bg-red-400 p-2 rounded cursor-pointer flex-1 shadow-lg"
          onClick={onReset}
          disabled={isResetButtonDisabled}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default CreationButtons;