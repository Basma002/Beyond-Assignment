import dotenv from "dotenv";
import app from "./app";
import { Request, Response } from "express";

dotenv.config();

export default function handler(req: Request, res: Response) {
  return app(req, res);
}
