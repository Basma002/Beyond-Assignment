import { addBook } from "../../src/services/bookService";
import { prismaMock } from "../../singleton";

describe("POST /book", () => {
  test("should add a book", async () => {
    const category = {
      id: '1',
      name: 'fiction',
    }

    prismaMock.category.create.mockResolvedValue(category);

    const book = {
      id: "1", 
      title: "mock book",
      author: "mock author",
      categoryId: "1",
      coverImageUrl: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1389733983i/16322.jpg",
      createdAt: new Date(), 
      updatedAt: new Date()
    };
  
    const {createdAt, updatedAt, id, ...createBookData} = book
  
    prismaMock.book.create.mockResolvedValue(book);
  
    await expect(addBook(createBookData)).resolves.toEqual(book);
  });
})
