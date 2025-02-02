"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

interface SelectBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookshelfId: string;
}

export default function SelectBookModal({ isOpen, onClose, bookshelfId }: SelectBookModalProps) {
  const router = useRouter();

  interface Book {
    coverImageUrl: string;
    id: string;
    title: string;
    author: string;
  }

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(""); 

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(false);

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch books.");
        }

        const data = await response.json();
        setBooks(data || []);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleAddBookToBookshelf = async () => {
    if (!selectedBookId) {
      alert("Please select a book to add.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/bookshelves/${bookshelfId}/books`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookId: selectedBookId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add book.");
      }

      alert("Book added successfully!");
      router.push("/bookShelves");
    } catch (err) {
      console.error("Failed to add book:", err);
      alert("Failed to add book. Please try again.");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (error) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500">Failed to load books. Please try again later.</p>
      </div>
    );
  }

  return (
    <Modal 
  open={isOpen} 
  onClose={onClose} 
  center
  styles={{
    modal: {
      width: "90vw",
      maxWidth: "1200px",
      padding: "24px",
    },
  }}
>
  <h2 className="text-xl font-semibold mb-4 text-center">Select Book</h2>

  <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
    {books.map((book) => (
      <div 
        key={book.id} 
        className={`p-4 border rounded-lg shadow-md hover:shadow-lg cursor-pointer ${
          selectedBookId === book.id ? 'bg-gray-200' : ''
        }`} 
        onClick={() => setSelectedBookId(book.id)} 
      > 
        <input 
          type="radio" 
          name="book" 
          value={book.id} 
          checked={selectedBookId === book.id} 
          onChange={() => setSelectedBookId(book.id)} 
          className="mr-2 hidden"
        />
        <img 
          src={book.coverImageUrl || "https://via.placeholder.com/150"} 
          alt={book.title} 
          className="w-full h-48 object-cover rounded-lg mb-2"
        />
        <h3 className="font-bold text-lg whitespace-nowrap overflow-hidden overflow-ellipsis">
          {book.title}
        </h3>
        <p className="text-gray-600">{book.author}</p>
        <button className="bg-brown-600 text-white px-3 py-1 rounded mt-2">
          Add
        </button>
      </div>
    ))}
  </div>

  <button 
    className="mt-6 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" 
    onClick={handleAddBookToBookshelf} 
    disabled={!selectedBookId} 
  >
    Add Book
  </button>
</Modal>

  );
}