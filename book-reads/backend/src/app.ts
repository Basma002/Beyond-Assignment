import express from "express";
import corsConfig from "./config/corsConfig";
import authRoutes from "./routers/authRouter";
import booksRouter from "./routers/bookRouter";
import reviewRouter from "./routers/reviewRouter";
import userRouter from "./routers/userRouter";
import bookShelfRoute from "./routers/bookShelfRouter";
import categoryRouter from "./routers/categoryRouter";
import { errorHandler } from "./middleware/errorMiddleware";

const app = express();

app.use(corsConfig);  
app.use(express.json());

app.options("*", corsConfig); 

// Routes
app.use("/auth", authRoutes);
app.use("/books", booksRouter);
app.use("/reviews", reviewRouter);
app.use("/bookshelves", bookShelfRoute);
app.use("/users", userRouter);
app.use("/categories", categoryRouter);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Backend is running with updated CORS!");
});

export default app;
