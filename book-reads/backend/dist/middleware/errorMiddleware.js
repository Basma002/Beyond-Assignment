"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const customErrors_1 = require("../errors/customErrors");
const errorHandler = (err, req, res, _next) => {
    const statusCode = err instanceof customErrors_1.AppError ? err.statusCode : 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({ error: message });
};
exports.errorHandler = errorHandler;
