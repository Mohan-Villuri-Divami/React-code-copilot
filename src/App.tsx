import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import DynamicForm, { FormField } from "./components/DynamicForm";
import ValidationForm from "./components/ValidationForm";
import ReusableForm from "./components/ReusableForm";
import AutoCompleteExample from "./components/AutoCompleteExample";

const formFields: FormField[] = [
  { name: "firstName", type: "text", label: "First Name", required: true },
  { name: "lastName", type: "text", label: "Last Name", required: true },
  { name: "email", type: "text", label: "Email", required: true },
  { name: "bio", type: "textarea", label: "Bio" },
  {
    name: "gender",
    type: "radio",
    label: "Gender",
    options: ["Male", "Female", "Other"],
  },
  { name: "hobbies", type: "checkbox", label: "Hobbies" },
  {
    name: "country",
    type: "select",
    label: "Country",
    options: ["USA", "Canada", "UK"],
  },
];

function App() {
  const handleFormSubmit = (data: Record<string, any>) => {
    console.log("Form data:", data);
  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "space-evenly",
        flexDirection: "column",
        overflow: "auto",
        marginBottom: "100px",
      }}
    >
      <div>
        <Login />
      </div>
      <div style={{ marginTop: "10px", gap: "5px" }}>
        <h1>Dynamic Form</h1>
        <DynamicForm fields={formFields} onSubmit={handleFormSubmit} />
      </div>
      <div style={{ marginTop: "10px", gap: "5px" }}>
        <ValidationForm />
      </div>
      <div style={{ marginTop: "10px", gap: "5px" }}>
        <h1>Reusable Form</h1>
        <ReusableForm fields={formFields} onSubmit={handleFormSubmit} />
      </div>
      <div style={{ marginTop: "10px", gap: "5px" }}>
        <AutoCompleteExample />
      </div>
    </div>
  );
}

export default App;
