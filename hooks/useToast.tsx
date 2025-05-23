import { useState } from "react";

export default function useToast(duration: number = 1700) {
  const [message, setMessage] = useState<string | null>("");
  const [theme, setTheme] = useState<string>("");

  function showToast(newMessage: string | null, newTheme: string) {
    setMessage(newMessage);
    setTheme(newTheme);

    setTimeout(() => {
      setMessage(null);
    }, duration);
  }

  const Toast = () => {
    let styling;
    if (theme == "blue") {
      styling =
        "bg-blue-600 fixed border-1 border-blue-600 inset-0 min-w-fit w-60 h-10 self-top mt-10 mx-auto text-center text-lg font-medium p-1 rounded-lg text-white shadow-md animate z-20";
    } else if (theme == "green") {
      styling =
        "bg-green-600 fixed border-1 border-green-600 inset-0 min-w-fit w-60 h-10 self-top mt-10 mx-auto text-center text-lg font-medium p-1 rounded-lg text-white shadow-md animate z-20";
    } else {
      styling =
        "bg-gray-600 fixed border-1 border-gray-600 inset-0 min-w-fit w-60 h-10 self-top mt-10 mx-auto text-center text-lg font-medium p-1 rounded-lg text-white shadow-md animate z-20";
    }

    return (
      message && (
        <div
          className={styling}
        >
          {message}
        </div>
      )
    );
  };

  return { Toast, showToast };
}
