import request from "supertest";
import app from "../src/app"; 
import { prismaMock } from "../singleton"; 

describe("Books API", () => {
  beforeEach(() => {
    prismaMock.book.findUnique.mockResolvedValue({
      id: "1",
      title: "Mock Book",
      author: "Mock Author",
      coverImageUrl: null,
      categoryId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  it("should fetch a book by ID", async () => {
    const res = await request(app).get("/books/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("title", "Mock Book");
  });
});
