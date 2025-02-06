"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewsByBookHandler = exports.addReviewHandler = void 0;
const reviewService_1 = require("../services/reviewService");
const addReviewHandler = async (req, res) => {
    const { id: bookId } = req.params;
    const { rating, text, userId } = req.body;
    if (!bookId || !text || !rating) {
        return res.status(400).json({ error: "Missing required fields: bookId, text, or rating." });
    }
    try {
        const review = await (0, reviewService_1.addReview)(bookId, text, rating, userId || null);
        res.status(201).json({ message: "Review added successfully!", review });
    }
    catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ error: "Failed to add review." });
    }
};
exports.addReviewHandler = addReviewHandler;
const getReviewsByBookHandler = async (req, res) => {
    const { id: bookId } = req.params;
    try {
        const reviews = await (0, reviewService_1.getReviewsByBookId)(bookId);
        res.status(200).json(reviews);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch reviews." });
    }
};
exports.getReviewsByBookHandler = getReviewsByBookHandler;
