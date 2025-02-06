"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUserActivityHandler = void 0;
const userService_1 = require("../services/userService");
const fetchUserActivityHandler = async (req, res) => {
    const { id: userId } = req.params;
    if (!userId) {
        return res.status(400).json({ error: "User ID is required." });
    }
    try {
        const activity = await (0, userService_1.getUserActivity)(userId);
        res.status(200).json(activity);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch user activity." });
    }
};
exports.fetchUserActivityHandler = fetchUserActivityHandler;
