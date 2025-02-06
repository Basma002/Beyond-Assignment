"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryService_1 = require("../services/categoryService");
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    try {
        const categories = await (0, categoryService_1.getAllCategoriesWithBooks)();
        res.status(200).json(categories);
    }
    catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ error: "Failed to fetch categories" });
    }
});
exports.default = router;
