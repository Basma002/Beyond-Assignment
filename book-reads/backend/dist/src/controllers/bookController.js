"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchBookStatsHandler = exports.fetchBooksByCategory = exports.fetchBookshelves = exports.fetchBookById = exports.fetchBooks = exports.createBook = void 0;
const bookService_1 = require("../services/bookService");
const bookService_2 = require("../services/bookService");
const bookService_3 = require("../services/bookService");
const bookService_4 = require("../services/bookService");
const createBook = async (req, res) => {
    try {
        console.log("Received book data in backend:", req.body);
        const { title, author, categoryId, coverImage } = req.body;
        if (!title || !author || !categoryId || !coverImage) {
            throw new Error("Missing required fields");
        }
        const book = await (0, bookService_1.addBook)({ title, author, categoryId, coverImageUrl: coverImage });
        res.status(201).json({ message: "Book added successfully!", book });
    }
    catch (error) {
        console.error("Error adding book:", error);
        res.status(400).json({ error: error.message || "Failed to add book" });
    }
};
exports.createBook = createBook;
const fetchBooks = async (_req, res) => {
    try {
        const books = await (0, bookService_1.getBooks)();
        res.status(200).json(books);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch books" });
    }
};
exports.fetchBooks = fetchBooks;
const fetchBookById = async (req, res) => {
    try {
        const book = await (0, bookService_1.getBookById)(req.params.id);
        res.status(200).json(book);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
};
exports.fetchBookById = fetchBookById;
const fetchBookshelves = async (_req, res) => {
    try {
        const bookshelves = await (0, bookService_2.getBookshelvesWithBooks)();
        res.status(200).json(bookshelves);
    }
    catch (error) {
        console.error("Error fetching bookshelves:", error);
        res.status(500).json({ error: "Failed to fetch bookshelves" });
    }
};
exports.fetchBookshelves = fetchBookshelves;
const fetchBooksByCategory = async (_req, res) => {
    try {
        const books = await (0, bookService_3.getBooksByCategory)();
        res.status(200).json(books);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch books by category" });
    }
};
exports.fetchBooksByCategory = fetchBooksByCategory;
const fetchBookStatsHandler = async (req, res) => {
    try {
        const stats = await (0, bookService_4.getBookStats)();
        res.status(200).json(stats);
    }
    catch (error) {
        console.error("Error fetching book stats:", error);
        res.status(500).json({ error: "Failed to fetch book statistics." });
    }
};
exports.fetchBookStatsHandler = fetchBookStatsHandler;
