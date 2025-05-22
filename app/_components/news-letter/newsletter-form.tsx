"use client";

import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import Modal from "../../../components/modal";
import Button from '../../../components/button';

interface FormProps {
  nameLabel: string;
  emailLabel: string;
  onSubmit: (data: { name: string; email: string }) => void;
  showForm: boolean;
  setShowForm: Dispatch<SetStateAction<boolean>>;
}

export default function Form({
  nameLabel,
  emailLabel,
  onSubmit,
  showForm,
  setShowForm,
}: FormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert("Please fill in all fields.");
      return;
    }
    onSubmit({ name, email });
  };

  return (
    <Modal
      isOpen={showForm}
      onClose={() => {
        setShowForm(false);
      }}
    >
      <h3 className="text-2xl font-bold text-center text-blue-600">
        Subscribe
      </h3>
      <form onSubmit={handleSubmit} className="p-4">
        <div>
          <label
            htmlFor="form-name"
            className="btext-lg text-gray-500 font-semibold"
          >
            {nameLabel}
          </label>
          <input
            type="text"
            id="form-name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-white px-2 py-1 text-base rounded-md shadow-lg border-1 border-blue-500 w-70 w-full h-10 sm:h-12 my-1 sm:my-2 ml-1 sm:ml-2 focus:outline-none text-black focus:border-1 focus:border-blue-600"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label
            htmlFor="form-email"
            className="text-lg text-gray-500 font-semibold"
          >
            {emailLabel}
          </label>
          <input
            type="email"
            id="form-email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white px-2 py-1 text-base rounded-md shadow-lg border-1 border-blue-500 w-70 w-full h-10 sm:h-12 my-1 sm:my-2 ml-1 sm:ml-2 focus:outline-none text-black focus:border-1 focus:border-blue-600"
            placeholder="Enter your email"
          />
        </div>
        <div className="flex justify-center space-x-3 pt-2">
          <Button label={"Submit"} theme={"blue"}  type={2}/>
        </div>
      </form>
    </Modal>
  );
}
