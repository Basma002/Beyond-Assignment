import request from "supertest";
import app from "../src/app";
import prisma from "../src/client"; 

describe("Books API", () => {
  beforeAll(async () => {
    await prisma.$connect(); 
  });

  beforeEach(async () => {
    await prisma.book.deleteMany(); 

    await prisma.book.create({
      data: {
        id: "1",
        title: "Mock Book",
        author: "Mock Author",
        coverImageUrl: null,
        categoryId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect(); 
  });

  it("should fetch a book by ID", async () => {
    const res = await request(app).get("/books/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("title", "Mock Book");
  });
});
