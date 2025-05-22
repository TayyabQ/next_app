import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import SuccessMessage from "./success-message";
import FailMessage from "./fail-message";
import * as z from "zod";
import useToast from "@/hooks/useToast";

export default function ContactModal({
  setShowModal,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  const formSchema = z.object({
    name: z.string().nonempty("Name cannot be empty!"),
    email: z.string().email().nonempty("Email cannot be empty!"),
    message: z.string().nonempty("Message body cannot be empty!"),
  });

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string | undefined>("");
  const { Toast, showToast } = useToast();

  async function handleAPI(newMessage: object) {
    try {
      const response = await fetch("/routes/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });
      if (!response.ok) {
        console.log("fail toast block reached");
        showToast("Something went wrong", "red");
      } else {
        console.log("hi");
        setName("");
        setEmail("");
        setMessage("");
        showToast("Successfully sent the message!","green")
      }
    } catch (err) {
      console.log("Something went wrong: ", err);
    }
  }

  function handleSubmission() {
    const newMessage = { name, email, message };
    const result = formSchema.safeParse(newMessage);
    if (result.success) {
      handleAPI(newMessage);
    } else {
      console.log("Validation Error: ", result.error.format());
      const newError = result.error.format().email?._errors[0];
      setError(newError);
    }
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center animate z-100">
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
        <div className="text-center lg:p-8 p-4">
          <h3 className="text-2xl font-bold text-green-600">Contact Us</h3>
          <div className="mt-2 px-7 py-3">
            <form
              className="text-left flex flex-col gap-0.5"
              action={handleSubmission}
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
                className="bg-white px-2 py-1 text-base rounded-md shadow-sm w-70 sm:w-110 h-10 sm:h-12 my-1 sm:my-2 ml-1 sm:ml-2 focus:outline-none text-black focus:border-1 focus:border-green-600"
                placeholder="Your Name"
                required
              />
              <label
                htmlFor="email"
                className="text-lg text-gray-500 font-semibold text-left"
              >
                Email
              </label>
              {error && <p className="text-red-500">{error}</p>}
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                id="email"
                type="email"
                className="bg-white px-2 py-1 text-base rounded-md text-black shadow-sm w-70 sm:w-110 h-10 sm:h-12 my-1 sm:my-2 ml-1 sm:ml-2 focus:outline-none focus:border-1 focus:border-green-600"
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
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                id="message"
                rows={4}
                className="resize-none bg-white p-2 text-base rounded-md shadow-sm text-black w-70 sm:w-110 h-fit my-1 sm:my-2 ml-1 sm:ml-2 focus:outline-none focus:border-1 focus:border-green-600"
                placeholder="Your Message"
                required
              />
              <button
                type="submit"
                className="mt-3 self-center bg-green-600 text-white p-2 text-lg rounded-md hover:cursor-pointer hover:bg-green-600 w-fit "
              >
                submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Toast />
      {/* {success && <SuccessMessage />}
      {fail && <FailMessage />} */}
    </div>
  );
}
