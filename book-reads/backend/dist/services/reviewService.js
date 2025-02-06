"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewsByBookId = exports.addReview = void 0;
const client_1 = __importDefault(require("../client"));
// Add a review to a book
const addReview = async (bookId, text, rating, authorId) => {
    return await client_1.default.review.create({
        data: {
            bookId,
            text,
            rating,
            authorId: authorId || undefined,
        },
    });
};
exports.addReview = addReview;
// Get all reviews for a book
const getReviewsByBookId = async (bookId) => {
    return await client_1.default.review.findMany({
        where: { bookId },
        include: {
            author: {
                select: { name: true },
            },
        },
    });
};
exports.getReviewsByBookId = getReviewsByBookId;
