import { title } from "process";

export const fetchAllBookshelves = async (): Promise<any[]> => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId"); 

  if (!userId) {
    throw new Error("User ID not found. Please log in.");
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bookshelves?userId=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch bookshelves.");
  }

  const data = await response.json();
  return data;
};


export const addBookToBookshelf = async (bookshelfId: string, bookId: string): Promise<any> => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/bookshelves/${bookshelfId}/books/${bookId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add book to bookshelf.");
  }

  const data = await response.json();
  return data;
};

export const fetchAllBooks = async (): Promise<any[]> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch books.");
  }

  return await response.json();
};

export const fetchBooksByCategory = async (): Promise<any[]> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch books by category.");
  }

  return await response.json();
};

export const addReview = async (
  bookId: string,
  userId: string, 
  reviewText: string,
  rating: number
): Promise<void> => {
  const token = localStorage.getItem("token");
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


export const fetchBookById = async (bookId: string): Promise<any> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books/${bookId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch book details.");
  }
  return await response.json();
};

export const fetchReviewsByBookId = async (bookId: string): Promise<any[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reviews/${bookId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch reviews.");
  }
  return await response.json();
};

export const fetchBookDetails = async (bookId: string): Promise<any> => {
  const book = await fetchBookById(bookId);
  const reviews = await fetchReviewsByBookId(bookId);
  return { book, reviews };
};

export const fetchBookStats = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books/stats`);
  if (!response.ok) {
    throw new Error("Failed to fetch book stats");
  }
  return await response.json();
};

export const createBook = async (title: string, author: string, categoryId: string, coverImage: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, author, categoryId, coverImage }),
  });

  if (!response.ok) {
    throw new Error("Failed to create book.");
  }

  return await response.json();
};

export const fetchCategories = async (): Promise<any[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`);
  if (!response.ok) {
    throw new Error("Failed to fetch categories.");
  }
  return await response.json();
};
