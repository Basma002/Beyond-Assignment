"use client";
import { useEffect, useState } from "react";

interface BookStats {
  id: string;
  title: string;
  reviewCount: number;
  averageRating: number;
}

interface Review {
  id: string;
  text: string;
  rating: number;
  book?: {
    title: string;
  };
}

interface Activity {
  reviews: Review[];
}

export default function AnalyticsPage() {
  const [bookStats, setBookStats] = useState<BookStats[]>([]);
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookStats = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books/stats`);
        if (!response.ok) throw new Error("Failed to fetch book stats.");
        const data = await response.json();
        setBookStats(data);
      } catch (error) {
        console.error("Error fetching book stats:", error);
        setError((prev) => prev + " | Failed to fetch book stats.");
      } finally {
        setLoadingStats(false);
      }
    };

    const fetchUserActivity = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId) {
          setError("User not found. Please log in.");
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/activity`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch user activity.");
        const data = await response.json();
        setActivity(data);
      } catch (error) {
        console.error("Error fetching user activity:", error);
        setError((prev) => prev + " | Failed to fetch user activity.");
      } finally {
        setLoadingActivity(false);
      }
    };

    fetchBookStats();
    fetchUserActivity();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Analytics & User Activity</h1>

      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Book Stats */}
      <h2 className="text-2xl font-semibold mt-6">Top Reviewed Books</h2>
      {loadingStats ? (
        <p>Loading book stats...</p>
      ) : bookStats.length > 0 ? (
        <ul className="list-disc pl-5">
          {bookStats.map((book) => (
            <li key={book.id} className="mt-2">
              <strong>{book.title}</strong> - {book.reviewCount} reviews (⭐ {book.averageRating.toFixed(1)}/5)
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No book stats found.</p>
      )}

      {/* User Activity */}
      <h2 className="text-2xl font-semibold mt-6">My Reviews</h2>
      {loadingActivity ? (
        <p>Loading activity...</p>
      ) : activity?.reviews && activity.reviews.length > 0 ? (
        <ul className="list-disc pl-5">
          {activity.reviews.map((review) => (
            <li key={review.id} className="mt-2">
              <strong>{review.book?.title || "Unknown Book"}</strong> - {review.text} (⭐ {review.rating}/5)
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No reviews found.</p>
      )}
    </div>
  );
}
