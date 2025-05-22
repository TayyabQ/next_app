import { ReactNode } from "react";
import { RxCross2 } from "react-icons/rx";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed animate inset-0 z-50 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-[90%] lg:max-w-200">
        <button
          className="absolute top-2 right-2 rounded-full p-1 hover:cursor-pointer outline-none bg-red-500 hover:bg-red-700 text-white"
          onClick={onClose}
        >
          <RxCross2 size={20} />
        </button>
        {children}
      </div>
    </div>
  );
}
