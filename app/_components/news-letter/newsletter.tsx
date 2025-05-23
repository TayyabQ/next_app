"use client";

import Button from "@/components/button";
import { useState } from "react";
import NewsLetterForm from "./newsletter-form";

export default function NewsLetter() {
  const [showModal, setShowModal] = useState<boolean>(false);

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
      setShowModal(false);
    } catch (error: any) {
      console.error("Subscription submission failed:", error);
    }
  };

  return (
    <>
      <div className="relative flex flex-col sm:min-h-screen min-h-150 w-full bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] overflow-hidden shadow-2xl">
        <div className="flex-grow flex flex-col justify-center items-center p-6 sm:p-8 text-center z-10">
          <img
            src="/NewsletterFrame.png"
            alt="Message Icon"
            width={60}
            height={60}
            className="mb-5"
          />
          <h1 className="font-semibold text-3xl 2xl:text-4xl text-white ">
            Join Our Newsletter
          </h1>
          <p className="text-lg 2xl:text-xl text-neutral-100 mb-5">
            Stay updated with our latest news and offers!
          </p>
          <Button
            label="Subscribe"
            theme="blue"
            type={1}
            func={() => {
              setShowModal(true);
            }}
          />
        </div>
        {showModal && (
          <NewsLetterForm showModal={showModal} setShowModal={setShowModal} />
        )}

        <div className="absolute bottom-0 left-0 p-3 sm:p-5 opacity-80">
          <img
            src="/NewsletterIcon.png"
            alt="Decorative newsletter graphic"
            width={185}
            height={181}
            className="w-28 h-auto sm:w-36 md:w-[185px]"
          />
        </div>
      </div>
    </>
  );
}
