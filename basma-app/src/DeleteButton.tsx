import React from "react";

export const deleteBookById = <T extends { id: number }>(id: number, items: T[]): T[] => {
  return items.filter((item) => item.id !== id);
};

interface DeleteButtonProps {
  bookId: number;
  deleteBook: (id: number) => void;
}
const DeleteButton: React.FC<DeleteButtonProps> = ({ bookId, deleteBook }) => {
    return (
      <button
        onClick={() => deleteBook(bookId)}
        className="text-red-500 hover:text-red-700"
        aria-label="Delete book"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    );
  };
  
  export default DeleteButton;
  