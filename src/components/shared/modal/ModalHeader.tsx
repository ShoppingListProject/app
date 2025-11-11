import { XMarkIcon } from "@heroicons/react/16/solid";

interface ModalHeaderProps {
  title: string,
  isEditMode: boolean,
  onChangeTitle: (newTitle: string) => void,
  onClose: () => void,
}

function ModalHeader({title, isEditMode, onChangeTitle, onClose}: ModalHeaderProps) {
  return (
    <>
      <div className="relative">

        <button className="bg-red-400 p-1 roudned-br-lg h-7 w-7 hover:bg-red-500 absolute top-0 right-0 rounded-bl-xl cursor-pointer" onClick={onClose}>
          <XMarkIcon />
        </button>

        <div className="flex justify-center p-1">

          {!isEditMode && <h1
           className="text-3xl px-10 py-3 block text-center" >
            {title}
          </h1>}
          
          {isEditMode && <input
            type="text"
            value={title} 
            className="border rounded text-3xl px-10 py-3 text-center leading-tight" 
            onChange={(e) => onChangeTitle(e.target.value)}
          />}
          
        </div>

      </div>
      <div className="border-b-4"></div>
    </>
  )
}

export default ModalHeader;