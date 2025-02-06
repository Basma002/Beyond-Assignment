"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookStats = exports.getBooksByCategory = exports.getBookshelvesWithBooks = exports.getBookById = exports.getBooks = exports.addBook = void 0;
const client_1 = __importDefault(require("../../client"));
const zod_1 = require("zod");
const bookSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    author: zod_1.z.string().min(1, "Author is required"),
    categoryId: zod_1.z.string().optional(),
    coverImageUrl: zod_1.z.string().optional(),
});
const addBook = async (data) => {
    return await client_1.default.book.create({
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
exports.addBook = addBook;
const getBooks = async () => {
    return await client_1.default.book.findMany({
        include: {
            category: true,
        },
    });
};
exports.getBooks = getBooks;
const getBookById = async (id) => {
    const book = await client_1.default.book.findUnique({
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
exports.getBookById = getBookById;
const getBookshelvesWithBooks = async () => {
    return await client_1.default.bookShelves.findMany({
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
exports.getBookshelvesWithBooks = getBookshelvesWithBooks;
const getBooksByCategory = async () => {
    return await client_1.default.category.findMany({
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
exports.getBooksByCategory = getBooksByCategory;
const getBookStats = async () => {
    try {
        const bookStats = await client_1.default.review.groupBy({
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
        const bookDetails = await Promise.all(bookStats.map(async (stat) => {
            const book = await client_1.default.book.findUnique({
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
        }));
        return bookDetails;
    }
    catch (error) {
        console.error("Error fetching book stats:", error);
        return []; // Return empty array if error occurs
    }
};
exports.getBookStats = getBookStats;
