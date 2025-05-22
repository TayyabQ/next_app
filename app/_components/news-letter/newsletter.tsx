"use client";

import Form from "../../../components/form";
import { useState } from "react";

export default function NewsLetter() {
  const [showForm, setShowForm] = useState(false);

  const handleSubscribeClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (formData: {
    name: string;
    email: string;
  }) => {
    try {
      const response = await fetch("/routes/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(
          result.error || `Server responded with ${response.status}`
        );
      }

      console.log("Subscription successful:", result);
      setShowForm(false);
    } catch (error: any) {
      console.error("Subscription submission failed:", error);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <>
      <div className="relative flex flex-col sm:min-h-screen min-h-150 w-full md:max-w-[640px] md:min-h-[720px] bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] overflow-hidden shadow-2xl">
        <div className="flex-grow flex flex-col justify-center items-center p-6 sm:p-8 text-center z-10">
          <img src="/NewsletterFrame.png" alt="Message Icon" width={60} height={60} className="mb-5"/>
          <h1 className="font-semibold text-3xl text-white ">Join Our Newsletter</h1>
          <p className="text-lg text-neutral-100 mb-5">Stay updated with our latest news and offers!</p>
          <button onClick={handleSubscribeClick} className="text-blue-500 bg-white py-1 lg:py-2 px-2 lg:px-4 lg:text-xl text-lg font-semibold rounded-lg hover:cursor-pointer">Subscribe</button>
        </div>

        {showForm && (
          <div className="fixed inset-0 flex flex-col justify-center items-center z-20 p-4 backdrop-blur-sm">
            <Form nameLabel="Your Name" emailLabel="Your Email Address" onSubmit={handleFormSubmit} onClose={handleFormClose}/>
          </div>
        )}

        <div className="absolute bottom-0 left-0 p-3 sm:p-5 opacity-80">
          <img src="/NewsletterIcon.png" alt="Decorative newsletter graphic" width={185} height={181} className="w-28 h-auto sm:w-36 md:w-[185px]"/>
        </div>
      </div>
    </>
  );
}
