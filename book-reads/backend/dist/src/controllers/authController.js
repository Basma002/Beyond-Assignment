"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const authService_1 = require("../services/authService");
const signup = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const user = await (0, authService_1.signupService)(name, email, password, role);
        res.status(201).json({ message: "User created successfully!", user });
    }
    catch (error) {
        if (error.code === "P2002") {
            res.status(400).json({ error: "Email already exists." });
        }
        else {
            res.status(500).json({ error: "User creation failed." });
        }
    }
};
exports.signup = signup;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { user, token } = await (0, authService_1.loginService)(email, password);
        res.status(200).json({ message: "Login successful!", user, token });
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
};
exports.login = login;
