// components/ValidationForm.tsx
import React, { useState } from "react";
import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
  isValidPhoneNumber,
} from "../utility/validation";

interface FormState {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
}

const ValidationForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
    username: "",
    phoneNumber: "",
  });

  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const validateForm = (): string[] => {
    const errors: string[] = [];

    if (!isValidEmail(formState.email)) {
      errors.push("Invalid email address.");
    }

    if (!isValidPassword(formState.password)) {
      errors.push(
        "Password must contain at least 8 characters, including uppercase, lowercase, a number, and a special character."
      );
    }

    if (!isValidUsername(formState.username)) {
      errors.push(
        "Username must be between 3 and 20 characters, with only alphanumeric characters or underscores."
      );
    }

    if (!isValidPhoneNumber(formState.phoneNumber)) {
      errors.push(
        "Phone number must contain only digits and be between 10 and 15 characters."
      );
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();

    if (errors.length > 0) {
      setValidationErrors(errors);
    } else {
      // Form submission logic here
      console.log("Form submitted:", formState);
      setValidationErrors([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Validation Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formState.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formState.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formState.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {validationErrors.length > 0 && (
        <div>
          <h3>Errors:</h3>
          <ul>
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ValidationForm;
