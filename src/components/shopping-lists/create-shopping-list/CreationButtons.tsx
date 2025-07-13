function CreationButtons() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="border-b-4 w-full mb-2"></div>
      <div className="flex justify-center gap-2 w-1/2">
        <button type="button" className="bg-red-300 hover:bg-red-400 p-2 rounded cursor-pointer flex-1 shadow-lg">
          Reset
        </button>
        <button type="submit" className="bg-green-300 hover:bg-green-400 p-2 rounded cursor-pointer flex-1 shadow-lg">
          Create
        </button>
      </div>
    </div>
  );
}

export default CreationButtons;