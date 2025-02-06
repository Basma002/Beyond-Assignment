"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookShelfController_1 = require("../controllers/bookShelfController");
const authenticate_1 = __importDefault(require("../middleware/authenticate"));
const authorize_1 = __importDefault(require("../middleware/authorize"));
const router = express_1.default.Router();
// Protect routes with authentication and authorization
router.post("/", authenticate_1.default, (0, authorize_1.default)(["USER", "ADMIN"]), bookShelfController_1.createBookshelfHandler);
router.get("/:id", authenticate_1.default, (0, authorize_1.default)(["USER", "ADMIN"]), bookShelfController_1.getBookshelfHandler);
router.get("/", authenticate_1.default, (0, authorize_1.default)(["USER", "ADMIN"]), bookShelfController_1.getAllBookshelvesHandler);
router.post("/:bookshelfId/books", authenticate_1.default, (0, authorize_1.default)(["USER", "ADMIN"]), bookShelfController_1.addBookToBookshelfHandler);
exports.default = router;
