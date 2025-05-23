"use client";

import ContactForm from "./contact-form";
import Image from "next/image";
import { useState } from "react";
import Button from "../../../components/button";

export default function Contact() {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <div className="relative flex flex-col w-full my-gradient-green overflow-hidden shadow-2xl sm:min-h-screen min-h-150 pb-3 pr-3">
        <div className="bg-[url('/ContactUsVector.png')] bg-no-repeat bg-[length:80px] sm:bg-[length:80px] md:bg-[length:100px] lg:bg-[length:180px] bg-right-bottom w-full h-full flex flex-col flex-grow justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <Image
              src={"/ContactUsFrame.png"}
              alt="frame"
              width={60}
              height={60}
            />
            <h1 className="text-white text-3xl 2xl:text-4xl font-semibold mt-5">
              Contact Support
            </h1>
            <p className="text-white text-lg 2xl:text-xl mb-5">
              Let us know how we can help
            </p>
            <Button
              label="Contact Us"
              theme="green"
              type={1}
              func={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
            />
          </div>
        </div>
      </div>
      {showModal && (
        <ContactForm showModal={showModal} setShowModal={setShowModal} />
      )}
    </>
  );
}
