import Message from "./message";

interface FormFieldProps {
  label: string;
  element: "input" | "textarea" | null;
  type: string;
  id: string;
  value: string;
  theme?: string;
  placeholder?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
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
  error,
}: FormFieldProps) {
  const color = theme ?? "gray";
  let stylings: { input: string; label: string; textarea: string };
  if (color == "blue") {
    stylings = {
      input: `bg-white px-2 py-1 text-base rounded-md shadow-lg border-1 border-blue-500 w-70 w-full h-10 sm:h-12 my-1 sm:my-2 ml-1 sm:ml-2 focus:outline-none text-black focus:border-1 focus:border-blue-600`,
      label: "text-lg text-gray-500 font-semibold",
      textarea: `resize-none min-h-30 bg-white px-2 py-1 text-base rounded-md shadow-lg border-1 border-blue-500 w-70 w-full h-10 sm:h-12 my-1 sm:my-2 ml-1 sm:ml-2 focus:outline-none text-black focus:border-1 focus:border-blue-600`,
    };
  } else if (color == "green") {
    stylings = {
      input: `bg-white px-2 py-1 text-base rounded-md shadow-lg border-1 border-green-500 w-70 w-full h-10 sm:h-12 my-1 sm:my-2 ml-1 sm:ml-2 focus:outline-none text-black focus:border-1 focus:border-green-600`,
      label: "text-lg text-gray-500 font-semibold",
      textarea: `resize-none min-h-30 bg-white px-2 py-1 text-base rounded-md shadow-lg border-1 border-green-500 w-70 w-full h-10 sm:h-12 my-1 sm:my-2 ml-1 sm:ml-2 focus:outline-none text-black focus:border-1 focus:border-green-600`,
    };
  } else {
    stylings = {
      input: `bg-white px-2 py-1 text-base rounded-md shadow-lg border-1 border-gray-500 w-70 w-full h-10 sm:h-12 my-1 sm:my-2 ml-1 sm:ml-2 focus:outline-none text-black focus:border-1 focus:border-gray-600`,
      label: "text-lg text-gray-500 font-semibold",
      textarea: `resize-none min-h-30 bg-white px-2 py-1 text-base rounded-md shadow-lg border-1 border-gray-500 w-70 w-full h-10 sm:h-12 my-1 sm:my-2 ml-1 sm:ml-2 focus:outline-none text-black focus:border-1 focus:border-gray-600`,
    };
  }

  let fieldElement = null;

  if (element === "input") {
    fieldElement = (
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={stylings.input}
        placeholder={placeholder}
      />
    );
  } else if (element === "textarea") {
    fieldElement = (
      <textarea
        rows={4}
        id={id}
        value={value}
        onChange={onChange}
        className={stylings.textarea}
        placeholder={placeholder}
      />
    );
  }

  return (
    <div>
      <label htmlFor={id} className={stylings.label}>
        {label}
      </label>
      {fieldElement}
      {error && <Message message={error} />}
    </div>
  );
}
