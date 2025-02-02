import { Router } from "express";
import { getAllCategoriesWithBooks } from "../services/categoryService";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const categories = await getAllCategoriesWithBooks();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

export default router;
