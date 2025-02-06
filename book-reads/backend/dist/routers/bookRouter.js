"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controllers/bookController");
const bookController_2 = require("../controllers/bookController");
const bookController_3 = require("../controllers/bookController");
const router = express_1.default.Router();
router.post("/", bookController_1.createBook);
router.get("/", bookController_1.fetchBooks);
router.get("/stats", bookController_3.fetchBookStatsHandler);
router.get("/:id", bookController_1.fetchBookById);
router.get("/books-by-category", bookController_2.fetchBooksByCategory);
exports.default = router;
