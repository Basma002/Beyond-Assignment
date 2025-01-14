"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SidebarLayout from "@/components/ui/SidebarLayout"; // Adjust the import path if necessary

export default function MyFormsPage() {
  const [forms, setForms] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

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
        setError("Failed to load forms. Please try again later.");
      }
    } catch (err) {
      setError("An error occurred while fetching forms.");
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleFormClick = (formId) => {
    router.push(`/form/${formId}`);
  };

  return (
    <SidebarLayout>
      <h1 className="text-2xl font-bold mb-8">My Forms</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {forms.length > 0 ? (
          forms.map((form) => (
            <div
              key={form.id}
              className="bg-white p-6 shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleFormClick(form.id)}
            >
              <h2 className="text-lg font-semibold mb-4">{form.title}</h2>
              <p className="text-gray-500">
                {form.fields.length} field(s) in this form
              </p>
            </div>
          ))
        ) : (
          !error && (
            <p className="text-gray-600">You haven't created any forms yet.</p>
          )
        )}
      </div>
    </SidebarLayout>
  );
}
