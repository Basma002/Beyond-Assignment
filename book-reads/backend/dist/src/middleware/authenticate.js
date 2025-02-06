"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
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
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        req.user = { userId: decoded.userId, role: decoded.role };
        next();
    }
    catch (error) {
        console.error("[AUTH] Invalid token:", error.message);
        res.status(403).json({ error: "Invalid token." });
    }
};
exports.default = authenticate;
