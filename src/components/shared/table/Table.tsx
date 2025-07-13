import { EyeIcon, TrashIcon } from "@heroicons/react/16/solid";

interface TableProps {
  headerName: string;
}

function Table({ headerName }: TableProps) {
  return (
    <table>
      <thead>
          <tr className="bg-blue-200 border-b-2">
          <th className="p-2 w-1/2">{headerName}</th>
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
                <button className="bg-blue-300 p-1 rounded hover:bg-blue-400 block cursor-pointer shadow-lg flex-1">
                    <span className="hidden sm:inline">Show</span>
                    <EyeIcon className="h-5 w-5 sm:hidden" />
                </button>
                <button className="bg-red-300 p-1 rounded hover:bg-red-400 block cursor-pointer shadow-lg flex-1">
                    <span className="hidden sm:inline" >Delete</span>
                    <TrashIcon className="h-5 w-5 sm:hidden" />
                </button>
              </div>
          </td>
          </tr>
          <tr className="border-b-2" ></tr>
      </tbody>
    </table>
  )
}

export default Table;