import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import * as z from "zod";
import useToast from "@/hooks/useToast";
import Modal from "../../../components/modal";
import Button from "@/components/button";

export default function ContactModal({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
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
        showToast("Successfully sent the message!", "green");
      }
    } catch (err) {
      console.log("Something went wrong:", err);
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
    <div>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <h3 className="text-2xl font-bold text-center text-green-600">
          Contact Us
        </h3>
        <form
          className="text-left flex flex-col gap-0.5"
          action={handleSubmission}
        >
          <label htmlFor="name" className="text-lg text-gray-500 font-semibold">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            id="name"
            type="text"
            className="bg-white px-2 py-1 text-base rounded-md shadow-lg border-1 border-green-500 w-70 w-full h-10 sm:h-12 my-1 sm:my-2 ml-1 sm:ml-2 focus:outline-none text-black focus:border-1 focus:border-green-600"
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
            className="bg-white px-2 py-1 text-base rounded-md text-black shadow-lg border-1 border-green-500 w-70 w-full h-10 sm:h-12 my-1 sm:my-2 ml-1 sm:ml-2 focus:outline-none focus:border-1 focus:border-green-600"
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
            className="resize-none bg-white p-2 text-base rounded-md shadow-sm text-blalg border-1 border-green-500 w-70 w-full h-fit my-1 sm:my-2 ml-1 sm:ml-2 focus:outline-none focus:border-1 focus:border-green-600"
            placeholder="Your Message"
            required
          />
         <Button label="Submit" theme="green" type={2}/>
        </form>
      </Modal>
      <Toast />
    </div>
  );
}
