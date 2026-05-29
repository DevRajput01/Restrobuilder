import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { isAdmin } from '../middleware/adminMiddleware';

const router = Router();
const prisma = new PrismaClient();

// ─── Helpers ────────────────────────────────────────────────────────────────

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

/** Fill in months with 0 for any month that has no rows */
function fillMonths(
  rows: { month: number; count: bigint }[]
): { month: string; count: number }[] {
  const map = new Map(rows.map(r => [Number(r.month), Number(r.count)]));
  const currentMonth = new Date().getMonth() + 1; // 1-based

  return Array.from({ length: currentMonth }, (_, i) => ({
    month: MONTHS[i],
    count: map.get(i + 1) ?? 0,
  }));
}

const getPagination = (query: any) => {
  const page  = Math.max(parseInt(query.page  as string, 10) || 1,  1);
  const limit = Math.min(Math.max(parseInt(query.limit as string, 10) || 10, 1), 100);
  return { page, limit, skip: (page - 1) * limit };
};

const buildPaginationMeta = (page: number, limit: number, total: number) => ({
  page,
  limit,
  total,
  totalPages: Math.max(Math.ceil(total / limit), 1),
});

type RecentActivity = {
  id: string;
  action: string;
  createdAt: Date;
};

const sortRecentActivity = (items: RecentActivity[]) =>
  items
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 10);

// ─── GET /api/admin/stats ────────────────────────────────────────────────────

router.get('/stats', isAdmin, async (_req: any, res: any) => {
  try {
    const currentYear = new Date().getFullYear();
    const yearStart = new Date(currentYear, 0, 1);
    const nextYearStart = new Date(currentYear + 1, 0, 1);

    const [
      totalUsers,
      totalRestaurants,
      activeSubscriptions,
      totalBookings,
      activityLogs,
      latestUsers,
      latestRestaurants,
      latestBookings,
      latestPayments,

      // Monthly bookings (table_bookings."createdAt")
      monthlyBookingsRaw,

      // Monthly new users (users."createdAt")
      monthlyUsersRaw,

      // Monthly new restaurants (restaurants."createdAt")
      monthlyRestaurantsRaw,

      // Subscription plan breakdown from payments table
      subscriptionBreakdownRaw,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.restaurant.count(),
      prisma.user.count({ where: { subscriptionStatus: 'ACTIVE' } }),
      (prisma as any).tableBooking.count(),

      prisma.activityLog.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, action: true, createdAt: true },
      }),

      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, email: true, createdAt: true },
      }),

      prisma.restaurant.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, createdAt: true },
      }),

      (prisma as any).tableBooking.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          createdAt: true,
          restaurant: { select: { name: true } },
        },
      }),

      prisma.payment.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, plan: true, status: true, createdAt: true },
      }),

      // Monthly bookings for current year
      prisma.$queryRaw<{ month: number; count: bigint }[]>`
        SELECT
          EXTRACT(MONTH FROM "createdAt")::int AS month,
          COUNT(*)::bigint                     AS count
        FROM "table_bookings"
        WHERE "createdAt" >= ${yearStart}
          AND "createdAt" < ${nextYearStart}
        GROUP BY month
        ORDER BY month
      `,

      // Monthly new users for current year
      prisma.$queryRaw<{ month: number; count: bigint }[]>`
        SELECT
          EXTRACT(MONTH FROM "createdAt")::int AS month,
          COUNT(*)::bigint                     AS count
        FROM users
        WHERE "createdAt" >= ${yearStart}
          AND "createdAt" < ${nextYearStart}
        GROUP BY month
        ORDER BY month
      `,

      // Monthly new restaurants for current year
      prisma.$queryRaw<{ month: number; count: bigint }[]>`
        SELECT
          EXTRACT(MONTH FROM "createdAt")::int AS month,
          COUNT(*)::bigint                     AS count
        FROM restaurants
        WHERE "createdAt" >= ${yearStart}
          AND "createdAt" < ${nextYearStart}
        GROUP BY month
        ORDER BY month
      `,

      // Subscription plan breakdown (prime vs premium) — count active payments
      prisma.$queryRaw<{ plan: string; count: bigint }[]>`
        SELECT
          plan,
          COUNT(*)::bigint AS count
        FROM payments
        WHERE status = 'COMPLETED'
        GROUP BY plan
        ORDER BY plan
      `,
    ]);

    // ── Shape monthly data ──────────────────────────────────────────────────

    const monthlyBookings = fillMonths(monthlyBookingsRaw)
      .map(r => ({ month: r.month, bookings: r.count }));

    // Cumulative user growth (running total)
    const usersByMonth = fillMonths(monthlyUsersRaw);
    let cumulative = 0;
    const userGrowth = usersByMonth.map(r => {
      cumulative += r.count;
      return { month: r.month, users: cumulative };
    });

    const restaurantRegistrations = fillMonths(monthlyRestaurantsRaw)
      .map(r => ({ month: r.month, restaurants: r.count }));

    const subscriptionBreakdown = subscriptionBreakdownRaw.map(r => ({
      name: r.plan.charAt(0).toUpperCase() + r.plan.slice(1), // "prime" → "Prime"
      value: Number(r.count),
    }));

    const recentActivity = sortRecentActivity([
      ...activityLogs.map(log => ({
        id: log.id,
        action: log.action,
        createdAt: log.createdAt,
      })),
      ...latestUsers.map(user => ({
        id: `user-${user.id}`,
        action: `New user signed up: ${user.name || user.email}`,
        createdAt: user.createdAt,
      })),
      ...latestRestaurants.map(restaurant => ({
        id: `restaurant-${restaurant.id}`,
        action: `Restaurant created: ${restaurant.name}`,
        createdAt: restaurant.createdAt,
      })),
      ...latestBookings.map((booking: any) => ({
        id: `booking-${booking.id}`,
        action: `New booking for ${booking.restaurant?.name || 'a restaurant'} by ${booking.name}`,
        createdAt: booking.createdAt,
      })),
      ...latestPayments.map(payment => ({
        id: `payment-${payment.id}`,
        action: `${payment.status.toLowerCase()} payment recorded for ${payment.plan} plan`,
        createdAt: payment.createdAt,
      })),
    ]);

    return res.json({
      stats: {
        // Scalar totals (existing)
        totalUsers,
        totalRestaurants,
        activeSubscriptions,
        totalBookings,
        recentActivity,

        // Chart data (new)
        monthlyBookings,
        userGrowth,
        restaurantRegistrations,
        subscriptionBreakdown,
      },
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// ─── GET /api/admin/restaurants ─────────────────────────────────────────────

router.get('/restaurants', isAdmin, async (req: any, res: any) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const [restaurants, total] = await Promise.all([
      prisma.restaurant.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          slug: true,
          isPublished: true,
          createdAt: true,
          user: { select: { name: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.restaurant.count(),
    ]);

    return res.json({ restaurants, pagination: buildPaginationMeta(page, limit, total) });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
});

// ─── GET /api/admin/users ────────────────────────────────────────────────────

router.get('/users', isAdmin, async (req: any, res: any) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          restaurants: { select: { id: true, name: true, slug: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count(),
    ]);

    return res.json({ users, pagination: buildPaginationMeta(page, limit, total) });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
});

export default router;