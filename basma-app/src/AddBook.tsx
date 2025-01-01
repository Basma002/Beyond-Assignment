import React, { useState } from "react";

interface AddBookProps {
  addBook: (bookName: string) => void;
}

const AddBook: React.FC<AddBookProps> = ({ addBook }) => {
  const [bookName, setBookName] = useState<string>("");

  const handleAdd = () => {
    addBook(bookName);
    setBookName(""); // Clear input field after adding
  };

  return (
    <div className="mt-6 flex flex-col items-center">
      <input
        type="text"
        value={bookName}
        onChange={(e) => setBookName(e.target.value)}
        placeholder="Enter book name"
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
      />
      <button
        onClick={handleAdd}
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Add a Book
      </button>
    </div>
  );
};

export default AddBook;
