import express from "express";
import { createBook, fetchBooks, fetchBookById } from "../controllers/bookController";
import { fetchBooksByCategory } from "../controllers/bookController";
import { Router } from "express";
import { fetchBookStatsHandler } from "../controllers/bookController";

const router = express.Router();

router.post("/", createBook);
router.get("/", fetchBooks);
router.get("/stats", fetchBookStatsHandler);
router.get("/:id", fetchBookById);
router.get("/books-by-category", fetchBooksByCategory);
export default router;
