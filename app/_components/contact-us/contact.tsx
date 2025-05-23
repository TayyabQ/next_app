"use client";

import ContactForm from "./contact-form";
import { useState } from "react";
import Button from "../../../components/button";

import MainHeading from "@/components/main_heading";
import Heading from "@/components/heading";
import Subheading from "@/components/subheading";
import Icon from "@/components/icon";

export default function Contact() {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <div className="relative flex flex-col w-full my-gradient-green overflow-hidden shadow-2xl sm:min-h-screen min-h-150 pb-3 pr-3">
       
          
            <MainHeading type="contact">
              <Icon
                src="/ContactUsFrame.png"
                alt="Message Icon"
                className="mb-5"
              />
              <Heading
                text="Contact Support"
                className="text-white text-3xl 2xl:text-4xl font-semibold"
              />
              <Subheading
                text="Let us know how we can help"
                className="text-white text-lg 2xl:text-xl mb-5"
              />
              <Button
                label="Contact Us"
                theme="green"
                type={1}
                func={(e) => {
                  e.preventDefault();
                  setShowModal(true);
                }}
              />
            </MainHeading>
      </div>
      {showModal && (
        <ContactForm showModal={showModal} setShowModal={setShowModal} />
      )}
    </>
  );
}
