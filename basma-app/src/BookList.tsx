import React from "react";
import DeleteButton from "./DeleteButton";

interface Book {
  id: number;
  name: string;
}

interface BookListProps {
  books: Book[];
  deleteBook: (id: number) => void;
}

const BookList: React.FC<BookListProps> = ({ books, deleteBook }) => {
  return (
    <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
      {books.length > 0 ? (
        books.map((book) => (
          <div
            key={book.id}
            className="flex justify-between items-center border-b last:border-none py-2 text-lg text-gray-700"
          >
            <span>{book.name}</span>
            <DeleteButton bookId={book.id} deleteBook={deleteBook} />
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No books found</p>
      )}
    </div>
  );
};

export default BookList;
