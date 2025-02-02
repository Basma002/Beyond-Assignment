import { Request, Response } from "express";
import {
  createBookshelf,
  addBookToBookshelf,
  getBookshelves,
} from "../services/bookShelfService";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createBookshelfHandler = async (req: Request, res: Response) => {
  const { name } = req.body;
  const userId = req.user?.userId; 

  if (!userId || !name) {
    return res.status(400).json({ error: "Missing userId or name" });
  }

  try {
    const bookshelf = await createBookshelf(name, userId);
    res.status(201).json({ message: "Bookshelf created successfully!", bookshelf });
  } catch (error) {
    console.error("Error creating bookshelf:", error);
    res.status(500).json({ error: "Failed to create bookshelf" });
  }
};

export const addBookToBookshelfHandler = async (req: Request, res: Response) => {
  const { bookId } = req.body;
  const { bookshelfId } = req.params;

  try {
    const result = await addBookToBookshelf(bookshelfId, bookId);
    console.log("Book added successfully:", result);
    res.status(200).json({ message: "Book added to bookshelf.", result });
  } catch (error: any) {
    console.error("Error adding book:", error.message);
    res.status(500).json({ error: "Failed to add book to bookshelf." });
  }
};

export const getBookshelfHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const bookshelf = await prisma.bookShelves.findUnique({
      where: { id },
      include: {
        books: {
          include: {
            book: {
              select: { id: true, title: true, author: true, coverImageUrl: true },
            },
          },
        },
      },
    });

    if (!bookshelf) {
      return res.status(404).json({ error: "Bookshelf not found." });
    }

    res.status(200).json(bookshelf);
  } catch (error) {
    console.error("Error fetching bookshelf:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const getAllBookshelvesHandler = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized. User not authenticated." });
  }

  try {
    const bookshelves = await getBookshelves(userId); 
    
    if (!bookshelves || bookshelves.length === 0) {
      return res.status(200).json([]); 
    }

    res.status(200).json(bookshelves);
  } catch (error) {
    console.error("Error fetching bookshelves:", error);
    res.status(500).json({ error: "Failed to fetch bookshelves." });
  }
};

