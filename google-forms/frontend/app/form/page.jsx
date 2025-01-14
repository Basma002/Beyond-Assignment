"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function FormBuilder() {
  const [fields, setFields] = useState([]);
  const [formTitle, setFormTitle] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const addField = (type) => {
    const newField = {
      id: `${type}-${Date.now()}`,
      type,
      label:
        type === "short-answer"
          ? "Short Answer"
          : type.charAt(0).toUpperCase() + type.slice(1),
      options: ['radio', 'checkbox', 'dropdown'].includes(type) ? ["Option 1"] : null,
    };
    setFields((prev) => [...prev, newField]);
    setDropdownVisible(false); // Close the dropdown after adding a field
  };

  const updateField = (id, updates) => {
    setFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, ...updates } : field))
    );
  };

  const deleteField = (id) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title: formTitle,
          fields: fields,
        }),
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        // Redirect to landing page or handle success
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error("Error during form submission:", err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-blue-400 text-white p-4">
        <h2 className="text-lg font-semibold mb-6 flex items-center">
          <span className="mr-2">📄</span> Form Builder
        </h2>
        <ul className="space-y-4">
          <li className="cursor-pointer">My Forms</li>
          <li className="cursor-pointer">Analytics</li>
          <li className="cursor-pointer">Help & Support</li>
          <li className="cursor-pointer">Logout</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-center p-8">
        <div className="w-full max-w-4xl bg-white border border-gray-300 rounded-lg shadow-lg p-8">
          {/* Card Title */}
          <h1 className="text-2xl font-bold mb-6 text-center border-b pb-4">
            Create New Form
          </h1>

          {/* Form Title */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Untitled Form"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="w-full text-2xl font-semibold border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 mb-4"
            />
          </div>

          {/* Fields */}
          <div className="mb-6">
            {fields.map((field) => (
              <div key={field.id} className="mb-4">
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) =>
                      updateField(field.id, { label: e.target.value })
                    }
                    className="w-full text-lg border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 mb-2"
                  />
                  <button
                    onClick={() => deleteField(field.id)}
                    className="text-red-500 font-bold"
                  >
                    ×
                  </button>
                </div>
                {field.type === "short-answer" && (
                  <input
                    type="text"
                    placeholder="Short Answer"
                    className="w-full border border-gray-300 rounded p-2 mt-2"
                    disabled
                  />
                )}
                {field.type === "dropdown" && (
                  <div className="mt-2">
                    {field.options.map((option, idx) => (
                      <div key={idx} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...field.options];
                            newOptions[idx] = e.target.value;
                            updateField(field.id, { options: newOptions });
                          }}
                          className="w-full border border-gray-300 rounded p-2"
                        />
                        <button
                          onClick={() =>
                            updateField(field.id, {
                              options: field.options.filter(
                                (_, i) => i !== idx
                              ),
                            })
                          }
                          className="text-red-500 font-bold ml-2"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() =>
                        updateField(field.id, {
                          options: [
                            ...field.options,
                            `Option ${field.options.length + 1}`,
                          ],
                        })
                      }
                      className="text-blue-500"
                    >
                      + Add Option
                    </button>
                  </div>
                )}
                {field.type === "checkbox" && (
                  <div className="mt-2">
                    {field.options.map((option, idx) => (
                      <div key={idx} className="flex items-center mb-2">
                        <input type="checkbox" disabled className="mr-2" />
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...field.options];
                            newOptions[idx] = e.target.value;
                            updateField(field.id, { options: newOptions });
                          }}
                          className="w-full border border-gray-300 rounded p-2"
                        />
                        <button
                          onClick={() =>
                            updateField(field.id, {
                              options: field.options.filter(
                                (_, i) => i !== idx
                              ),
                            })
                          }
                          className="text-red-500 font-bold ml-2"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() =>
                        updateField(field.id, {
                          options: [
                            ...field.options,
                            `Option ${field.options.length + 1}`,
                          ],
                        })
                      }
                      className="text-blue-500"
                    >
                      + Add Option
                    </button>
                  </div>
                )}

{field.type === "radio" && (
                  <div className="mt-2">
                    {field.options.map((option, idx) => (
                      <div key={idx} className="flex items-center mb-2">
                        <input type="radio" disabled className="mr-2" />
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...field.options];
                            newOptions[idx] = e.target.value;
                            updateField(field.id, { options: newOptions });
                          }}
                          className="w-full border border-gray-300 rounded p-2"
                        />
                        <button
                          onClick={() =>
                            updateField(field.id, {
                              options: field.options.filter(
                                (_, i) => i !== idx
                              ),
                            })
                          }
                          className="text-red-500 font-bold ml-2"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() =>
                        updateField(field.id, {
                          options: [
                            ...field.options,
                            `Option ${field.options.length + 1}`,
                          ],
                        })
                      }
                      className="text-blue-500"
                    >
                      + Add Option
                    </button>
                  </div>
                )}

              </div>
            ))}
            {fields.length === 0 && (
              <p className="text-center text-gray-500">No fields added yet</p>
            )}
          </div>

          {/* Add Field Dropdown */}
          <div className="relative mb-6 text-center">
            <Button
              onClick={() => setDropdownVisible((prev) => !prev)}
              className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-700"
            >
              + Add New Field
            </Button>
            {dropdownVisible && (
              <div className="absolute mt-2 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded shadow-lg">
                <button
                  onClick={() => addField("short-answer")}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Short Answer
                </button>
                <button
                  onClick={() => addField("dropdown")}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Dropdown
                </button>
                <button
                  onClick={() => addField("checkbox")}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Checkbox
                </button>

                <button
                  onClick={() => addField("radio")}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                  Radio button
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              onClick={handleSubmitForm}
              className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
            >
              Publish Form
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
