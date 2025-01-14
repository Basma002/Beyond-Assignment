"use client";

import React, { useState } from "react";

export default function DynamicForm({ fields, formTitle, formId }) {
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  
    try {
      const response = await fetch(`http://localhost:5000/api/forms/${formId}/responses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: formData, 
        }),
      }); 
  
      if (response.ok) {
        alert("Form submitted successfully!");
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || "Unexpected error occurred"}`);
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">{formTitle}</h1>
      {fields.map((field) => {
        switch (field.type) {
          case "short-answer":
            return (
              <div key={field.id} className="mb-6">
                <label htmlFor={field.id} className="block font-semibold mb-2">
                  {field.label}
                </label>
                <input
                  id={field.id}
                  name={field.id}
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                />
              </div>
            );
          case "radio" || "checkbox":
            return (
              <div key={field.id} className="mb-6">
                <label className="block font-semibold mb-2">{field.label}</label>
                <div className="space-y-2">
                  {field.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type={field.type}
                        id={`${field.id}-${index}`}
                        name={field.id}
                        value={option}
                        className="cursor-pointer focus:ring-2 focus:ring-blue-500"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor={`${field.id}-${index}`}
                        className="cursor-pointer text-gray-700"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            );
          case "dropdown":
            return (
              <div key={field.id} className="mb-6">
                <label className="block font-semibold mb-2">{field.label}</label>
                <div className="space-y-2">
                  <select id={field.id} name={field.id} className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange}>
                    <option value="" disabled selected>Select your option</option>
                    {field.options.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            )  
          default:
            return (
              <div key={field.id} className="text-red-500">
                Unsupported field type: {field.type}
              </div>
            );
        }
      })}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
      >
        Submit
      </button>
    </form>
  );
}
