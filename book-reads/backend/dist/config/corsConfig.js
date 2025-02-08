"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const corsConfig = (0, cors_1.default)({
    origin: [
        "https://frontend-8seggegkz-basmas-projects-c8197bc0.vercel.app",
    ],
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization", // ✅ Allow necessary headers
});
exports.default = corsConfig;
