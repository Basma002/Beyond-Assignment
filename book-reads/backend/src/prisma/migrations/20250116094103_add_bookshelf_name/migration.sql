-- DropForeignKey
ALTER TABLE "BookShelfs" DROP CONSTRAINT "BookShelfs_bookId_fkey";

-- AlterTable
ALTER TABLE "BookShelfs" ALTER COLUMN "bookId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "BookShelfs" ADD CONSTRAINT "BookShelfs_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE SET NULL ON UPDATE CASCADE;
