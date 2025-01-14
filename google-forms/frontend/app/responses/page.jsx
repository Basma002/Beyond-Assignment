"use client";

import { useState, useEffect } from "react";
import SidebarLayout from "@/components/ui/SidebarLayout";

export default function ResponsesPage() {
  const [forms, setForms] = useState([]); // List of forms
  const [selectedForm, setSelectedForm] = useState(null); // Selected form with fields
  const [responses, setResponses] = useState([]); // Responses for the selected form
  const [error, setError] = useState(null);
  useEffect(() => {
    // Fetch all forms
    const fetchForms = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/forms", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setForms(data);
          setError(null);
        } else {
          const errorText = await response.text();
          setError(`Error: ${errorText}`);
        }
      } catch (err) {
        setError(`Error: ${err.message}`);
      }
    };

    fetchForms();
  }, []);

  const handleFormClick = async (form) => {
    setSelectedForm(form); // Set the selected form
    setResponses([]); // Clear previous responses

    try {
      const response = await fetch(
        `http://localhost:5000/api/forms/${form.id}/responses`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResponses(data.responses);
      } else {
        const errorText = await response.text();
        setError(`Error: ${errorText}`);
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
  };

  const getQuestionLabel = (fieldId) => {
    const field = selectedForm.fields.find((field) => field.id === fieldId);
    return field ? field.label : fieldId; // Return label or fallback to fieldId
  };

  return (
    <SidebarLayout>
      <h1 className="text-2xl font-bold mb-6">Form Responses</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div>
        {selectedForm === null ? (
          <div>
            {forms.length === 0 && !error && (
              <div className="text-gray-600">No forms found.</div>
            )}
            <div className="space-y-4">
              {forms.map((form) => (
                <div
                  key={form.id}
                  className="cursor-pointer p-4 bg-white shadow rounded border hover:bg-gray-50"
                  onClick={() => handleFormClick(form)}
                >
                  <h2 className="font-bold text-lg">{form.title}</h2>
                  <p className="text-gray-600">
                    {form.fields.length} field(s) in this form
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {forms.length > 0 && (
              <h2 className="text-xl font-bold mb-4">{selectedForm.title}</h2>
            )}
            {responses.length === 0 && !error && (
              <div className="text-gray-600">No responses found for this form.</div>
            )}
            <div className="space-y-4">
              {responses.map((response, idx) => (
                <div key={idx} className="p-4 bg-white shadow rounded border">
                  {Object.entries(response.answers).map(
                    ([fieldId, answer]) => (
                      <p key={fieldId}>
                        <strong>{getQuestionLabel(fieldId)}:</strong> {answer}
                      </p>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}
