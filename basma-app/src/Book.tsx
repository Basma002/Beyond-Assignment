import React from "react";

interface BookProps {
  book: {
    id: number;
    name: string;
  };
}

const Book: React.FC<BookProps> = ({ book }) => {
  return (
    <div className="border-b last:border-none py-2">
      <p className="text-lg">{book.name}</p>
    </div>
  );
};

export default Book;
