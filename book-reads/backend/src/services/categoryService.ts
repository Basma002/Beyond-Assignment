import prisma from '../../client';

export const getAllCategoriesWithBooks = async () => {
    return await prisma.category.findMany({
      include: {
        books: {
          select: {
            id: true,
            title: true,
            author: true,
            coverImageUrl: true,
            category: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  };
  