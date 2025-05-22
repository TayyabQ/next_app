import Button from "./button";
import FormField from "./formField";

interface FormProps {
  entries: {
    label: string;
    value: any;
    type: string;
    element: "input" | "textarea" | null;
    id: string;
    placeholder: string;
  }[];
  heading:string;
  theme: string;
  onSubmit: (data: { name: string; email: string }) => void;
}

export default function Form(props: FormProps) {
  const handleSubmit = () => {};

  return (
    <>
      <h3 className="text-2xl font-bold text-center text-blue-600">
        {props.heading}
      </h3>
      <form onSubmit={handleSubmit} className="text-left flex flex-col gap-0.5">
        <div>
          {props.entries.map((key, index) => (
            <div key={index}>
              <FormField
                label={key.label}
                element={key.element}
                type={key.type}
                id={key.id}
                value={key.value}
                theme={props.theme}
                placeholder={key.placeholder}
                onChange={(e) => {}}
              />
            </div>
          ))}
        </div>
        <Button label={"Submit"} theme={props.theme} type={2} />
      </form>
    </>
  );
}
