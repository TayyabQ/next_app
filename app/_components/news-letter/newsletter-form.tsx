"use client";

import { Dispatch, SetStateAction,useState } from "react";
import Form from "@/components/form";
import Modal from "../../../components/modal";
import * as z from "zod";
import Message from "@/components/message";

export default function NewsLetterForm({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [error, setError] = useState<string | undefined>("");

  const formSchema = z.object({
    name: z.string().nonempty("Name is required!"),
    email: z.string().nonempty("Email is required!"),
  });

  function handleSubmit(data: any) {
    const result = formSchema.safeParse(data);
    if (result.success) {
      //usefetch(result.data)
    } else {
      console.log(result.error);
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
          heading="Subscribe"
          theme="blue"
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
          ]}
          onSubmit={() => {}}
        />
      </Modal>
    </div>
  );
}
