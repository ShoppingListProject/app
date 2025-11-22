import { useEffect, useImperativeHandle, useRef, type RefObject } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  children: React.ReactNode
  ref: RefObject<ModalRef | null>
  onClose: () => void
}

export interface ModalRef {
  open: () => void;
  close: () => void;
}

function Modal({children, ref, onClose}: ModalProps) {

  const dialogRef: RefObject<HTMLDialogElement | null> = useRef(null);

  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current?.showModal(),
    close: () => dialogRef.current?.close(),
  }))

    useEffect(() => {
      const dialog = dialogRef.current;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          onClose();
        }
      };

      if (dialog) {
        dialog.addEventListener('keydown', handleKeyDown);
      }

      return () => {
        if (dialog) {
          dialog.removeEventListener('keydown', handleKeyDown);
        }
      };
  }, [onClose]);

  return ReactDOM.createPortal(
    <dialog ref={dialogRef} className="rounded-xl mx-auto my-auto bg-blue-100">
      <div className="max-w-lg md:max-w-2xl lg:max-w-4xl">
        {children}
      </div>
    </dialog>,
    document.getElementById("root")!
  )
}

export default Modal;