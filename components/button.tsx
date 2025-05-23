interface CustomButtonProps {
  label: string;
  theme?: string;
  type?: number;
  func?: (e:any)=> void;
}

const Button = ({ label, theme , type , func }: CustomButtonProps) => {
  let styling : string = "";
  let color:string = theme == "green"? "green" : "blue";
  if(!theme){
    color = "gray";
  }
  if(type==1){
    styling = `text-${color}-500 bg-white py-1 lg:py-2 px-2 lg:px-4 lg:text-xl text-lg 2xl:text-2xl font-semibold rounded-lg hover:cursor-pointer`
  } else if (type==2){
    styling = `mt-3 self-center bg-${color}-600 text-white p-2 lg:px-5 lg:w-60 md:w-40 sm:w-40 text-lg rounded-md hover:cursor-pointer hover:bg-${color}-800 w-fit font-semibold`
  }
  return (
  <button className={styling} onClick={func}>
    {label}
  </button>
);}

export default Button;
