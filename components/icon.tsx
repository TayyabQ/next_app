interface IconProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ src, alt, width = 60, height = 60, className }) => {
  return <img src={src} alt={alt} width={width} height={height} className={className} />;
};

export default Icon;