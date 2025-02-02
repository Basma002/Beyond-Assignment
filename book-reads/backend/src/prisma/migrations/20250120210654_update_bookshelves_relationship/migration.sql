/*
  Warnings:

  - You are about to drop the column `bookId` on the `BookShelves` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "BookShelves" DROP CONSTRAINT "BookShelves_bookId_fkey";

-- AlterTable
ALTER TABLE "BookShelves" DROP COLUMN "bookId";

-- CreateTable
CREATE TABLE "BooksOnShelves" (
    "id" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "bookshelfId" TEXT NOT NULL,

    CONSTRAINT "BooksOnShelves_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BooksOnShelves" ADD CONSTRAINT "BooksOnShelves_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BooksOnShelves" ADD CONSTRAINT "BooksOnShelves_bookshelfId_fkey" FOREIGN KEY ("bookshelfId") REFERENCES "BookShelves"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
