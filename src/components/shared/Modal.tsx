import { useImperativeHandle, useRef, type RefObject } from "react";

interface ModalProps {
  children: React.ReactNode
  ref: RefObject<ModalRef | null>
}

export interface ModalRef {
  open: () => void;
  close: () => void;
}

function Modal({children, ref}: ModalProps) {

  const dialogRef: RefObject<HTMLDialogElement | null> = useRef(null);

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }))

  return (
    <dialog ref={dialogRef} className="rounded-xl mx-auto my-auto">
      <div className="max-w-lg md:max-w-2xl lg:max-w-4xl">
        {children}
      </div>
    </dialog>
  )
}

export default Modal;