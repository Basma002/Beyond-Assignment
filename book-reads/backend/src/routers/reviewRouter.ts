import { Router } from "express";
import { addReview, getReviewsByBookId } from "../services/reviewService";
import authenticate from "../middleware/authenticate";

const router = Router();


router.post("/:bookId", authenticate, async (req, res) => {
  const { bookId } = req.params; // Extract from URL
  const { userId, text, rating } = req.body;

  if (!userId || !text || !rating) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const review = await addReview(bookId, text, rating, userId);
    res.status(201).json(review);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Failed to add review." });
  }
});


// Get all reviews for a book
router.get("/:bookId", async (req, res) => {
  const { bookId } = req.params;

  try {
    const reviews = await getReviewsByBookId(bookId);
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

export default router;
