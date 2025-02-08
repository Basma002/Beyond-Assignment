import express from "express";
import cors from "cors";
import corsConfig from "./config/corsConfig";

const app = express();

app.use(corsConfig);  // Apply CORS
app.use(express.json());
