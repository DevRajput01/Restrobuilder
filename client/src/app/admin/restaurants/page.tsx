"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Utensils, AlertCircle, ExternalLink } from "lucide-react";

export default function AdminRestaurantsPage() {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchRestaurants = async () => {
      const token = localStorage.getItem("token");
      if (!token) { router.push("/login"); return; }

      try {
        const res = await axios.get("http://localhost:5000/api/admin/restaurants", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRestaurants(res.data.restaurants);
      } catch (err: any) {
        if (err.response?.status === 403) {
          setError("Access Denied: Admins only.");
        } else {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Loading Restaurants...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-sm border text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Restricted Access</h2>
          <p className="text-slate-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center gap-3">
        <Utensils className="w-7 h-7 text-orange-600" />
        <h1 className="text-2xl font-extrabold text-slate-900">All Restaurants</h1>
        <span className="ml-auto bg-orange-50 text-orange-600 text-sm font-bold px-3 py-1 rounded-full">
          {restaurants.length} total
        </span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm text-left text-slate-600">
          <thead className="bg-slate-50 text-slate-400 uppercase text-xs border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Restaurant Name</th>
              <th className="px-6 py-4">Owner</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4">View</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {restaurants.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-slate-400 italic">
                  No restaurants found.
                </td>
              </tr>
            ) : (
              restaurants.map((r: any, index: number) => (
                <tr key={r.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 text-slate-400">{index + 1}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">{r.name}</td>
                  <td className="px-6 py-4 text-slate-500">{r.user?.name ?? "—"}</td>
                  <td className="px-6 py-4 text-slate-400 font-mono text-xs">{r.slug}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      r.isPublished
                        ? "bg-green-100 text-green-600"
                        : "bg-slate-100 text-slate-400"
                    }`}>
                      {r.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={`http://localhost:3000/view/${r.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-orange-500 hover:underline text-xs font-medium"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Visit
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}