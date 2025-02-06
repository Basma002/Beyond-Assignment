"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authenticate_1 = __importDefault(require("../middleware/authenticate"));
const router = express_1.default.Router();
router.get("/:id/activity", authenticate_1.default, userController_1.fetchUserActivityHandler);
exports.default = router;
