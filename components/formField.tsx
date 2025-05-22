interface FormFieldProps {
  label: string;
  element: "input"|"textarea"|null;
  type: string;
  id: string;
  value: string;
  theme?: string;
  placeholder?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function FormField({
  label,
  element,
  type,
  id,
  value,
  theme,
  placeholder,
  onChange,
}: FormFieldProps) {
  const color = theme ?? "gray";
  const stylings = {
    input: `bg-white px-2 py-1 text-base rounded-md shadow-lg border-1 border-${color}-500 w-70 w-full h-10 sm:h-12 my-1 sm:my-2 ml-1 sm:ml-2 focus:outline-none text-black focus:border-1 focus:border-${color}-600`,
    label: "text-lg text-gray-500 font-semibold",
  };
  return (
    <div>
      <label htmlFor={id} className={stylings.label}>
        {label}
      </label>
      {element == "input" ? (
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          className={stylings.input}
          placeholder={placeholder}
        />
      ) : (
        <textarea
          rows={4}
          id={id}
          value={value}
          onChange={onChange}
          className={stylings.input}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
