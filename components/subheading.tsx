interface SubheadingProps {
  text: string;
  className?: string;
}

const Subheading: React.FC<SubheadingProps> = ({ text, className }) => {
  return <p className={className}>{text}</p>;
};

export default Subheading;