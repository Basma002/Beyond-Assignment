import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from '../../client';

type Role = "USER" | "ADMIN";

export const signupService = async (name: string, email: string, password: string, role: Role = "USER") => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role },
  });

  return user;
};


export const loginService = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role }, // Payload
    process.env.JWT_SECRET!, // Secret key
    { expiresIn: "2h" } // Expiry
  );

  return { user, token };
};
