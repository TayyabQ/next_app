import { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import * as z from "zod";
import useToast from "@/hooks/useToast";
import Modal from "../../../components/modal";
import Form from "../../../components/form";
import Message from "@/components/message";

export default function ContactForm({
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

  function handleSubmit(data:any) {
    const result = formSchema.safeParse(data);
    if(result.success){
      //usefetch(result.data)
    } else{
      console.log(result.error)
      setError(result.error.format.toString());
    }
  }

  return (
    <div>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >{error && <Message message={error}/>}
        <Form
          heading="Contact Us"
          theme="green"
          entries={[
            {
              label: "Name",
              value: "name",
              type: "text",
              element: "input",
              id: "name",
              placeholder: "Enter your name",
            },
            {
              label: "Email",
              value: "email",
              type: "text",
              element: "input",
              id: "email",
              placeholder: "Enter your email",
            },
            {
              label: "Message",
              value: "message",
              type: "text",
              element: "textarea",
              id: "message",
              placeholder: "Enter your message",
            },
          ]}
          onSubmit={handleSubmit}
        />
      </Modal>
      <Toast />
    </div>
  );
}
