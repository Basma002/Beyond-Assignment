"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter_1 = __importDefault(require("./routers/authRouter"));
const bookRouter_1 = __importDefault(require("./routers/bookRouter"));
const reviewRouter_1 = __importDefault(require("./routers/reviewRouter"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const bookShelfRouter_1 = __importDefault(require("./routers/bookShelfRouter"));
const corsConfig_1 = __importDefault(require("./config/corsConfig"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const categoryRouter_1 = __importDefault(require("./routers/categoryRouter"));
const app = (0, express_1.default)();
// Middleware
app.use(corsConfig_1.default); // CORS should be the first middleware
app.use(express_1.default.json()); // JSON Parser
// Routes
app.use("/auth", authRouter_1.default);
app.use("/books", bookRouter_1.default);
app.use("/reviews", reviewRouter_1.default);
app.use("/bookshelves", bookShelfRouter_1.default);
app.use("/users", userRouter_1.default);
app.use("/uploads", express_1.default.static("uploads"));
app.use("/categories", categoryRouter_1.default);
// Error Handling Middleware
app.use(errorMiddleware_1.errorHandler);
// Default route
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
exports.default = app;
