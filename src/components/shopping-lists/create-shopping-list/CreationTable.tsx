import {MinusIcon, PlusIcon } from "@heroicons/react/16/solid";

function CreationTable() {
  return (
    <table>
      <thead>
          <tr className="bg-blue-200 border-b-2">
          <th className="p-2 w-2/3">Recipe Name</th>
          <th className="p-2 w-1/3">Amount</th>
          </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-2 text-center">
              <button className="cursor-pointer p-2" >Spaghetti</button>
          </td>
          <td className="p-2 text-center align-middle">
            <div className="flex justify-center items-center gap-2">
              <button className="bg-blue-300 p-1 rounded hover:bg-blue-400 block cursor-pointer shadow-lg">
                  <PlusIcon className="h-5 w-5" />
              </button>
              <span>0</span>
              <button className="bg-red-300 p-1 rounded hover:bg-red-400 block cursor-pointer shadow-lg">
                  <MinusIcon className="h-5 w-5" />
              </button>
            </div>
          </td>
        </tr>
        <tr className="border-b-2" ></tr>
      </tbody>
    </table>
  )
}

export default CreationTable;