import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
// import { isAdmin } from '../middleware/admin';
import { isAdmin } from '../middleware/adminMiddleware';

const router = Router();
const prisma = new PrismaClient();
// GET /api/admin/restaurants
router.get('/restaurants', isAdmin, async (req: any, res: any) => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        isPublished: true,
        createdAt: true,
        user: {
          select: { name: true, email: true }  // show owner info
        }
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json({ restaurants });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
});
// GET /api/admin/users
router.get('/users', isAdmin, async (req: any, res: any) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
           restaurants: {          // ✅ include their restaurants
          select: {
            id: true,
            name: true,
            slug: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json({ users });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
});

export default router;