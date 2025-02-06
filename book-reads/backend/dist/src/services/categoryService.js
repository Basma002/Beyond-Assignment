"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategoriesWithBooks = void 0;
const client_1 = __importDefault(require("../../client"));
const getAllCategoriesWithBooks = async () => {
    return await client_1.default.category.findMany({
        include: {
            books: {
                select: {
                    id: true,
                    title: true,
                    author: true,
                    coverImageUrl: true,
                    category: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
    });
};
exports.getAllCategoriesWithBooks = getAllCategoriesWithBooks;
