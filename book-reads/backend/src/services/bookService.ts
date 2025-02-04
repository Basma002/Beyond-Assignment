import prisma from "../../client";
import { z } from "zod";

const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  categoryId: z.string().optional(), 
  coverImageUrl: z.string().optional(), 
});

export const addBook = async (data: { title: string; author: string; categoryId: string; coverImageUrl: string }) => {
  return await prisma.book.create({
    data: {
      title: data.title,
      author: data.author,
      category: {
        connect: { id: data.categoryId },
      },
      coverImageUrl: data.coverImageUrl, 
    },
  });
};


export const getBooks = async () => {
  return await prisma.book.findMany({
    include: {
      category: true, 
    },
  });
};

export const getBookById = async (id: string) => {
  const book = await prisma.book.findUnique({
    where: { id },
    include: {
      category: true, 
    },
  });
  if (!book) {
    throw new Error("Book not found.");
  }
  return book;
};


export const getBookshelvesWithBooks = async () => {
  return await prisma.bookShelves.findMany({
    include: {
      books: {
        include: {
          book: {
            select: {
              id: true,
              title: true,
              author: true,
              coverImageUrl: true
            }
          }
        }
      }
    }
  });
};



export const getBooksByCategory = async () => {
    return await prisma.category.findMany({
        include: {
            books: {
                select: {
                    id: true,
                    title: true,
                    author: true,
                    coverImageUrl: true,
                },
            },
        },
    });
};

export const getBookStats = async () => {
  try {
    const bookStats = await prisma.review.groupBy({
      by: ["bookId"],
      _count: { bookId: true },
      _avg: { rating: true },
      orderBy: {
        _count: { bookId: "desc" },
      },
      take: 10,
    });

    if (bookStats.length === 0) {
      throw new Error("No review data found.");
    }

    const bookDetails = await Promise.all(
      bookStats.map(async (stat) => {
        const book = await prisma.book.findUnique({
          where: { id: stat.bookId },
          select: { title: true, author: true },
        });

        return {
          bookId: stat.bookId,
          title: book?.title || "Unknown",
          author: book?.author || "Unknown",
          reviewCount: stat._count.bookId,
          averageRating: stat._avg.rating,
        };
      })
    );

    return bookDetails;
  } catch (error) {
    console.error("Error fetching book stats:", error);
    return []; // Return empty array if error occurs
  }
};
