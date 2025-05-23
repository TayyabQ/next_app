"use client";

import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import Form from "@/components/form";
import Modal from "../../../components/modal";

export default function NewsLetterForm({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert("Please fill in all fields.");
      return;
    }
  };

  return (
    <div>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
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
            }
          ]}
          onSubmit={() => {}}
        />
      </Modal>
    </div>
  );
}
