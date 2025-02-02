import multer from "multer";
import express, { Request, Response } from "express";

const upload = multer({ dest: "uploads/" }); // Adjust destination path

const router = express.Router();

router.post("/upload", upload.single("coverImage"), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  // Return the uploaded file path or URL
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

export default router;
