import { EyeIcon, TrashIcon } from "@heroicons/react/16/solid";
import type { TableRow } from "../../../models/tableModels";
import React from "react";

interface TableProps {
  headerName: string;
  rows: TableRow[];
  onClickItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
}

function Table({ headerName, rows, onClickItem, onDeleteItem }: TableProps) {

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
          {rows.map( (row) =>
            <React.Fragment key={row.id} >
              <tr>
                <td className="p-2 text-center">
                    <button className="cursor-pointer p-2 focus:outline-none" onClick={() => onClickItem(row.id)}>{row.name}</button>
                </td>
                <td className="p-2 text-center">{row.createdAt}</td>
                <td className="p-2 text-center align-middle">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                      <button className="bg-blue-300 p-1 rounded hover:bg-blue-400 block cursor-pointer shadow-lg flex-1 flex justify-center" onClick={() => onClickItem(row.id)}>
                          <span className="hidden md:inline focus:outline-none">Show</span>
                          <EyeIcon className="h-5 w-5 mx-2 md:m-0 md:hidden" />
                      </button>
                      <button className="bg-red-300 p-1 rounded hover:bg-red-400 block cursor-pointer shadow-lg flex-1 flex justify-center" onClick={() => onDeleteItem(row.id)}>
                          <span className="hidden md:inline" >Delete</span>
                          <TrashIcon className="h-5 w-5 mx-2 md:m-0 md:hidden" />
                      </button>
                    </div>
                </td>
              </tr>
              <tr className="border-b-2"></tr>
            </React.Fragment>
          )}
      </tbody>
    </table>
  )
}

export default Table;