import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
export default function ContactModal({
  message,
  setShowModal,
  setMessage,
}: {
  message: object;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setMessage: Dispatch<SetStateAction<object>>;
}) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [messageBody, setMessageBody] = useState<string>("");

  return (
    <div className="fixed inset-0 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center animate">
      <div className="w-96 sm:w-150 rounded-md bg-gray-50 shadow-lg">
        <div className="flex justify-end ">
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowModal(false);
            }}
            className="hover:bg-gray-200 px-4 py-2 text-base font-medium rounded-md hover:cursor-pointer text-gray-500 font-semibold focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            x
          </button>
        </div>
        <div className="text-center p-8">
          <h3 className="text-2xl font-bold text-green-600">Contact Us</h3>
          <div className="mt-2 px-7 py-3">
            <form
              className="text-left flex flex-col gap-0.5"
              action={() => {
                const newMessage = { name, email, messageBody };
                setMessage(newMessage);
                setName("");
                setEmail("");
                setMessageBody("");
                console.log(newMessage);
                setShowModal(false)
              }}
            >
              <label
                htmlFor="name"
                className="text-lg text-gray-500 font-semibold"
              >
                Name
              </label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                id="name"
                type="text"
                className="bg-white px-2 py-1 text-base rounded-md shadow-sm w-90 sm:w-110 h-10 sm:h-12 my-1 sm:my-2 ml-1 sm:ml-2"
                placeholder="Your Name"
                required
              />
              <label
                htmlFor="email"
                className="text-lg text-gray-500 font-semibold text-left"
              >
                Email
              </label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email"
                type="email"
                className="bg-white px-2 py-1 text-base rounded-md shadow-sm w-90 sm:w-110 h-10 sm:h-12 my-1 sm:my-2 ml-1 sm:ml-2"
                placeholder="Your Email"
                required
              />
              <label
                htmlFor="message"
                className="text-lg text-gray-500 font-semibold text-left"
              >
                Message
              </label>
              <textarea
                value={messageBody}
                onChange={(e) => {
                  setMessageBody(e.target.value);
                }}
                id="message"
                rows={4}
                className="resize-none bg-white p-2 text-base rounded-md shadow-sm w-90 sm:w-110 h-fit my-1 sm:my-2 ml-1 sm:ml-2"
                placeholder="Your Message"
                required
              />
              <button
                type="submit"
                className="mt-3 self-end mr-8 bg-green-600 text-white p-2 text-lg rounded-md hover:cursor-pointer hover:bg-green-600 w-fit"
              >
                submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
