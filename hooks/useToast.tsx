import { useState } from "react"

export default function useToast({message,theme}:{message:string,theme:string}){
  
  const [showMessage,setShowMessage] = useState<boolean>(true);
  setTimeout(()=>setShowMessage(false),1500)

  return showMessage && (
    <div className={`bg-${theme}-500 fixed border-1 border-${theme}-600 inset-0 w-60 h-10 self-top mt-10 mx-auto text-center p-2 rounded-lg text-white shadow-md animate`}>
      {message}
    </div>
  )
}
