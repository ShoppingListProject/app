import {MinusIcon, PlusIcon } from "@heroicons/react/16/solid";
import React from "react";
import type { CreationTableRow } from "../../models/tableModels";

interface CreationTableProps {
  rows: CreationTableRow[];
  addRecipe: (recipeId: string) => void;
  removeRecipe: (recipeId: string) => void;
}

function CreationTable({rows, addRecipe, removeRecipe}: CreationTableProps) {
  
  const removeButtonClasses = "bg-red-300 hover:bg-red-400 cursor-pointer";
  const disabledRemoveButtonClasses = "bg-gray-300";

  return (
    <table>
      <thead>
          <tr className="bg-blue-200 border-b-2">
          <th className="p-2 w-2/3">Recipe Name</th>
          <th className="p-2 w-1/3">Amount</th>
          </tr>
      </thead>
      <tbody>
        {rows.map( (row) => {

          const isRemoveButtonDisabled = row.recipeCounter === 0;

          return <React.Fragment key={row.recipeId}>
            <tr>
              <td className="p-2 text-center">
                  <button className="cursor-pointer p-2" >{row.recipeName}</button>
              </td>
              <td className="p-2 text-center align-middle">
                <div className="flex justify-center items-center gap-2">

                  <button 
                    className="bg-blue-300 p-1 rounded hover:bg-blue-400 block cursor-pointer shadow-lg"
                    onClick={() => addRecipe(row.recipeId)}
                  >
                      <PlusIcon className="h-5 w-5" />
                  </button>

                  <span>{row.recipeCounter}</span>

                  <button 
                    className={"p-1 rounded block shadow-lg " + (isRemoveButtonDisabled ? disabledRemoveButtonClasses : removeButtonClasses)}
                    onClick={() => removeRecipe(row.recipeId)}
                    disabled={isRemoveButtonDisabled}
                  >
                      <MinusIcon className="h-5 w-5" />
                  </button>

                </div>
              </td>
            </tr>
            <tr className="border-b-2" ></tr> 
          </React.Fragment>
          }
        )}
      </tbody>
    </table>
  )
}

export default CreationTable;