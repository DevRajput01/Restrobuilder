"use client";
import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";
import { Users, Utensils, CreditCard, AlertCircle, CalendarCheck } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type RecentActivity = {
  id?: string;
  action: string;
  createdAt: string;
};

type AdminStats = {
  totalUsers: number;
  totalRestaurants: number;
  activeSubscriptions: number;
  totalBookings: number;
  recentActivity?: RecentActivity[];
  monthlyBookings?: { month: string; bookings: number }[];
  userGrowth?: { month: string; users: number }[];
  restaurantRegistrations?: { month: string; restaurants: number }[];
  subscriptionBreakdown?: { name: string; value: number }[];
};

type ErrorWithResponse = {
  response?: {
    status?: number;
  };
};

const hasStatus = (error: unknown, status: number) =>
  typeof error === "object" &&
  error !== null &&
  "response" in error &&
  (error as ErrorWithResponse).response?.status === status;

const SUBSCRIPTION_COLORS = ["#16a34a", "#f97316", "#2563eb", "#7c3aed"];

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getStats = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await axios.get("/api/admin/stats", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setStats(res.data.stats);
        setLastUpdated(new Date());
      } catch (err: unknown) {
        if (hasStatus(err, 401)) {
          router.push("/login");
        } else if (hasStatus(err, 403)) {
          setError("Access Denied: You do not have administrator privileges.");
        } else {
          setError("Unable to load live admin stats. Please check that the backend and database are running.");
        }
      } finally {
        setLoading(false);
      }
    };

    getStats();
  }, [router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Restricted Access</h2>
          <p className="text-slate-500 mb-6">{error}</p>
          <button 
            onClick={() => router.push("/admin/signup")}
            className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-slate-800 transition"
          >
            Go to Admin Signup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-8">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Platform Overview</h1>
          <p className="text-slate-500 mt-1">Real-time metrics for RestroBuilder.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border shadow-sm text-sm font-medium text-slate-600">
          Last Updated: {lastUpdated ? lastUpdated.toLocaleTimeString() : "Loading..."}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {loading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard title="Total Users" value={stats?.totalUsers ?? 0} icon={<Users className="w-6 h-6 text-blue-600" />} color="bg-blue-50" />
            <StatCard title="Total Restaurants" value={stats?.totalRestaurants ?? 0} icon={<Utensils className="w-6 h-6 text-orange-600" />} color="bg-orange-50" />
            <StatCard title="Active Subs" value={stats?.activeSubscriptions ?? 0} icon={<CreditCard className="w-6 h-6 text-green-600" />} color="bg-green-50" />
            <StatCard title="Total Bookings" value={stats?.totalBookings ?? 0} icon={<CalendarCheck className="w-6 h-6 text-purple-600" />} color="bg-purple-50" />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-10">
        <ChartCard title="Monthly Bookings">
          {loading ? (
            <ChartSkeleton />
          ) : (stats?.monthlyBookings?.length ?? 0) > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={stats?.monthlyBookings}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="bookings" fill="#7c3aed" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChart message="No bookings recorded this year." />
          )}
        </ChartCard>

        <ChartCard title="User Growth">
          {loading ? (
            <ChartSkeleton />
          ) : (stats?.userGrowth?.length ?? 0) > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={stats?.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChart message="No users recorded this year." />
          )}
        </ChartCard>

        <ChartCard title="Restaurant Registrations">
          {loading ? (
            <ChartSkeleton />
          ) : (stats?.restaurantRegistrations?.length ?? 0) > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={stats?.restaurantRegistrations}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="restaurants" fill="#f97316" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChart message="No restaurants recorded this year." />
          )}
        </ChartCard>

        <ChartCard title="Completed Subscriptions by Plan">
          {loading ? (
            <ChartSkeleton />
          ) : (stats?.subscriptionBreakdown?.length ?? 0) > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={stats?.subscriptionBreakdown}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  label
                >
                  {stats?.subscriptionBreakdown?.map((entry, index) => (
                    <Cell key={entry.name} fill={SUBSCRIPTION_COLORS[index % SUBSCRIPTION_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <EmptyChart message="No completed subscription payments yet." />
          )}
        </ChartCard>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Recent Platform Activity</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {loading ? (
            <div className="p-10 text-center text-slate-400 italic">Loading activity...</div>
          ) : (stats?.recentActivity?.length ?? 0) > 0 ? (
            stats?.recentActivity?.map((log: RecentActivity, index: number) => (
              <div key={log.id ?? index} className="flex items-center justify-between p-6 hover:bg-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <p className="text-slate-700 font-medium">{log.action}</p>
                </div>
                <span className="text-sm text-slate-400">
                  {new Date(log.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-slate-400 italic">No activity recorded.</div>
          )}
        </div>
      </div>
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: number;
  icon: ReactNode;
  color: string;
};

function StatCardSkeleton() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5 animate-pulse">
      <div className="w-14 h-14 rounded-2xl bg-slate-100"></div>
      <div className="flex-1">
        <div className="h-3 w-24 bg-slate-100 rounded mb-3"></div>
        <div className="h-8 w-16 bg-slate-100 rounded"></div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
        <p className="text-3xl font-black text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-6">{title}</h3>
      {children}
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="h-[280px] rounded-xl bg-slate-50 animate-pulse" />
  );
}

function EmptyChart({ message }: { message: string }) {
  return (
    <div className="h-[280px] flex items-center justify-center text-slate-400 italic bg-slate-50 rounded-xl">
      {message}
    </div>
  );
}