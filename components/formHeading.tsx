export default function FormHeading({value,color}:{value:string,color:string}){
  let styling;
  if(color=="blue"){
    styling = "text-2xl font-bold text-center text-blue-600"
  } else if(color=="green"){
    styling = "text-2xl font-bold text-center text-green-600"
  } else{
    styling = "text-2xl font-bold text-center text-gray-600"
  }
  return(
    <>
      <div className={styling}>{value}</div>
    </>
  )
}
