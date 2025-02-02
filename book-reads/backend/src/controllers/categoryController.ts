import { Request, Response } from "express";
import { getAllCategoriesWithBooks } from "../services/categoryService";

export const fetchCategories = async (_req: Request, res: Response) => {
    try {
      const categories = await getAllCategoriesWithBooks();
      console.log(categories);
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories with books" });
    }
  };
  