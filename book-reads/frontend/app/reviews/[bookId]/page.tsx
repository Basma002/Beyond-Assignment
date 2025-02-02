"use client";
import { useEffect, useState } from "react";
import { fetchBookDetails, addReview } from "../../api/books";
import { useParams } from "next/navigation";

interface Book {
  id: string;
  title: string;
  author: string;
  coverImageUrl?: string;
}

const BookReviewPage = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");

  useEffect(() => {
    if (bookId) {
      fetchBookDetails(bookId as string)
        .then((data) => {
          setBook(data.book);
          setReviews(data.reviews);
        })
        .catch((err) => console.error("Error fetching book details:", err));
    }
  }, [bookId]);

  const handleSubmitReview = async () => {
    const userId = localStorage.getItem("userId"); 
  
    if (!reviewText.trim()) {
      setError("Review text cannot be empty.");
      return;
    }
  
    if (!userId) {
      setError("User ID is missing. Please log in.");
      return;
    }
  
    try {
      await addReview(bookId as string, userId, reviewText, rating); 
      setReviewText("");
      setRating(5);
      setError("");
  
      const data = await fetchBookDetails(bookId as string);
      setReviews(data.reviews);
    } catch (err) {
      console.error("Error submitting review:", err);
      setError("Failed to submit review. Please try again.");
    }
  };  
  

  if (!book) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <img
          src={book.coverImageUrl || "https://via.placeholder.com/300x400"}
          alt={book.title}
          className="w-72 h-96 rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-gray-600 mb-4">
            by <span className="font-semibold">{book.author}</span>
          </p>
          <h3 className="text-2xl font-semibold mb-2">Reviews</h3>
          <div className="space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="border p-4 rounded-lg shadow">
                  <p className="text-gray-700">{review.text}</p>
                  <p className="text-yellow-500">Rating: {review.rating}/5</p>
                  <p className="text-gray-400 text-sm">
                    {review.author ? `by ${review.author}` : "Anonymous"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>

          <h3 className="text-2xl font-semibold mt-6">Write a Review</h3>
          <textarea
            className="w-full p-3 border rounded-lg mt-2"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <select
            className="w-full p-3 border rounded-lg mt-2"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <button
            onClick={handleSubmitReview}
            className="bg-blue-600 text-white px-6 py-2 mt-4 rounded hover:bg-blue-700"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookReviewPage;
