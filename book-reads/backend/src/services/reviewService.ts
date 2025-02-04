import prisma from '../../client';


// Add a review to a book
export const addReview = async (bookId: string, text: string, rating: number, authorId?: string) => {
  return await prisma.review.create({
    data: {
      bookId,
      text,      
      rating,
      authorId: authorId || undefined,
    },
  });
};


// Get all reviews for a book
export const getReviewsByBookId = async (bookId: string) => {
  return await prisma.review.findMany({
    where: { bookId },
    include: {
      author: {
        select: { name: true },  
      },
    },
  });
};
