import express from "express";
import {
  createBookshelfHandler,
  addBookToBookshelfHandler,
  getBookshelfHandler,
  getAllBookshelvesHandler
} from "../controllers/bookShelfController";
import authenticate from "../middleware/authenticate";
import authorize from "../middleware/authorize";

const router = express.Router();

// Protect routes with authentication and authorization
router.post("/", authenticate, authorize(["USER", "ADMIN"]), createBookshelfHandler);
router.get("/:id", authenticate, authorize(["USER", "ADMIN"]), getBookshelfHandler);
router.get("/", authenticate, authorize(["USER", "ADMIN"]), getAllBookshelvesHandler);
router.post("/:bookshelfId/books", authenticate, authorize(["USER", "ADMIN"]), addBookToBookshelfHandler);

export default router;
