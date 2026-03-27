"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Users, AlertCircle } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      if (!token) { router.push("/login"); return; }

      try {
        const res = await axios.get("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.users);
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
    fetchUsers();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium">Loading Users...</p>
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
        <Users className="w-7 h-7 text-blue-600" />
        <h1 className="text-2xl font-extrabold text-slate-900">All Users</h1>
        <span className="ml-auto bg-blue-50 text-blue-600 text-sm font-bold px-3 py-1 rounded-full">
          {users.length} total
        </span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-sm text-left text-slate-600">
          <thead className="bg-slate-50 text-slate-400 uppercase text-xs border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">#</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4">Websites</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10 text-slate-400 italic">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user: any, index: number) => (
                <tr key={user.id} className="hover:bg-slate-50 transition"> {/* ✅ fixed: user.id */}
                  <td className="px-6 py-4 text-slate-400">{index + 1}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user.role === "ADMIN"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-slate-100 text-slate-500"
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {user.restaurants?.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        {user.restaurants.map((r: any) => (
                          <a
                            key={r.id}
                            href={`http://localhost:3000/view/${r.slug}`}
                            target="_blank"
                            className="text-orange-500 hover:underline text-xs font-medium"
                          >
                            {r.name}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <span className="text-slate-400 italic text-xs">No website</span>
                    )}
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