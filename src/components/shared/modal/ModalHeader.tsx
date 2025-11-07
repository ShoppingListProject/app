import { XMarkIcon } from "@heroicons/react/16/solid";

interface ModalHeaderProps {
  title: string,
  onClose: () => void,
}

function ModalHeader({title, onClose}: ModalHeaderProps) {
  return (
    <>
      <div className="relative">
        <button className="bg-red-400 p-1 roudned-br-lg h-7 w-7 hover:bg-red-500 absolute top-0 right-0 rounded-bl-xl cursor-pointer" onClick={onClose}>
          <XMarkIcon />
        </button>
        <h1 className="text-3xl px-10 py-3 block text-center" >{title}</h1>  
      </div>
      <div className="border-b-4"></div>
    </>
  )
}

export default ModalHeader;