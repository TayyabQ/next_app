import React from "react";

interface MainHeadingProps {
  children: React.ReactNode;
  type: "newsletter" | "contact";
}

const MainHeading: React.FC<MainHeadingProps> = ({ children, type }) => {
  if (type === "newsletter") {
    return (
      <div className="flex-grow flex flex-col justify-center items-center p-6 sm:p-8 text-center z-10">
        <div className="text-center flex flex-col items-center">{children}</div>
      </div>
    );
  }

  if (type === "contact") {
    return (
      <div className="bg-[url('/ContactUsVector.png')] bg-no-repeat bg-[length:80px] sm:bg-[length:80px] md:bg-[length:100px] lg:bg-[length:180px] bg-right-bottom w-full h-full flex flex-col flex-grow justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <div className="text-center flex flex-col items-center">
            {children}
          </div>
        </div>
      </div>
    );
  }
};

export default MainHeading;
