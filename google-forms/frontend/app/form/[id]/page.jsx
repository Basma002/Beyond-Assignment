"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import DynamicForm from "@/components/ui/DynamicForms"; 

export default function FormDetailPage() {
  const { id } = useParams(); 
  const [form, setForm] = useState(null);
  const [error, setError] = useState(null);

  // Fetch form details
  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/forms/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setForm(data); // Set the form details
        } else {
          const errorText = await response.text();
          setError(`Error: ${errorText}`);
        }
      } catch (err) {
        setError("An error occurred while fetching form details.");
      }
    };

    fetchFormDetails();
  }, [id]);

  return (
    <div className="p-8">
      {error && <div className="text-red-500">{error}</div>}
      {form ? (
        <div>
          <DynamicForm
            fields={form.fields} 
            formTitle={form.title}
            formId={id}
          />
        </div>
      ) : (
        !error && <p>Loading form details...</p>
      )}
    </div>
  );
}
