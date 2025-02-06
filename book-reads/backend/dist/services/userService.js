"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserActivity = void 0;
const client_1 = __importDefault(require("../client"));
const getUserActivity = async (userId) => {
    const reviews = await client_1.default.review.findMany({
        where: { authorId: userId },
        include: { book: { select: { title: true, author: true } } },
    });
    const bookshelves = await client_1.default.bookShelves.findMany({
        where: { userId },
        include: { books: true },
    });
    return { reviews, bookshelves };
};
exports.getUserActivity = getUserActivity;
