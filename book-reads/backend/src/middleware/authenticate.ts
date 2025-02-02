import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user?: { userId: string; role: string };
  }
}

const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Unauthorized. No token provided." });
    return;
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    console.error("[AUTH] JWT_SECRET is missing from environment variables!");
    res.status(500).json({ error: "Server error: Missing JWT secret." });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as { userId: string; role: string };

    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    console.error("[AUTH] Invalid token:", (error as Error).message);
    res.status(403).json({ error: "Invalid token." });
  }
};

export default authenticate;
