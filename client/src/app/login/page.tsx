"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 1. Define the Zod Schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid Email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Infer the type from the schema
type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();

  // 2. Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", data);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("userName", user.name);

      toast.success("Login successful! Redirecting on Dashboard...");
      
      // Delay redirect slightly to show the success toast
      // setTimeout(() => router.push("/dashboard"), 1500);

    setTimeout(() => {
  if (user?.role !== 'ADMIN') {
    router.push("/dashboard");
  } else {
    router.push("/admin");
  }
}, 1500);

    } catch (err: any) {
      const message = err.response?.data?.error || "Invalid credentials. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      {/* Toast Container needs to be present in the component or layout */}
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
        <div className="flex flex-col items-center mb-8">
          <Image src="/logo/logobg.png" alt="Logo" width={48} height={48} className="mb-4" />
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight text-center">Welcome Back</h2>
          <p className="text-slate-500 text-sm mt-2 text-center italic">
            Log in to manage your restaurant website
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
            <input
              {...register("email")}
              type="email"
              placeholder="name@restaurant.com"
              className={`w-full p-4 text-slate-900 border ${
                errors.email ? "border-red-500" : "border-slate-200"
              } rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 italic">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className={`w-full p-4 text-slate-900 border ${
                errors.password ? "border-red-500" : "border-slate-200"
              } rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 italic">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-600 text-white p-4 rounded-2xl font-bold text-lg hover:bg-orange-700 transition shadow-lg shadow-orange-100 disabled:opacity-50"
          >
            {isSubmitting ? "Authenticating..." : "Login to My Account"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm italic">
            Don't have an account?{" "}
            <Link href="/signup" className="text-orange-600 font-bold hover:underline">
              Get Started Free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}