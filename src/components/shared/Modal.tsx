import { XMarkIcon } from "@heroicons/react/16/solid";
import { useImperativeHandle, useRef, type RefObject } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  children: React.ReactNode
  ref: RefObject<ModalRef | null>
  title: string | null
}

export interface ModalRef {
  open: () => void;
  close: () => void;
}

function Modal({children, ref, title}: ModalProps) {

  const dialogRef: RefObject<HTMLDialogElement | null> = useRef(null);

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }))

  return ReactDOM.createPortal(
    <dialog ref={dialogRef} className="rounded-xl mx-auto my-auto bg-blue-100">
      <div className="max-w-lg md:max-w-2xl lg:max-w-4xl">
        <div className="relative">
          <button className="bg-red-400 p-1 roudned-br-lg h-7 w-7 hover:bg-red-500 absolute top-0 right-0 rounded-bl-xl cursor-pointer" onClick={() => dialogRef.current?.close()}>
            <XMarkIcon />
          </button>
          <h1 className="text-3xl px-10 py-3 block text-center" >{title}</h1>  
        </div>
        <div className="border-b-4"></div>
        {children}
      </div>
    </dialog>,
    document.getElementById("root")!
  )
}

export default Modal;