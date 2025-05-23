import { Dispatch, SetStateAction } from "react";
import * as z from "zod";
import useToast from "@/hooks/useToast";
import Modal from "../../../components/modal";
import Form from "../../../components/form";
import useFetch from "@/hooks/useFetch";

export default function ContactForm({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  const formSchema = z.object({
    name: z.string().trim().nonempty("Name cannot be empty!"),
    email: z.string().email().trim().nonempty("Email cannot be empty!"),
    message: z.string().trim().nonempty("Message body cannot be empty!"),
  });

  const { Toast, showToast } = useToast();
  const { fetchdata } = useFetch();

  function handleSubmit(data: any) {
    fetchdata({
      url: "/routes/contact",
      method: "POST",
      body: data,
      onSuccess: () => {
        showToast("Message sent Successfully", "green");
        setTimeout(() => {
          setShowModal(false);
        }, 2000);
      },
      onFailure: () => {
        console.log("Something went wrong");
        showToast("Something went wrong", "red");
      },
    });
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
          heading="Contact Us"
          theme="green"
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
