import Link from "next/link";

export default function ReviewsPage() {
  const books = [
    { id: "cm69a2xht0005elvs1z1377ko", title: "Book One", author: "Author One", coverImageUrl: "" },
    { id: "2", title: "Book Two", author: "Author Two", coverImageUrl: "" },
  ];
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Browse Books</h1>
      <ul className="grid grid-cols-3 gap-6">
        {books.map((book) => (
          <li key={book.id} className="border p-4 rounded-lg shadow-md">
            <Link href={`/reviews/${book.id}`}>
              <img
                src={book.coverImageUrl || "https://via.placeholder.com/150"}
                alt={book.title}
                className="w-full h-48 object-cover mb-3 rounded-lg"
              />
            </Link>
            <h3 className="font-bold">{book.title}</h3>
            <p className="text-gray-600">{book.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}