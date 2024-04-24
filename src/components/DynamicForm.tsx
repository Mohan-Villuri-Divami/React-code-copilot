import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface DynamicFormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => void;
}

export interface FormField {
  name: string;
  type: "text" | "textarea" | "checkbox" | "radio" | "select";
  label: string;
  required?: boolean;
  options?: string[]; // For select or radio fields
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit: SubmitHandler<Record<string, any>> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {fields.map((field, index) => (
        <div key={index}>
          <label>{field.label}</label>
          {field.type === "text" && (
            <input
              type="text"
              {...register(field.name, { required: field.required })}
            />
          )}
          {field.type === "textarea" && (
            <textarea
              {...register(field.name, { required: field.required })}
            ></textarea>
          )}
          {field.type === "checkbox" && (
            <input type="checkbox" {...register(field.name)} />
          )}
          {field.type === "radio" && field.options && (
            <>
              {field.options.map((option, idx) => (
                <label key={idx}>
                  <input
                    type="radio"
                    value={option}
                    {...register(field.name)}
                  />
                  {option}
                </label>
              ))}
            </>
          )}
          {field.type === "select" && field.options && (
            <select {...register(field.name, { required: field.required })}>
              {field.options.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
          {errors[field.name] && <span>{field.label} is required</span>}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
