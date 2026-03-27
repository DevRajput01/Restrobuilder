"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { 
  Plus, Globe, Utensils, Layout, LogOut, Settings, 
  ShieldCheck, Star, Crown, Menu, Contact, TicketSlashIcon ,CalendarDays 
} from "lucide-react";
import Image from "next/image";

// 1. Define the Restaurant interface to fix the .id error
interface Restaurant {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  _count: {
    pages: number;
    menuItems: number;
  };
}

export default function UserDashboard() {
  // 2. Apply the interface to the state
  const [pendingBookings, setPendingBookings] = useState(0);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ name: "", role: "" });
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role") || "USER";
      const name = localStorage.getItem("userName") || "Restaurateur";
      
      setUser({ name, role });

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        // const res = await axios.get("http://localhost:5000/api/my-restaurants", {
        //   headers: { Authorization: `Bearer ${token}` }
        // });
        // setRestaurants(res.data);
        const res = await axios.get("http://localhost:5000/api/my-restaurants", {
  headers: { Authorization: `Bearer ${token}` }
});
setRestaurants(res.data);

// ✅ fetch pending bookings count
try {
  const bookingRes = await axios.get("http://localhost:5000/api/my-bookings", {
    headers: { Authorization: `Bearer ${token}` }
  });
  const pending = bookingRes.data.bookings.filter((b: any) => b.status === "PENDING").length;
  setPendingBookings(pending);
} catch {}
      } catch (err) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  const renderRoleBadge = () => {
    switch (user.role) {
      case "ADMIN":
        return <span className="flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold border border-red-200"><ShieldCheck size={14}/> ADMIN</span>;
      case "PREMIUM_USER":
        return <span className="flex items-center gap-1 bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-bold border border-purple-200"><Crown size={14}/> PREMIUM</span>;
      case "PRIME_USER":
        return <span className="flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold border border-blue-200"><Star size={14}/> PRIME</span>;
      default:
        return <span className="flex items-center gap-1 bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">FREE PLAN</span>;
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium italic">Setting up your kitchen...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mini Sidebar */}
      <aside className="w-20 md:w-64 bg-white border-r border-slate-200 flex flex-col items-center md:items-start p-4 transition-all">
        <div className="flex items-center gap-2 mb-10 md:px-2">
          <Image src="/logo/logobg.png" alt="Logo" width={32} height={32} />
          <span className="hidden md:block font-bold text-slate-900 text-lg">RestroBuilder</span>
        </div>
        
        <nav className="flex-1 w-full space-y-2">
          <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-orange-50 text-orange-600 font-bold">
            <Layout size={20} /> <span className="hidden md:block">My Sites</span>
          </button>
          
          {/* Corrected "Edit Menu" Sidebar Button */}
          <button 
            onClick={() => {
              const firstRestaurant = restaurants[0];
              if (firstRestaurant) {
                router.push(`/dashboard/menu/${firstRestaurant.id}`);
              } else {
                alert("Please create a restaurant first to manage a menu!");
              }
            }}
            className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-500 hover:bg-slate-50 transition"
          >
            <Menu size={20} /> 
            <span className="hidden md:block">Edit Menu</span>
          </button>
          <button
  onClick={() => router.push("/dashboard/bookings")}
  className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-500 hover:bg-slate-50 transition relative"
>
  <CalendarDays size={20} />
  <span className="hidden md:block">Bookings</span>

  {/* ✅ pending badge */}
  {pendingBookings > 0 && (
    <span className="absolute top-2 left-5 md:static md:ml-auto bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse">
      {pendingBookings}
    </span>
  )}
</button>

          <button className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-500 hover:bg-slate-50 transition">
            <Contact size={20} /> <span className="hidden md:block">Update Contact</span>
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-500 hover:bg-slate-50 transition">
            <TicketSlashIcon size={20} /> <span className="hidden md:block">Testimonials</span>
          </button>
          <button className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-500 hover:bg-slate-50 transition">
            <Settings size={20} /> <span className="hidden md:block">Account</span>
          </button>
        </nav>

        <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition mt-auto">
          <LogOut size={20} /> <span className="hidden md:block">Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Hello, {user.name}</h1>
              {renderRoleBadge()}
            </div>
            <p className="text-slate-500">Manage your online restaurants and menus.</p>
          </div>
          
          <button 
            onClick={() => router.push("/dashboard/create")}
            className="flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-orange-700 transition shadow-lg shadow-orange-100"
          >
            <Plus size={20} /> New Restaurant
          </button>
        </header>

        {/* Restaurants Grid */}
        {restaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((res) => (
              <div key={res.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition group overflow-hidden">
                <div className="h-32 bg-slate-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-6 bg-white p-2 rounded-lg shadow-sm">
                    <Utensils className="text-orange-600" size={20} />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{res.name}</h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-1">{res.tagline}</p>
                  
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-6">
                    <span className="flex items-center gap-1"><Layout size={14}/> {res._count?.pages || 0} Pages</span>
                    <span className="flex items-center gap-1"><Utensils size={14}/> {res._count?.menuItems || 0} Items</span>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => router.push(`/dashboard/edit/${res.id}`)}
                      className="flex-1 bg-slate-900 text-white py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition"
                    >
                      Edit Site
                    </button>
                    <a 
                      href={`/view/${res.slug}`} 
                      target="_blank" 
                      className="p-2 border rounded-xl text-slate-400 hover:text-orange-600 hover:border-orange-200 transition"
                    >
                      <Globe size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-slate-200">
            <Utensils className="text-slate-300 mx-auto mb-4" size={48} />
            <h3 className="text-lg font-bold text-slate-900">No restaurants yet</h3>
            <p className="text-slate-500 mb-6 max-w-xs mx-auto text-sm italic">Create your first website to start taking orders online.</p>
            <button onClick={() => router.push("/dashboard/create")} className="text-orange-600 font-bold hover:underline">Start Creating →</button>
          </div>
        )}
      </main>
    </div>
  );
}