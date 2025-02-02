"use client";
import Modal from "@/components/ui/Modal"; // Reusable modal component
import React, { useState, useEffect } from "react";
import { fetchAllBooks, fetchAllBookshelves } from "../api/books";

export default function Bookshelves() {
  const [bookshelves, setBookshelves] = useState<
    { id: string; name: string; books: { book: { id: string; title: string; author: string; coverImageUrl: string } }[] }[]
  >([]);
  const [allBooks, setAllBooks] = useState<
    { id: string; title: string; author: string; coverImageUrl: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newBookshelfName, setNewBookshelfName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookshelfId, setSelectedBookshelfId] = useState("");

  useEffect(() => {
    const fetchBookshelves = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchAllBookshelves();
        setBookshelves(data.map((bookshelf) => ({ ...bookshelf, books: bookshelf.books || [] })));
      } catch (err) {
        console.error("Failed to fetch bookshelves:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBookshelves(); // Re-fetch when bookshelves state changes
  }, [bookshelves]);
  
  const handleAddBookshelf = async () => {
    if (!newBookshelfName) {
      alert("Bookshelf name cannot be empty.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/bookshelves`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: newBookshelfName }),
        }
      );
  
      if (!response.ok) throw new Error("Failed to add bookshelf.");
  
      const newBookshelf = await response.json();
  
      setBookshelves((prev) => [...prev, { ...newBookshelf, books: [] }]); 
      setNewBookshelfName("");
    } catch (err) {
      console.error("Failed to add bookshelf:", err);
      alert("Failed to add bookshelf. Please try again.");
    }
  };  

  const handleOpenModal = async (bookshelfId: string) => {
    setSelectedBookshelfId(bookshelfId);
    setIsModalOpen(true);

    try {
      const books = await fetchAllBooks();
      setAllBooks(books);
    } catch (err) {
      console.error("Failed to fetch books:", err);
      alert("Failed to load books. Please try again.");
    }
  };

  const handleAddBookToShelf = async (bookId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/bookshelves/${selectedBookshelfId}/books`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookId }),
        }
      );
  
      if (!response.ok) throw new Error("Failed to add book to bookshelf.");
  
      const updatedBook = await response.json();
  
      setBookshelves((prev) =>
        prev.map((shelf) =>
          shelf.id === selectedBookshelfId
            ? { ...shelf, books: [...shelf.books, { book: updatedBook }] }
            : shelf
        )
      );
  
      setIsModalOpen(false);
      alert("Book added successfully!");
    } catch (err) {
      console.error("Failed to add book to shelf:", err);
      alert("Failed to add book. Please try again.");
    }
  };
  
  return (
    <div className="bg-beige min-h-screen p-8">
      <div className="mb-6">
        <h2 className="text-l font-bold mb-4">Add a New Bookshelf</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            value={newBookshelfName}
            onChange={(e) => setNewBookshelfName(e.target.value)}
            placeholder="Bookshelf Name"
            className="p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleAddBookshelf}
            className="bg-yellow-700 text-white px-4 py-2 rounded hover:bg-yellow-800"
          >
            Add Bookshelf
          </button>
        </div>
      </div>

      {bookshelves.map((bookshelf) => (
        <div key={bookshelf.id} className="bg-gray-200 p-6 rounded-lg shadow-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-xl">{bookshelf.name}</h2>
            <button
              onClick={() => handleOpenModal(bookshelf.id)}
              className="bg-yellow-900 text-white px-3 py-1 rounded-full hover:bg-yellow-950"
            >
              +
            </button>
          </div>
          <div className="overflow-x-auto whitespace-nowrap space-x-6 flex">
            {bookshelf.books && bookshelf.books.length > 0 ? (
              bookshelf.books.map((bookObj, index) => {
                const bookDetails = bookObj.book;
                return (
                  <div
                    key={`${bookshelf.id}-${index}`}
                    className="flex flex-col items-center w-36 text-center bg-white shadow p-3 rounded"
                  >
                    <div className="h-32 w-24 bg-gray-200 rounded-md mb-3">
                      <img
                        src={bookDetails?.coverImageUrl || "https://via.placeholder.com/150"}
                        alt={bookDetails?.title || "Book Cover"}
                        className="h-full w-full object-cover rounded-md"
                      />
                    </div>
                    <h3 className="font-semibold text-sm truncate">
                      {bookDetails?.title || "Untitled"}
                    </h3>
                    <p className="text-xs text-gray-600 truncate">
                      {bookDetails?.author || "Unknown Author"}
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">No books in this bookshelf.</p>
            )}
          </div>
        </div>
      ))}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Add a Book to Your Bookshelf</h2>
          <div className="grid grid-cols-3 gap-4">
            {allBooks.map((book) => (
              <div key={book.id} className="flex flex-col items-center">
                <div className="h-40 w-28 bg-gray-200 rounded-md mb-3">
                  <img
                    src={book.coverImageUrl || "https://placehold.co/150"}
                    alt={book.title}
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>
                <h3 className="text-sm font-semibold">{book.title}</h3>
                <p className="text-xs text-gray-600">{book.author}</p>
                <button
                  onClick={() => handleAddBookToShelf(book.id)}
                  className="bg-yellow-800 text-white px-2 py-1 mt-2 rounded hover:bg-green-600"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
