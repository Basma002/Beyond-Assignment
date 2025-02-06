"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const authorize = (requiredRoles) => {
    return async (req, res, next) => {
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
        }
        catch (error) {
            res.status(500).json({ error: "Server error during authorization." });
        }
    };
};
exports.default = authorize;
