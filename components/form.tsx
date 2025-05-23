import { useState } from "react";
import Button from "./button";
import FormField from "./formField";
import FormHeading from "./formHeading";
import { ZodTypeAny, ZodError } from "zod";

type FormData = {
  [key: string]: string;
};

type FormErrors = {
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
  formSchema?: ZodTypeAny;
}

export default function Form(props: FormProps) {
  const [errors, setErrors] = useState<FormErrors>({});

  const initialFormData = Object.fromEntries(
    props.entries.map((entry) => [entry.id, ""])
  );

  const [formData, setFormData] = useState<FormData>(initialFormData);

  function extractErrors(error: ZodError): FormErrors {
    const errorMap: FormErrors = {};

    error.issues.forEach((issue) => {
      const key = issue.path[0]?.toString();
      if (key) {
        errorMap[key] = issue.message;
      }
    });

    return errorMap;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!props.formSchema) return;

    const result = props.formSchema.safeParse(formData);

    if (result.success) {
      setErrors({});
      props.onSubmit(formData);
    } else {
      const parsedErrors = extractErrors(result.error);
      setErrors(parsedErrors);
    }
  };

  return (
    <>
      <FormHeading value={props.heading} color={props.theme} />
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
                error={errors[entry.id]}
              />
            </div>
          ))}
        </div>
        <Button label="Submit" theme={props.theme} type={2} />
      </form>
    </>
  );
}
