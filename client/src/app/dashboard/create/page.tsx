"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Utensils, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function CreateRestaurant() {
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/restaurants",
        { name, tagline },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // On success, redirect to the new restaurant's editor or dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-orange-600 transition mb-8 font-medium">
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-10 border border-slate-100">
          <div className="flex items-center justify-center w-16 h-16 bg-orange-50 rounded-2xl mb-6">
            <Utensils className="text-orange-600" size={32} />
          </div>

          <h1 className="text-3xl font-black text-slate-900 mb-2">Create your Website</h1>
          <p className="text-slate-500 mb-8 italic">Enter your restaurant details to launch your online presence.</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium italic border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleCreate} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Restaurant Name</label>
              <input 
                type="text" 
                placeholder="e.g. The Golden Fork" 
                required
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all text-slate-900"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Short Tagline</label>
              <input 
                type="text" 
                placeholder="e.g. Authentic Italian Cuisine" 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all text-slate-900"
                onChange={(e) => setTagline(e.target.value)}
              />
            </div>

            <button 
              disabled={loading}
              className="w-full bg-orange-600 text-white p-4 rounded-2xl font-bold text-lg hover:bg-orange-700 transition shadow-lg shadow-orange-100 flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Launching Site...
                </>
              ) : (
                "Create My Website"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}