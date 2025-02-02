export const addReview = async (
  bookId: string,
  userId: string,  
  reviewText: string,
  rating: number
): Promise<void> => {
  const token = localStorage.getItem("token");

  if (!userId) {
    throw new Error("User ID is missing. Please log in.");
  }

  if (!token) {
    throw new Error("Authentication required. Please log in.");
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/${bookId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, text: reviewText, rating }), 
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to submit review.");
  }
};
