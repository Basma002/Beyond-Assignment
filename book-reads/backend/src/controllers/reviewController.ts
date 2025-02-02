import { Request, Response } from "express";
import { addReview, getReviewsByBookId } from "../services/reviewService";

export const addReviewHandler = async (req: Request, res: Response) => {
  const { id: bookId } = req.params;
  const { rating, text, userId } = req.body; 

  if (!bookId || !text || !rating) {
    return res.status(400).json({ error: "Missing required fields: bookId, text, or rating." });
  }

  try {
    const review = await addReview(bookId, text, rating, userId || null);
    res.status(201).json({ message: "Review added successfully!", review });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ error: "Failed to add review." });
  }
};


export const getReviewsByBookHandler = async (req: Request, res: Response) => {
  const { id: bookId } = req.params;

  try {
    const reviews = await getReviewsByBookId(bookId);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews." });
  }
};
