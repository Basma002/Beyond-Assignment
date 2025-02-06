/*
  Warnings:

  - You are about to drop the `BookShelfs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BookShelfs" DROP CONSTRAINT "BookShelfs_bookId_fkey";

-- DropForeignKey
ALTER TABLE "BookShelfs" DROP CONSTRAINT "BookShelfs_userId_fkey";

-- DropTable
DROP TABLE "BookShelfs";

-- CreateTable
CREATE TABLE "BookShelves" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bookId" TEXT,

    CONSTRAINT "BookShelves_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookShelves" ADD CONSTRAINT "BookShelves_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookShelves" ADD CONSTRAINT "BookShelves_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
