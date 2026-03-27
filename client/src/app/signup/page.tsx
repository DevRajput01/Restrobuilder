"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// --- 1. Define Validation Schema ---
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  // --- 2. Initialize Hook Form ---
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // --- 3. Optimized Submit Handler ---
  const onSubmit = async (formData: SignupFormData) => {
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);

        
        router.push("/login");
      } else {
        // Backend validation error or "User exists" error
        setError(data.error || "Signup failed");
      }
    } catch (err) {
      setError("Server is not responding. Ensure backend is running.");
    }
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <Image src="/logo/logobg.png" alt="Logo" width={32} height={32} />
          <span className="font-bold text-xl text-orange-600 tracking-tight">RestroBuilder</span>
        </div>

        <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Create Account</h2>
        <p className="text-slate-500 mb-8 text-sm italic">Start building your restaurant website today.</p>

        {error && <p className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm italic">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
            <input 
              {...register("name")}
              type="text" 
              className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-slate-200'} focus:ring-2 focus:ring-orange-500 outline-none text-slate-900`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1 italic">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
            <input 
              {...register("email")}
              type="email" 
              className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-slate-200'} focus:ring-2 focus:ring-orange-500 outline-none text-slate-900`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 italic">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
            <input 
              {...register("password")}
              type="password" 
              className={`w-full px-4 py-3 rounded-xl border ${errors.password ? 'border-red-500' : 'border-slate-200'} focus:ring-2 focus:ring-orange-500 outline-none text-slate-900`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1 italic">{errors.password.message}</p>}
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-orange-600 text-white font-bold py-3 rounded-xl hover:bg-orange-700 transition shadow-lg shadow-orange-100 mt-4 disabled:bg-slate-400"
          >
            {isSubmitting ? "Processing..." : "Create My Website"}
          </button>
        </form>
        
        <p className="mt-6 text-center text-slate-500 text-sm italic">
          Already have an account? <Link href="/login" className="text-orange-600 font-bold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}