import { Dispatch, SetStateAction } from "react";

export default function ContactModal({
  setShowModal,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="fixed inset-0 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 w-96 shadow-lg rounded-md bg-white">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-green-500">Contact Us</h3>
          <div className="mt-2 px-7 py-3">
            <label className="text-lg text-green-500">Name</label>
            <p className="text-lg text-green-500">Modal Body</p>
            <label className="text-lg text-green-500">Email</label>
            <p className="text-lg text-green-500">Modal Body</p>
            <label className="text-lg text-green-500">Message</label>
            <p className="text-lg text-green-500">Modal Body</p>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowModal(false);
              }}
              className="hover:cursor-pointer px-4 py-2 bg-green-400 text-white text-base font-medium rounded-md shadow-sm hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
