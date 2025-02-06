"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBookshelvesHandler = exports.getBookshelfHandler = exports.addBookToBookshelfHandler = exports.createBookshelfHandler = void 0;
const bookShelfService_1 = require("../services/bookShelfService");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createBookshelfHandler = async (req, res) => {
    const { name } = req.body;
    const userId = req.user?.userId;
    if (!userId || !name) {
        return res.status(400).json({ error: "Missing userId or name" });
    }
    try {
        const bookshelf = await (0, bookShelfService_1.createBookshelf)(name, userId);
        res.status(201).json({ message: "Bookshelf created successfully!", bookshelf });
    }
    catch (error) {
        console.error("Error creating bookshelf:", error);
        res.status(500).json({ error: "Failed to create bookshelf" });
    }
};
exports.createBookshelfHandler = createBookshelfHandler;
const addBookToBookshelfHandler = async (req, res) => {
    const { bookId } = req.body;
    const { bookshelfId } = req.params;
    try {
        const result = await (0, bookShelfService_1.addBookToBookshelf)(bookshelfId, bookId);
        console.log("Book added successfully:", result);
        res.status(200).json({ message: "Book added to bookshelf.", result });
    }
    catch (error) {
        console.error("Error adding book:", error.message);
        res.status(500).json({ error: "Failed to add book to bookshelf." });
    }
};
exports.addBookToBookshelfHandler = addBookToBookshelfHandler;
const getBookshelfHandler = async (req, res) => {
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
    }
    catch (error) {
        console.error("Error fetching bookshelf:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};
exports.getBookshelfHandler = getBookshelfHandler;
const getAllBookshelvesHandler = async (req, res) => {
    const userId = req.user?.userId;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized. User not authenticated." });
    }
    try {
        const bookshelves = await (0, bookShelfService_1.getBookshelves)(userId);
        if (!bookshelves || bookshelves.length === 0) {
            return res.status(200).json([]);
        }
        res.status(200).json(bookshelves);
    }
    catch (error) {
        console.error("Error fetching bookshelves:", error);
        res.status(500).json({ error: "Failed to fetch bookshelves." });
    }
};
exports.getAllBookshelvesHandler = getAllBookshelvesHandler;
