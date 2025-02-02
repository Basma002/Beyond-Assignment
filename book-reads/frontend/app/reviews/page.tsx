"use client";
import React, { useState, useEffect } from "react";
import { fetchAllBooks } from "../api/books";
import { useRouter } from "next/navigation";

interface Book {
  id: string;
  title: string;
  author: string;
  coverImageUrl?: string;
}

export default function BrowseBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchAllBooks();
        setBooks(data);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    loadBooks();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Browse Books</h1>
      <div className="grid grid-cols-5 md:grid-cols-5 sm:grid-cols-5 gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="border p-4 rounded-lg shadow-md bg-white cursor-pointer w-48 transition-transform hover:scale-105"
            onClick={() => router.push(`/reviews/${book.id}`)}
          >
            <img
              src={book.coverImageUrl || "https://via.placeholder.com/150"}
              alt={book.title}
              className="w-full h-64 object-cover mb-3 rounded-lg"
            />
            <h3 className="font-bold text-sm text-center">{book.title}</h3>
            <p className="text-gray-600 text-xs text-center">{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
