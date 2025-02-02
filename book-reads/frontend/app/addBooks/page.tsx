"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { createBook, fetchCategories } from "../api/books";

export default function AddBookPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(""); 

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    }
    loadCategories();
  }, []);

  const handleCardClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const author = (document.getElementById("author") as HTMLInputElement).value;
    const categoryId = (document.getElementById("category") as HTMLSelectElement).value;
    const cover = (document.getElementById("cover") as HTMLInputElement).files?.[0];
  
    if (!title.trim() || !author.trim() || !categoryId.trim() || !cover) {
      setError("All fields are required.");
      return;
    }
  
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        
        console.log("Submitting book:", { title, author, categoryId, coverImage: base64String }); // ✅ Log data before sending
  
        await createBook(title, author, categoryId, base64String);
        setShowForm(false);
        setError("");
        router.push("/categories");
      };
  
      reader.readAsDataURL(cover);
    } catch (err) {
      console.error("Error adding book:", err);
      setError("Failed to add new book. Please try again.");
    }
  };
  
   

  return (
    <div className="container mx-3">
      {!showForm ? (
        <div className="flex justify-center">
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow w-80"
            onClick={handleCardClick}
          >
            <CardHeader className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-yellow-700 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <CardTitle>Add a New Book</CardTitle>
              <CardDescription>Click to add a new book to your collection.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <form onSubmit={handleFormSubmit} className="w-full max-w-md">
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>} 
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Book Title</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" id="title" type="text" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">Author</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" id="author" type="text" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">Category</label>
              <select className="shadow border rounded w-full py-2 px-3 text-gray-700" id="category" required>
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cover">Book Cover Image</label>
              <input className="shadow border rounded w-full py-2 px-3 text-gray-700" id="cover" type="file" accept="image/*" required />
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-amber-900 hover:bg-amber-950 text-white font-bold py-2 px-4 rounded" type="submit">Add Book</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
