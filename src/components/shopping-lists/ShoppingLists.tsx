import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "@heroicons/react/16/solid";
import { EyeIcon, MagnifyingGlassIcon } from "@heroicons/react/16/solid";

function ShoppingLists() {
  return (
    <div className="flex justify-center">
        <div className="bg-blue-100 w-lg md:w-2xl lg:w-4xl p-5 rounded-lg shadow-lg sm:m-5 mt-10">
          <h1 className="text-center text-3xl"> List Manager </h1>
          <div className="flex flex-col justify-center mt-5 gap-5">

            <div className="border-b-4 rounded"></div>

            <div className="shadow-lg rounded-lg grow border">
              <div>
                <label className="flex items-center gap-2 p-2">
                  <div className="p-2 border-r-2" >
                    <MagnifyingGlassIcon className="h-10" />
                  </div>
                  <input className="w-full p-2" name="listSearch" placeholder="shopping list for weekend" />
                </label>
              </div>
            </div>
            
              <table>
                  <thead>
                    <tr className="bg-blue-200 border-b-2">
                      <th className="p-2 w-1/2">List Name</th>
                      <th className="p-2 w-4/9 sm:w-1/4">Created On</th>
                      <th className="p-2 w-1/18 sm:w-1/4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 text-center">
                        <button className="cursor-pointer p-2" >Weekend Shopping</button>
                      </td>
                      <td className="p-2 text-center">2023-10-01</td>
                      <td className="p-2 text-center align-middle">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                          <button className="bg-blue-300 p-1 rounded hover:bg-blue-400 block cursor-pointer">
                            <span className="hidden sm:inline">Show</span>
                            <EyeIcon className="h-5 w-5 sm:hidden" />
                          </button>
                          <button className="bg-red-300 p-1 rounded hover:bg-red-400 block cursor-pointer">
                            <span className="hidden sm:inline" >Delete</span>
                            <TrashIcon className="h-5 w-5 sm:hidden" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b-2" ></tr>
                  </tbody>
                </table>

                <div className="flex justify-center mt-5 gap-2 items-center">
                  <button className="bg-blue-300 p-2 rounded hover:bg-blue-400 h-10 w-10 cursor-pointer">
                    <ArrowLeftIcon/>
                  </button>
                  <span>1/20</span>
                  <button className="bg-blue-300 p-2 rounded hover:bg-blue-400 h-10 w-10 cursor-pointer">
                    <ArrowRightIcon/>
                  </button>
                </div>

          </div>
        </div>
    </div>
  )
}

export default ShoppingLists;