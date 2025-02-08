import dotenv from "dotenv";
import app from "./app";

dotenv.config();

// Vercel expects an exported default function
export default app;
