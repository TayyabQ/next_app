"use client"

import Image from "next/image";
import ContactModal from "./Modal/contact-modal";
import { useState } from "react";

export default function Contact() {
    const [showModal,setShowModal] = useState<boolean>(false);
    const [message,setMessage] = useState<object>({});
  return (
    <>
      <div className="my-gradient-green w-104 h-124 sm:w-64 sm:h-84 md:w-124 md:h-144 lg:w-164 lg:h-184 pb-2 pr-2 lg:pr-4 lg:pb-4">
        <div className="bg-[url('/ContactUsVector.png')] bg-no-repeat bg-[length:80px] sm:bg-[length:80px] md:bg-[length:100px] lg:bg-[length:180px] bg-right-bottom w-full h-full">
          <div className="place-items-center lg:pt-60 md:pt-45 pt-30">
            <Image
              src={"/ContactUsFrame.png"}
              alt="frame"
              width={60}
              height={60}
            />
            <h1 className="text-white text-xl sm:text-3xl font-semibold mt-5">
              Contact Support
            </h1>
            <p className="text-white text-xs lg:text-lg mb-5">
              Let us know how we can help
            </p>
            <button onClick={(e)=>{
                e.preventDefault()
                setShowModal(true);
            }} className="text-green-500 bg-white py-1 lg:py-2 px-2 lg:px-4 lg:text-lg text-xs font-semibold rounded-lg hover:cursor-pointer ">
              Contact Us
            </button>
          </div>
        </div>
      </div>
      {showModal && <ContactModal setShowModal={setShowModal} message={message} setMessage={setMessage}/>}
    </>
  );
}
