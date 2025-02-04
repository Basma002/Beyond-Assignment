import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import prisma from "../client";

jest.mock("./client", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(), 
}));

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;


beforeEach(async () => {
  await prisma.$connect();
  mockReset(prismaMock);
});

afterAll(async () => {
  await prisma.$disconnect();
});

export { prismaMock };
