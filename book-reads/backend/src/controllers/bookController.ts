import { Request, Response } from "express";
import { addBook, getBooks, getBookById } from "../services/bookService";
import { getBookshelvesWithBooks } from "../services/bookService";
import { getBooksByCategory } from "../services/bookService";
import { getBookStats } from "../services/bookService";

export const createBook = async (req: Request, res: Response) => {
  try {
    console.log("Received book data in backend:", req.body); 
    const { title, author, categoryId, coverImage } = req.body;

    if (!title || !author || !categoryId || !coverImage) {
      throw new Error("Missing required fields");
    }

    const book = await addBook({ title, author, categoryId, coverImageUrl: coverImage });

    res.status(201).json({ message: "Book added successfully!", book });
  } catch (error: any) {
    console.error("Error adding book:", error);
    res.status(400).json({ error: error.message || "Failed to add book" });
  }
};



export const fetchBooks = async (_req: Request, res: Response) => {
  try {
    const books = await getBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

export const fetchBookById = async (req: Request, res: Response) => {
  try {
    const book = await getBookById(req.params.id);
    res.status(200).json(book);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const fetchBookshelves = async (_req: Request, res: Response) => {
  try {
    const bookshelves = await getBookshelvesWithBooks();
    res.status(200).json(bookshelves);
  } catch (error) {
    console.error("Error fetching bookshelves:", error);
    res.status(500).json({ error: "Failed to fetch bookshelves" });
  }
};


export const fetchBooksByCategory = async (_req: Request, res: Response) => {
    try {
        const books = await getBooksByCategory();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch books by category" });
    }
};

export const fetchBookStatsHandler = async (req: Request, res: Response) => {
  try {
    const stats = await getBookStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching book stats:", error);
    res.status(500).json({ error: "Failed to fetch book statistics." });
  }
};

