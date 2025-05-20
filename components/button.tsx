interface CustomButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

const Button = ({ label, onClick, className }: CustomButtonProps) => (
  <button onClick={onClick} className={`${className || ""}`}>
    {label}
  </button>
);

export default Button;
