"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SidebarLayout from "@/components/ui/SidebarLayout";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function LandingPage() {
  const router = useRouter();
  const [forms, setForms] = useState([]);
  const [error, setError] = useState(null);

  const fetchForms = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/forms/", {
        method: "GET",
        credentials: "include", // Include session cookie
      });

      if (response.ok) {
        const data = await response.json();
        setForms(data);
      } else {
        console.error("Failed to fetch forms. Status:", response.status);
        setError("Failed to load forms. Please try again later.");
      }
    } catch (err) {
      console.error("Error fetching forms:", err);
      setError("An error occurred while fetching forms.");
    }
  };

  useEffect(() => {
    fetchForms(); // Fetch forms when the component loads
  }, []);

  const navigateTo = (path) => {
    router.push(path); // Simplified navigation function
  };

  return (
    <SidebarLayout>
      <main className="flex-1 flex flex-col items-center p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-8">Welcome to Form Builder</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {/* Card 1: Create from Scratch */}
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigateTo("/form")}
          >
            <CardHeader className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <CardTitle>Create from Scratch</CardTitle>
              <CardDescription>Get a blank canvas to let your creativity flow.</CardDescription>
            </CardHeader>
          </Card>

          {/* Card 2: My Forms */}
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigateTo("/myForms")}
          >
            <CardHeader className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M9 6v12M15 6v12M21 6v12H3V6z" />
                </svg>
              </div>
              <CardTitle>My Forms ({forms.length})</CardTitle>
              <CardDescription>View and manage your created forms.</CardDescription>
            </CardHeader>
          </Card>

          {/* Card 3: Browse Templates */}
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigateTo("/templates")}
          >
            <CardHeader className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-purple-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4h18v16H3V4zm9 4v8M9 8h6M5 8h1M5 16h1M18 8h1M18 16h1"
                  />
                </svg>
              </div>
              <CardTitle>Browse Templates</CardTitle>
              <CardDescription>Explore pre-designed form templates.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>
    </SidebarLayout>
  );
}
