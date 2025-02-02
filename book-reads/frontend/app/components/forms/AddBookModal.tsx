import React, { useState } from "react";
import Modal from "@/components/ui/Modal";

const AddBookModal = ({ books, onSubmit }: { books: any[]; onSubmit: (data: any) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Book
      </button>
      
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="w-[850px] max-w-full p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-center">Select a Book to Add</h2>
          
          <div className="grid grid-cols-3 gap-6">
            {books.map((book) => (
              <div key={book.id} className="flex flex-col items-center w-[180px] bg-gray-100 p-4 rounded-lg shadow-md">
                <img 
                  src={book.coverImageUrl} 
                  alt={book.title} 
                  className="w-[150px] h-[200px] object-cover rounded-lg" 
                />
                <h3 className="text-center font-bold min-h-[48px]">{book.title}</h3>
                <p className="text-center text-gray-600 min-h-[32px]">{book.author}</p>
                <button 
                  onClick={() => {
                    onSubmit(book);
                    setIsOpen(false);
                  }} 
                  className="mt-auto bg-amber-900 text-white px-4 py-2 rounded w-full"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddBookModal;
