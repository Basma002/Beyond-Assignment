import express, { Express, Request, Response } from "express";
import authRoutes from "./routers/authRouter";
import booksRouter from "./routers/bookRouter";
import reviewRouter from "./routers/reviewRouter";
import userRouter from "./routers/userRouter";
import bookShelfRoute from "./routers/bookShelfRouter";
import corsConfig from "./config/corsConfig"; 
import { errorHandler } from "./middleware/errorMiddleware";
import categoryRouter from "./routers/categoryRouter";

const app: Express = express();

// Middleware
app.use(express.json());
app.use(corsConfig);

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

export default app;

