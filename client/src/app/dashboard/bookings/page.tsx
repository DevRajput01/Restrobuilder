"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CalendarDays, Clock, Check, X, Users, MessageSquare, Phone, Mail } from "lucide-react";

const statusColors: any = {
  PENDING:   "bg-amber-100 text-amber-600 border-amber-200",
  CONFIRMED: "bg-green-100 text-green-600 border-green-200",
  CANCELLED: "bg-red-100 text-red-500 border-red-200",
};

const statusIcons: any = {
  PENDING:   <Clock size={12} />,
  CONFIRMED: <Check size={12} />,
  CANCELLED: <X size={12} />,
};

export default function OwnerBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      if (!token) { router.push("/login"); return; }

      try {
        const res = await axios.get("http://localhost:5000/api/my-bookings", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data.bookings);
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [router]);

  const updateStatus = async (bookingId: string, status: string) => {
    const token = localStorage.getItem("token");
    try {
      await axios.patch(`http://localhost:5000/api/my-bookings/${bookingId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings((prev) => prev.map((b) => b.id === bookingId ? { ...b, status } : b));
    } catch {
      alert("Failed to update");
    }
  };

  const filtered = filter === "ALL"
    ? bookings
    : bookings.filter((b) => b.status === filter);

  const pendingCount = bookings.filter(b => b.status === "PENDING").length;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-3">
          <CalendarDays className="w-7 h-7 text-orange-600" />
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Table Bookings</h1>
            <p className="text-slate-400 text-sm">Manage reservations from your customers</p>
          </div>
          {/* ✅ Pending badge */}
          {pendingCount > 0 && (
            <span className="bg-amber-500 text-white text-xs font-black px-2.5 py-1 rounded-full animate-pulse">
              {pendingCount} new
            </span>
          )}
        </div>

        {/* Filter tabs */}
        <div className="ml-auto flex items-center gap-2 flex-wrap">
          {["ALL", "PENDING", "CONFIRMED", "CANCELLED"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                filter === s
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {s} ({s === "ALL" ? bookings.length : bookings.filter(b => b.status === s).length})
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Pending",   count: bookings.filter(b => b.status === "PENDING").length,   bg: "bg-amber-50",  text: "text-amber-600",  border: "border-amber-100" },
          { label: "Confirmed", count: bookings.filter(b => b.status === "CONFIRMED").length, bg: "bg-green-50",  text: "text-green-600",  border: "border-green-100" },
          { label: "Cancelled", count: bookings.filter(b => b.status === "CANCELLED").length, bg: "bg-red-50",    text: "text-red-500",    border: "border-red-100" },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl border p-5 ${s.bg} ${s.border}`}>
            <p className={`text-3xl font-black ${s.text}`}>{s.count}</p>
            <p className={`text-xs font-bold uppercase tracking-widest mt-1 ${s.text} opacity-70`}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Booking Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
          <CalendarDays className="mx-auto text-slate-200 mb-4" size={48} />
          <p className="text-slate-400 font-medium italic">No bookings yet.</p>
          <p className="text-slate-300 text-sm mt-1">Bookings from your restaurant website will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((b: any) => (
            <div
              key={b.id}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition p-6 flex flex-col gap-4"
            >
              {/* Top row: name + status */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{b.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{b.restaurant?.name}</p>
                </div>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${statusColors[b.status]}`}>
                  {statusIcons[b.status]} {b.status}
                </span>
              </div>

              {/* Date / time / guests */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-50 rounded-2xl p-3 text-center">
                  <CalendarDays size={14} className="mx-auto text-slate-400 mb-1" />
                  <p className="text-xs font-bold text-slate-700">{b.date}</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-3 text-center">
                  <Clock size={14} className="mx-auto text-slate-400 mb-1" />
                  <p className="text-xs font-bold text-slate-700">{b.time}</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-3 text-center">
                  <Users size={14} className="mx-auto text-slate-400 mb-1" />
                  <p className="text-xs font-bold text-slate-700">{b.guests} pax</p>
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-1.5">
                {b.email && (
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Mail size={12} className="shrink-0" /> {b.email}
                  </div>
                )}
                {b.phone && (
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Phone size={12} className="shrink-0" /> {b.phone}
                  </div>
                )}
                {b.message && (
                  <div className="flex items-start gap-2 text-xs text-slate-500 bg-slate-50 rounded-xl p-2.5 mt-1">
                    <MessageSquare size={12} className="shrink-0 mt-0.5" />
                    <span className="italic">{b.message}</span>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 mt-auto pt-2 border-t border-slate-50">
                {b.status !== "CONFIRMED" && (
                  <button
                    onClick={() => updateStatus(b.id, "CONFIRMED")}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-green-50 text-green-600 text-xs font-bold rounded-2xl hover:bg-green-100 transition"
                  >
                    <Check size={14} /> Confirm
                  </button>
                )}
                {b.status !== "CANCELLED" && (
                  <button
                    onClick={() => updateStatus(b.id, "CANCELLED")}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-red-50 text-red-500 text-xs font-bold rounded-2xl hover:bg-red-100 transition"
                  >
                    <X size={14} /> Cancel
                  </button>
                )}
              </div>

              {/* Received time */}
              <p className="text-[10px] text-slate-300 text-center -mt-2">
                Received {new Date(b.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}