"use client";

import { Dispatch, SetStateAction } from "react";
import Form from "@/components/form";
import Modal from "../../../components/modal";
import * as z from "zod";
import useFetch from "@/hooks/useFetch";
import useToast from "@/hooks/useToast";

export default function NewsLetterForm({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { fetchdata } = useFetch();
  const { Toast, showToast } = useToast();

  const formSchema = z.object({
    name: z.string().trim().nonempty("Name is required!"),
    email: z.string().email().trim().nonempty("Email is required!"),
  });

  function handleSubmit(data: any) {
    console.log(data);
    const result = formSchema.safeParse(data);
    if (result.success) {
      fetchdata({
        url: "/routes/subscribe",
        method: "POST",
        body: data,
        onSuccess: () => {
          console.log("Subscribed");
          showToast("Subscribed Successfully", "blue");
          setTimeout(() => {
            setShowModal(false);
          }, 2000);
        },
        onFailure: () => {
          console.log("Something went wrong");
          showToast("Something went wrong", "red");
        },
      });
    } else {
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
        <Toast />
        <Form
          heading="Subscribe"
          theme="blue"
          formSchema={formSchema}
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
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
}
