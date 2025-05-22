import { ReactNode } from "react";

export default function Modal({children}:{children:ReactNode}){
  return(
    <div className="fixed inset-0 backdrop-blur-sm overflow-y-auto h-full w-full flex items-center justify-center animate z-100">
      {children}
    </div>
  )
}
