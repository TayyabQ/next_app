"use client";

import Image from "next/image";
import ContactModal from "../Modal/contact-modal";
import { useState } from "react";

export default function Contact() {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <div className="relative flex flex-col w-full md:max-w-[640px] md:min-h-[720px] my-gradient-green overflow-hidden shadow-2xl sm:min-h-screen min-h-150 mb-10 sm:mb-0 pb-3 pr-3">
        <div className="bg-[url('/ContactUsVector.png')] bg-no-repeat bg-[length:80px] sm:bg-[length:80px] md:bg-[length:100px] lg:bg-[length:180px] bg-right-bottom w-full h-full flex flex-col flex-grow justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <Image
              src={"/ContactUsFrame.png"}
              alt="frame"
              width={60}
              height={60}
            />
            <h1 className="text-white text-3xl font-semibold mt-5">
              Contact Support
            </h1>
            <p className="text-white text-lg mb-5">
              Let us know how we can help
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
              className="text-green-500 bg-white py-1 lg:py-2 px-2 lg:px-4 lg:text-xl text-lg font-semibold rounded-lg hover:cursor-pointer "
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
      {showModal && <ContactModal setShowModal={setShowModal} />}
    </>
  );
}
