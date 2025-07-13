import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid";

function Pagination() {
  return (
    <div className="flex justify-center mt-5 gap-2 items-center">
      <button className="bg-blue-300 p-2 rounded hover:bg-blue-400 h-10 w-10 cursor-pointer shadow-lg">
        <ArrowLeftIcon/>
      </button>
      <span>1/20</span>
      <button className="bg-blue-300 p-2 rounded hover:bg-blue-400 h-10 w-10 cursor-pointer shadow-lg">
        <ArrowRightIcon/>
      </button>
    </div>
  )
}

export default Pagination;