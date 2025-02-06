"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookshelves = exports.addBookToBookshelf = exports.createBookshelf = void 0;
const client_1 = __importDefault(require("../../client"));
const createBookshelf = async (name, userId) => {
    return await client_1.default.bookShelves.create({
        data: { name, userId },
    });
};
exports.createBookshelf = createBookshelf;
const addBookToBookshelf = async (bookshelfId, bookId) => {
    try {
        const existingEntry = await client_1.default.booksOnShelves.findFirst({
            where: { bookshelfId, bookId },
        });
        if (existingEntry) {
            throw new Error("Book already exists in the bookshelf.");
        }
        // Add book to the bookshelf
        const updatedBookshelf = await client_1.default.booksOnShelves.create({
            data: { bookshelfId, bookId },
        });
        console.log("Book successfully added:", updatedBookshelf);
        return updatedBookshelf;
    }
    catch (error) {
        console.error("Error adding book to bookshelf:", error.message);
        throw error;
    }
};
exports.addBookToBookshelf = addBookToBookshelf;
const getBookshelves = async (userId) => {
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
    const bookshelves = await client_1.default.bookShelves.findMany({
        where: { userId },
        include: includeBooks,
    });
    return bookshelves;
};
exports.getBookshelves = getBookshelves;
