import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const authorize = (requiredRoles: ("ADMIN" | "USER")[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.user?.userId; 
    if (!userId) {
      res.status(401).json({ error: "Unauthorized. User not authenticated." });
      return;
    }

    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user || !requiredRoles.includes(user.role)) {  
        res.status(403).json({ error: "Forbidden. Insufficient privileges." });
        return;
      }

      next();
    } catch (error) {
      res.status(500).json({ error: "Server error during authorization." });
    }
  };
};

export default authorize;
