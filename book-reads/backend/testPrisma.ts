import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createCategories() {
  const categories = [
    { name: "Fiction" },
    { name: "Non-Fiction" },
    { name: "Mystery" },
    { name: "Classics" },
  ];

  try {
    for (const category of categories) {
      await prisma.category.create({ data: category });
    }
    console.log("Categories created successfully!");
  } catch (error) {
    console.error("Error creating categories:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createCategories();
