"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewService_1 = require("../services/reviewService");
const authenticate_1 = __importDefault(require("../middleware/authenticate"));
const router = (0, express_1.Router)();
router.post("/:bookId", authenticate_1.default, async (req, res) => {
    const { bookId } = req.params; // Extract from URL
    const { userId, text, rating } = req.body;
    if (!userId || !text || !rating) {
        return res.status(400).json({ error: "All fields are required." });
    }
    try {
        const review = await (0, reviewService_1.addReview)(bookId, text, rating, userId);
        res.status(201).json(review);
    }
    catch (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ error: "Failed to add review." });
    }
});
// Get all reviews for a book
router.get("/:bookId", async (req, res) => {
    const { bookId } = req.params;
    try {
        const reviews = await (0, reviewService_1.getReviewsByBookId)(bookId);
        res.status(200).json(reviews);
    }
    catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
});
exports.default = router;
