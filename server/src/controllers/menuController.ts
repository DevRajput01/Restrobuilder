import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Add an item to the menu
export const addMenuItem = async (restaurantId: string, data: any) => {
  return await prisma.menuItem.create({
    data: {
      ...data,
      restaurantId,
      price: parseFloat(data.price), // Ensure price is a number for Decimal field
    },
  });
};

// Get all items for a specific restaurant
export const getMenuItems = async (restaurantId: string) => {
  return await prisma.menuItem.findMany({
    where: { restaurantId },
    orderBy: { order: 'asc' },
  });
};