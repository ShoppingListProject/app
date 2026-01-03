import { NavLink } from "react-router";

interface CreationButtonsProps {
  onClickCreateNewEmptyShoppingList: () => void;
}

function CreationButtons({onClickCreateNewEmptyShoppingList}: CreationButtonsProps) {

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="border-b-4 w-full mb-2"></div>
        <div className="flex justify-center gap-2 w-1/2">
          <button type="submit" onClick={onClickCreateNewEmptyShoppingList} className="bg-green-300 hover:bg-green-400 p-2 rounded cursor-pointer flex-1 shadow-lg">
            Create Empty Shopping List
          </button>
          <NavLink to={"/create-shopping-list"} className="bg-green-300 hover:bg-green-400 p-2 rounded cursor-pointer flex-1 shadow-lg flex justify-center items-center">
            Create from Recipes
          </NavLink>
      </div>
    </div>
  );
}

export default CreationButtons;