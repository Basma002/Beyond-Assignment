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
app.use(corsConfig); 
app.use(express.json()); 

app.use((req, res, next) => {        
  res.setHeader("Access-Control-Allow-Origin", "https://frontend-gr47fajr3-basmas-projects-c8197bc0.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Handle preflight requests
  }

  next();
});

// Routes
app.use("/auth", authRoutes);
app.use("/books", booksRouter);
app.use("/reviews", reviewRouter);
app.use("/bookshelves", bookShelfRoute);
app.use("/users", userRouter);
app.use("/uploads", express.static("uploads"));
app.use("/categories", categoryRouter);

// Error Handling Middleware
app.use(errorHandler);
app.options("*", corsConfig);

// Default route
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

export default app;
