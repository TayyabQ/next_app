interface CustomButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

const Button = ({ label, onClick, className }: CustomButtonProps) => (
  <button
    onClick={onClick}
    className={`bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-150 ease-in-out shadow-md ${className || ''}`}
  >
    {label}
  </button>
);

export default Button;