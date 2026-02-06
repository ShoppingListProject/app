import type { ShoppingListCreateFromRecipes } from "@shopping-list-project/sl-api-models";
import type { RecipeIdWithNumber } from "@shopping-list-project/sl-api-models/dist/generated/models/RecipeIdWithNumber";
import { useState } from "react";
import useCreateShoppingListFromRecipes from "../../api-hooks/useCreateShoppingListFromRecipes";

interface ModalConfirmationProps {
    onCanel: () => void;
    onConfirmCreation: () => void;
    userRecipeArray: RecipeIdWithNumber[];
    publicRecipeArray: RecipeIdWithNumber[];
}

function ModalConfirmation({onCanel, onConfirmCreation, userRecipeArray, publicRecipeArray}: ModalConfirmationProps) {


    const [shoppingListName, setShoppingListName] = useState('');
    const { createShoppingListFromRecipes } = useCreateShoppingListFromRecipes();

    async function handleOnCreate() {

        if(shoppingListName !== "") {
            const bodyRequest: ShoppingListCreateFromRecipes = {
                name: shoppingListName,
                userRecipeArray,
                publicRecipeArray,
            }

            await createShoppingListFromRecipes(bodyRequest);
            onConfirmCreation();
        }
        
        // TODO
        // Display error message when the name for shopping list is not provided.
    }

    return (
        <div>
            <h3 className="text-3xl p-3">Enter a name for your new shopping list</h3>
            <div className="border-2 rounded m-1"></div>
            <div className="flex justify-center p-3">
                <input 
                    className="border rounded text-2xl p-2"
                    placeholder="Weekend Shopping List"
                    value={shoppingListName}
                    onChange={(e) => setShoppingListName(e.target.value)}
                />
            </div>

            <div className="flex">
                <button 
                    type="submit"
                    className="bg-green-300 hover:bg-green-400 p-2 rounded cursor-pointer flex-1 shadow-lg"
                    onClick={() => handleOnCreate()}
                >
                    Create
                </button>

                <button
                    type="button"
                    className="bg-red-300 hover:bg-red-400 p-2 rounded cursor-pointer flex-1 shadow-lg"
                    onClick={onCanel}
                >
                    Cancel
                </button>
            </div>

        </div>
    );
}

export default ModalConfirmation;