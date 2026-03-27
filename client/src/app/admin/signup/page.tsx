"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";

const adminSignupSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be 6+ characters"),
  adminCode: z.string().min(1, "Verification code is required"),
});

type AdminSignupData = z.infer<typeof adminSignupSchema>;

export default function AdminSignup() {
  const [serverError, setServerError] = useState("");
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AdminSignupData>({
    resolver: zodResolver(adminSignupSchema)
  });

  const onSubmit = async (data: AdminSignupData) => {
    setServerError("");
    try {
      const res = await fetch("http://localhost:5000/api/admin/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("token", result.token);
        router.push("/admin"); // Redirect to Dashboard
      } else {
        setServerError(result.error || "Signup failed");
      }
    } catch (err) {
      setServerError("Connection failed. Is the backend running?");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
           <h2 className="text-3xl font-bold text-slate-800">Admin Portal</h2>
           <p className="text-slate-500 text-sm mt-2">Create a new administrator account</p>
        </div>
        
        {serverError && <p className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm text-center border border-red-100 italic">{serverError}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Full Name</label>
            <input {...register("name")} className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-orange-500" placeholder="e.g. Admin User" />
            {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Email</label>
            <input {...register("email")} className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-orange-500" placeholder="admin@restro.com" />
            {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Password</label>
            <input {...register("password")} type="password" className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-orange-500" placeholder="••••••••" />
            {errors.password && <p className="text-red-500 text-xs mt-1 ml-1">{errors.password.message}</p>}
          </div>
          
          <div className="pt-4 border-t mt-4">
            <label className="block text-xs font-bold text-orange-600 uppercase mb-1 ml-1">Master Access Code</label>
            <input 
              {...register("adminCode")} 
              type="password" 
              placeholder="Enter Secret Code" 
              className="w-full p-3 border-2 border-orange-100 rounded-xl focus:border-orange-500 outline-none bg-orange-50/30" 
            />
             {errors.adminCode && <p className="text-red-500 text-xs mt-1 ml-1">{errors.adminCode.message}</p>}
          </div>

          <button 
            disabled={isSubmitting}
            className="w-full bg-slate-800 text-white p-4 rounded-xl font-bold hover:bg-slate-700 transition-all shadow-lg mt-4 disabled:bg-slate-400"
          >
            {isSubmitting ? "Creating Admin..." : "Authorize & Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}