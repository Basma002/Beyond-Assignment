import prisma from '../../client';


export const getUserActivity = async (userId: string) => {
  const reviews = await prisma.review.findMany({
    where: { authorId: userId },
    include: { book: { select: { title: true, author: true } } },
  });

  const bookshelves = await prisma.bookShelves.findMany({
    where: { userId },
    include: { books: true },
  });

  return { reviews, bookshelves };
};
