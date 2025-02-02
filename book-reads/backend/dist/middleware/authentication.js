"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticationMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Extract token from "Bearer <token>"
    if (!token) {
        return res.status(401).json({ error: "Unauthorized. No token provided." });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded token data to the request object
        next();
    }
    catch (error) {
        res.status(403).json({ error: "Invalid token." });
    }
};
exports.default = authenticationMiddleware;
