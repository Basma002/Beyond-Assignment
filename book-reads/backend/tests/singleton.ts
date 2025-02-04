import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import prisma from "../src/client"; // Ensure correct path

jest.mock("../src/client", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(), 
}));

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

// ✅ Reset Prisma mocks before each test
beforeEach(() => {
  mockReset(prismaMock);
});

export { prismaMock };
