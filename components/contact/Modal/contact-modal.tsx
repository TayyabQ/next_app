import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import SuccessMessage from "../messages/success-message";
import FailMessage from "../messages/fail-message";
import * as z from "zod";

export default function ContactModal({
  setShowModal,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  const formSchema = z.object({
    name: z.string().nonempty("Name cannot be empty!"),
    email: z.string().email().nonempty("Email cannot be empty!"),
    messageBody: z.string().nonempty("Message body cannot be empty!"),
  });

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [messageBody, setMessageBody] = useState<string>("");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [fail, setFail] = useState<boolean>(false);
  const [message, setMessage] = useState<object>({});

  async function handleAPI() {
  
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Server error:", result.error || `Request failed: ${response.status}`);
      setFail(true);
      setTimeout(() => { setFail(false); }, 300);
      return;
    }

    console.log("Message sent successfully:", result.message || result);
    setSuccess(true);
    setTimeout(() => { setSuccess(false); }, 300);

  } catch (error) {
    console.error("API call error:", error);
    setFail(true);
    setTimeout(() => { setFail(false); }, 300);
  }
}

  function handleSubmission() {
    const newMessage = { name, email, messageBody };
    const result = formSchema.safeParse(newMessage);
    if (result.success) {
      setMessage(newMessage);
      setName("");
      setEmail("");
      setMessageBody("");
      console.log("Values are: " , newMessage);
      handleAPI();
      setShowModal(false);
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
                className="bg-white px-2 py-1 text-base rounded-md shadow-sm w-70 sm:w-110 h-10 sm:h-12 my-1 sm:my-2 ml-1 sm:ml-2 focus:outline-none focus:border-1 focus:border-green-600"
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
                className="bg-white px-2 py-1 text-base rounded-md shadow-sm w-70 sm:w-110 h-10 sm:h-12 my-1 sm:my-2 ml-1 sm:ml-2 focus:outline-none focus:border-1 focus:border-green-600"
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
                className="resize-none bg-white p-2 text-base rounded-md shadow-sm w-70 sm:w-110 h-fit my-1 sm:my-2 ml-1 sm:ml-2 focus:outline-none focus:border-1 focus:border-green-600"
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

      {success && <SuccessMessage />}
      {fail && <FailMessage />}
    </div>
  );
}
