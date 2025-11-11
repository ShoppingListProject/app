interface CreationButtonProps {
  text: string
}

function CreationButton({text}: CreationButtonProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="border-b-4 w-full mb-2"></div>
      <div className="flex justify-center w-1/4">
        <button type="submit" className="bg-green-300 hover:bg-green-400 p-2 rounded cursor-pointer flex-1 shadow-lg">
          {text}
        </button>
      </div>
    </div>
  );
}

export default CreationButton;