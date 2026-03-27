import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { z, ZodIssue,  } from 'zod'; // Added AnyZodObject here
import { generateToken, authenticate } from './middleware/auth';
import { slugify } from './utils/slugify';
import { menuItemSchema, restaurantSchema, signupSchema } from './validations/schemas';
import adminRoutes from './routes/admin';



const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;
setInterval(async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (e) {}
}, 4 * 60 * 1000);
// --- MIDDLEWARE ---
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

/**
 * Validation Middleware
 * Transforms Zod errors into a single string for easy frontend display
 */
const validate = (schema: z.ZodTypeAny) => 
  async (req: any, res: Response, next: NextFunction): Promise<any> => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // 1. Check if result.error exists to prevent the 'undefined' crash
      // 2. Use 'as any' to stop the TypeScript red line on .errors
      const errorSource = (result as any).error;
      
      if (errorSource && errorSource.errors) {
        const errorMessage = errorSource.errors
          .map((err: any) => err.message)
          .join(", ");
          
        return res.status(400).json({ error: errorMessage });
      }

      // Fallback if Zod failed but didn't provide a standard error array
      return res.status(400).json({ error: "Invalid request data" });
    }

    req.body = result.data; 
    next();
  };

// --- AUTH ROUTES ---

app.post('/api/auth/signup', validate(signupSchema), async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });

    const token = generateToken(user.id);
    return res.status(201).json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    return res.status(409).json({ error: "User already exists with this email" });
  }
});

app.post('/api/auth/login', async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = generateToken(user.id);
  return res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
});

// --- RESTAURANT ROUTES ---

app.post('/api/restaurants', authenticate, validate(restaurantSchema), async (req: any, res: Response): Promise<any> => {
  try {
    const { name, tagline } = req.body;
    const userId = req.userId;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    const count = await prisma.restaurant.count({ where: { userId } });

    if (user && count >= user.maxWebsites) {
      return res.status(403).json({ error: "Website limit reached for your plan." });
    }

    // const slug = `${slugify(name)}${Math.floor(Math.random() * 1000)}`;
        const slug = `${slugify(name)}`;

    const restaurant = await prisma.restaurant.create({
      data: { name, slug, tagline, userId },
    });

    return res.status(201).json(restaurant);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error while creating restaurant" });
  }
});

app.get('/api/my-restaurants', authenticate, async (req: any, res: Response): Promise<any> => {
  const restaurants = await prisma.restaurant.findMany({
    where: { userId: req.userId },
    include: {
      menuItems: true,
      _count: { select: { pages: true, menuItems: true } }
    }
  });
  return res.json(restaurants);
});

// PUBLIC VIEW ROUTE
app.get('/api/view/:slug', async (req: Request, res: Response): Promise<any> => {
  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { slug: req.params.slug as string },
      include: {
        pages: { where: { isPublished: true } },
        menuItems: { where: { isAvailable: true } },
        faqs: { where: { isPublished: true } }
      }
    });

    if (!restaurant) return res.status(404).json({ error: "Restaurant not found" });
    return res.json(restaurant);
  } catch (error) {
    return res.status(500).json({ error: "Failed to load public view" });
  }
});

// --- MENU MANAGEMENT ---

app.post('/api/restaurants/:id/menu', authenticate, validate(menuItemSchema), async (req: any, res: Response): Promise<any> => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await prisma.restaurant.findFirst({
      where: { id: restaurantId, userId: req.userId }
    });

    if (!restaurant) return res.status(403).json({ error: "Unauthorized access to this restaurant" });

    const newItem = await prisma.menuItem.create({
      data: { ...req.body, restaurantId }
    });

    return res.status(201).json(newItem);
  } catch (error) {
    return res.status(500).json({ error: "Failed to add menu item" });
  }
});

app.delete('/api/menu/:id', authenticate, async (req: any, res: Response): Promise<any> => {
  try {
    // Basic delete. In production, check if the parent restaurant belongs to req.userId
    await prisma.menuItem.delete({ where: { id: req.params.id } });
    return res.json({ message: "Item deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete item" });
  }
});

// --- UPDATE RESTAURANT (PATCH) ---

app.patch('/api/restaurants/:id', authenticate, async (req: any, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const restaurant = await prisma.restaurant.findFirst({
      where: { id, userId: req.userId }
    });

    if (!restaurant) return res.status(403).json({ error: "Restaurant not found or unauthorized" });

    const { name, tagline, coverImage, logo, theme, content, contactInfo, isPublished, menuItems } = req.body;

    const updateData: any = {
      name, tagline, coverImage, logo, theme, content, contactInfo, isPublished,
      updatedAt: new Date(),
    };

    // Wipe and replace logic for Menu Items
    if (menuItems && Array.isArray(menuItems)) {
      updateData.menuItems = {
        deleteMany: {},
        create: menuItems.map((item: any) => ({
          name: item.name || "Untitled Dish",
          description: item.description || "",
          price: parseFloat(item.price) || 0,
          category: item.category || "General",
          isAvailable: item.isAvailable ?? true,
          image: item.image || null, 
        }))
      };
    }

    const updated = await prisma.restaurant.update({
      where: { id },
      data: updateData,
    });

    return res.json(updated);
  } catch (error) {
    console.error("Patch Error:", error);
    return res.status(500).json({ error: "Update failed. Please check your data format." });
  }
});

// --- ADMIN ---
app.post('/api/admin/signup', async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password, adminCode } = req.body;

    // 1. Verify the Secret Admin Code
    // Best practice: Store 'ADMIN_SECRET_CODE' in your .env file
    if (adminCode !== process.env.ADMIN_SECRET_CODE) {
      return res.status(403).json({ error: "Invalid admin verification code" });
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create the User with ADMIN role
    const adminUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'ADMIN', // Manually setting the role here
      },
    });

    const token = generateToken(adminUser.id);
    
    return res.status(201).json({ 
      message: "Admin created successfully",
      token, 
      user: { id: adminUser.id, email: adminUser.email, role: adminUser.role } 
    });

  } catch (error) {
    console.error(error);
    return res.status(409).json({ error: "User already exists or registration failed" });
  }
});

// POST /api/bookings - public, no auth needed
app.post('/api/bookings', async (req: Request, res: Response): Promise<any> => {
  try {
    const { restaurantId, name, email, phone, date, time, guests, message } = req.body;

    if (!restaurantId || !name || !date || !time || !guests) {
      return res.status(400).json({ error: "Please fill all required fields" });
    }

    const booking = await (prisma as any).tableBooking.create({
      data: {
        restaurantId,
        name,
        email:   email   || null,
        phone:   phone   || null,
        message: message || null,
        date,
        time,
        guests: parseInt(guests),
        status: 'PENDING'
      }
    });

    return res.status(201).json({ success: true, booking });
  } catch (error) {
    console.error("create booking error:", error);
    return res.status(500).json({ error: "Failed to create booking" });
  }
});

// GET /api/my-bookings - restaurant owner sees their bookings
app.get('/api/my-bookings', authenticate, async (req: any, res: Response): Promise<any> => {
  try {
    const restaurants = await prisma.restaurant.findMany({
      where: { userId: req.userId },
      select: { id: true }
    });

    const restaurantIds = restaurants.map((r: { id: string }) => r.id);

    if (restaurantIds.length === 0) {
      return res.json({ bookings: [] });
    }

    const bookings = await (prisma as any).tableBooking.findMany({
      where: { restaurantId: { in: restaurantIds } },
      include: {
        restaurant: { select: { name: true, slug: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    return res.json({ bookings });
  } catch (error) {
    console.error("my-bookings error:", error);
    return res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// PATCH /api/my-bookings/:id - owner updates booking status
app.patch('/api/my-bookings/:id', authenticate, async (req: any, res: Response): Promise<any> => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const booking = await (prisma as any).tableBooking.findUnique({
      where: { id },
      include: { restaurant: { select: { userId: true } } }
    });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    if (booking.restaurant.userId !== req.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const updated = await (prisma as any).tableBooking.update({
      where: { id },
      data: { status }
    });

    return res.json({ booking: updated });
  } catch (error) {
    console.error("update booking error:", error);
    return res.status(500).json({ error: 'Failed to update booking' });
  }
});



// add this line alongside your other routes
app.use('/api/admin', adminRoutes);

app.get('/api/admin/verify', authenticate, async (req: any, res: Response): Promise<any> => {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  if (!user || user.role !== 'ADMIN') return res.status(403).json({ isAdmin: false, error: "Access denied" });
  return res.json({ isAdmin: true, user });
});



app.get('/api/admin/dashboard', authenticate, async (req: any, res: Response): Promise<any> => {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  if (user?.role !== 'ADMIN') return res.status(403).json({ error: "Admin access only" });

  const stats = {
    totalUsers: await prisma.user.count(),
    totalRestaurants: await prisma.restaurant.count(),
    activeSubscriptions: await prisma.user.count({ where: { subscriptionStatus: 'ACTIVE' } }),
  };

  return res.json({ stats });
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));