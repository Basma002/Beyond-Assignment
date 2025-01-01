import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import BookList from "./BookList";
import AddBook from "./AddBook";
import DeleteButton, { deleteBookById } from "./DeleteButton"; 

interface Book {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([
    { id: 1, name: "1984" },
    { id: 2, name: "The Idiot" },
    { id: 3, name: "The Animal Farm" },
  ]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);

  // Handle deleting a book
  const deleteBook = (id: number) => {
    const updatedBooks = deleteBookById(id, books); 
    setBooks(updatedBooks);
  };

  // Filter books based on the search query
  useEffect(() => {
    const filtered = books.filter((book) =>
      book.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [searchQuery, books]);

// Add a book
  const addBook = (bookName: string) => {
    if (bookName.trim() === "") {
      alert("Please enter a valid book name.");
      return;
    }

    const newBook = {
      id: books.length + 1,
      name: bookName,
    };

    setBooks([...books, newBook]);
  };

  return (
    
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Books List</h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <BookList books={filteredBooks} deleteBook={deleteBook} />
      <AddBook addBook={addBook} />
    </div>
  );
};

export default App;
