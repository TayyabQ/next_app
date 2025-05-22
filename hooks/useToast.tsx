import { useState } from "react";

export default function useToast(duration: number = 1500) {
  const [message, setMessage] = useState<string | null>("");
  const [theme, setTheme] = useState<string>("");

  function showToast(newMessage:string|null,newTheme:string) {
    setMessage(newMessage);
    setTheme(newTheme);

    setTimeout(() => {
      setMessage(null);
    }, duration);
  }

  const Toast = () => {
    return message &&  (
      <div
        className={`bg-${theme}-500 fixed border-1 border-${theme}-600 inset-0 min-w-fit w-60 h-10 self-top mt-10 mx-auto text-center p-2 rounded-lg text-white shadow-md animate`}
      >
        {message}
      </div>
    );
  };

  return {Toast,showToast};
}
