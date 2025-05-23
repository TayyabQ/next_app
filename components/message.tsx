export default function Message({message}:{message:string|undefined}){
  return(
    <div className="bg-red-400 border-red-600 border-3 text-center py-1 px-3 w-fit mx-auto text-white rounded-lg hover:cursor-default select-none">{message}</div>
  )
}
