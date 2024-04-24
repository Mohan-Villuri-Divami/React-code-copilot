// components/ReusableForm.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";

// Define field types for the form
type FieldType = "text" | "textarea" | "checkbox" | "radio" | "select";

// Interface for each form field definition
interface FormField {
  name: string;
  label: string;
  type: FieldType;
  options?: string[]; // Used for select and radio fields
  defaultValue?: string;
}

// Props for the reusable form component
interface ReusableFormProps {
  fields: FormField[];
  onSubmit: (formData: Record<string, string>) => void; // Callback for form submission
}

const ReusableForm: React.FC<ReusableFormProps> = ({ fields, onSubmit }) => {
  const initialFormState = fields.reduce(
    (acc, field) => {
      acc[field.name] = field.defaultValue || "";
      return acc;
    },
    {} as Record<string, string>
  );

  const [formData, setFormData] = useState(initialFormState);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // Trigger form submission callback
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>
          {field.type === "text" && (
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleInputChange}
            />
          )}
          {field.type === "textarea" && (
            <textarea
              name={field.name}
              value={formData[field.name]}
              onChange={handleInputChange}
            />
          )}
          {field.type === "checkbox" && (
            <input
              type="checkbox"
              name={field.name}
              checked={formData[field.name] === "true"}
              onChange={(e) => {
                const checked = e.target.checked ? "true" : "false";
                setFormData((prev) => ({
                  ...prev,
                  [field.name]: checked,
                }));
              }}
            />
          )}
          {field.type === "radio" &&
            field.options?.map((option) => (
              <div key={option}>
                <input
                  type="radio"
                  name={field.name}
                  value={option}
                  checked={formData[field.name] === option}
                  onChange={handleInputChange}
                />
                {option}
              </div>
            ))}
          {field.type === "select" && (
            <select
              name={field.name}
              value={formData[field.name]}
              onChange={handleInputChange}
            >
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReusableForm;
