import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(3, "Name is too short"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export const restaurantSchema = z.object({
  name: z.string().min(2, "Restaurant name is required"),
  tagline: z.string().optional(),
});

export const menuItemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  description: z.string().optional(),
  price: z.number().positive("Price must be a positive number"),
  category: z.string().min(1, "Category is required"),
  isAvailable: z.boolean().optional(),
});

// export const adminSchema = z.object({

// });