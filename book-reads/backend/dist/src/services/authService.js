"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = exports.signupService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = __importDefault(require("../../client"));
const signupService = async (name, email, password, role = "USER") => {
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const user = await client_1.default.user.create({
        data: { name, email, password: hashedPassword, role },
    });
    return user;
};
exports.signupService = signupService;
const loginService = async (email, password) => {
    const user = await client_1.default.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt_1.default.compare(password, user.password))) {
        throw new Error("Invalid email or password");
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, // Payload
    process.env.JWT_SECRET, // Secret key
    { expiresIn: "2h" } // Expiry
    );
    return { user, token };
};
exports.loginService = loginService;
