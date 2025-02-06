"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const express_1 = __importDefault(require("express"));
const upload = (0, multer_1.default)({ dest: "uploads/" }); // Adjust destination path
const router = express_1.default.Router();
router.post("/upload", upload.single("coverImage"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    // Return the uploaded file path or URL
    res.json({ filePath: `/uploads/${req.file.filename}` });
});
exports.default = router;
