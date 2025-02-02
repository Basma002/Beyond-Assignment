import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routers/authRouter";
import booksRouter from "./routers/bookRouter";
import reviewRouter from "./routers/reviewRouter";
import userRouter from "./routers/userRouter";
import bookShelfRoute from "./routers/bookShelfRouter";
import cors from "cors";
import { errorHandler } from "./middleware/errorMiddleware";
import categoryRouter from "./routers/categoryRouter";

dotenv.config(); // Load environment variables

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Allow frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use("/auth", authRoutes);
app.use("/books", booksRouter);
app.use("/reviews", reviewRouter);
app.use("/bookshelves", bookShelfRoute);
app.use("/users", userRouter);
app.use("/uploads", express.static("uploads"));
app.use("/categories", categoryRouter);app.use(errorHandler);

// Default route
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Start the server
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
