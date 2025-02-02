import express from "express";
import { fetchUserActivityHandler } from "../controllers/userController";
import authenticate from "../middleware/authenticate";

const router = express.Router();

router.get("/:id/activity", authenticate, fetchUserActivityHandler);

export default router;
