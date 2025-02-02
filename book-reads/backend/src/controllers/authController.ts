import { Request, Response } from "express";
import { signupService, loginService } from "../services/authService";

export const signup = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    const user = await signupService(name, email, password, role);
    res.status(201).json({ message: "User created successfully!", user });
  } catch (error: any) {
    if (error.code === "P2002") {
      res.status(400).json({ error: "Email already exists." });
    } else {
      res.status(500).json({ error: "User creation failed." });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await loginService(email, password);
    res.status(200).json({ message: "Login successful!", user, token });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};
