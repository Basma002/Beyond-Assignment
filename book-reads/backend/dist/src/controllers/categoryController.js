"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCategories = void 0;
const categoryService_1 = require("../services/categoryService");
const fetchCategories = async (_req, res) => {
    try {
        const categories = await (0, categoryService_1.getAllCategoriesWithBooks)();
        console.log(categories);
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch categories with books" });
    }
};
exports.fetchCategories = fetchCategories;
