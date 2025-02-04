import { PrismaClient } from "@prisma/client";
import prisma from '../../client';


export const createBookshelf = async (name: string, userId: string) => {
  return await prisma.bookShelves.create({
    data: { name, userId },
  });
};

export const addBookToBookshelf = async (bookshelfId: string, bookId: string) => {
  try {
    const existingEntry = await prisma.booksOnShelves.findFirst({
      where: { bookshelfId, bookId },
    });

    if (existingEntry) {
      throw new Error("Book already exists in the bookshelf.");
    }

    // Add book to the bookshelf
    const updatedBookshelf = await prisma.booksOnShelves.create({
      data: { bookshelfId, bookId },
    });

    console.log("Book successfully added:", updatedBookshelf);
    return updatedBookshelf;
  } catch (error: any) {
    console.error("Error adding book to bookshelf:", error.message);
    throw error;
  }
};

export const getBookshelves = async (userId: string) => {  
  const includeBooks = {
    books: {
      include: {
        book: {
          select: {
            id: true,
            title: true,
            author: true,
            coverImageUrl: true,
          },
        },
      },
    },
  };

  const bookshelves = await prisma.bookShelves.findMany({
    where: { userId }, 
    include: includeBooks,
  });
  return bookshelves;
};

