import { Request, Response } from "express";
import { getUserActivity } from "../services/userService";

export const fetchUserActivityHandler = async (req: Request, res: Response) => {
  const { id: userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  try {
    const activity = await getUserActivity(userId);
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user activity." });
  }
};
