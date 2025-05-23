"use client";

import Button from "@/components/button";
import Form from "./newsletter-form";
import { useState } from "react";

import MainHeading from "@/components/main_heading";
import Heading from "@/components/heading";
import Subheading from "@/components/subheading";
import Icon from "@/components/icon";

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

  return (
    <>
      <div className="relative flex flex-col sm:min-h-screen min-h-150 w-full bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] overflow-hidden shadow-2xl">
        <MainHeading type="newsletter">
            <Icon
              src="/NewsletterFrame.png"
              alt="Message Icon"
              className="mb-5"
            />
            <Heading
              text="Join Our Newsletter"
              className="text-white text-3xl 2xl:text-4xl font-semibold"
            />
            <Subheading
              text="Stay updated with our latest news and offers!"
              className="text-white text-lg 2xl:text-xl mb-5"
            />
            <Button
              label="Subscribe"
              theme="blue"
              type={1}
              func={handleSubscribeClick}
            />
          </MainHeading>
        </div>

        <Form
          nameLabel="Your Name"
          emailLabel="Your Email Address"
          showForm={showForm}
          setShowForm={setShowForm}
          onSubmit={handleFormSubmit}
        />

        <div className="absolute bottom-0 left-0 p-3 sm:p-5 opacity-80">
          <img
            src="/NewsletterIcon.png"
            alt="Decorative newsletter graphic"
            width={185}
            height={181}
            className="w-28 h-auto sm:w-36 md:w-[185px]"
          />
      </div>
    </>
  );
}
