import { useState } from "react";
import Button from "./button";
import FormField from "./formField";

type FormData = {
  [key: string]: string;
};

interface FormProps {
  entries: {
    label: string;
    value: any;
    type: string;
    element: "input" | "textarea" | null;
    id: string;
    placeholder: string;
  }[];
  heading: string;
  theme: string;
  onSubmit: (data: FormData) => void;
}

export default function Form(props: FormProps) {
  const initialFormData = Object.fromEntries(
    props.entries.map((entry) => [entry.id, ""])
  );

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit(formData); 
  };

  return (
    <>
      <h3 className={`text-2xl font-bold text-center text-${props.theme}-600`}>
        {props.heading}
      </h3>
      <form onSubmit={handleSubmit} className="text-left flex flex-col gap-0.5">
        <div>
          {props.entries.map((entry, index) => (
            <div key={index}>
              <FormField
                label={entry.label}
                element={entry.element}
                type={entry.type}
                id={entry.id}
                value={formData[entry.id]}
                theme={props.theme}
                placeholder={entry.placeholder}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
        <Button label="Submit" theme={props.theme} type={2} />
      </form>
    </>
  );
}
