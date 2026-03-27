"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Users, Utensils, Activity, CreditCard, AlertCircle } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getStats = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setStats(res.data.stats);
        setLoading(false);
      } catch (err: any) {
        if (err.response?.status === 403) {
          setError("Access Denied: You do not have administrator privileges.");
        } else {
          router.push("/login");
        }
        setLoading(false);
      }
    };

    getStats();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Loading Platform Stats...</p>
        </div>
      </div>
    );
  }

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
          Last Updated: {new Date().toLocaleTimeString()}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Users" value={stats.totalUsers} icon={<Users className="w-6 h-6 text-blue-600" />} color="bg-blue-50" />
        <StatCard title="Restaurants" value={stats.totalRestaurants} icon={<Utensils className="w-6 h-6 text-orange-600" />} color="bg-orange-50" />
        <StatCard title="Active Subs" value={stats.activeSubscriptions} icon={<CreditCard className="w-6 h-6 text-green-600" />} color="bg-green-50" />
        <StatCard title="Activity" value={stats.recentActivity?.length || 0} icon={<Activity className="w-6 h-6 text-purple-600" />} color="bg-purple-50" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Recent Platform Activity</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {stats.recentActivity?.length > 0 ? (
            stats.recentActivity.map((log: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-6 hover:bg-slate-50">
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

function StatCard({ title, value, icon, color }: any) {
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