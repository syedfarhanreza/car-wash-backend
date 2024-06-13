import { z } from "zod";

export const userValidationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).trim(),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" })
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  phone: z.string({ message: "Phone number is require-String" }),
  role: z.enum(["admin", "user"]),
  address: z.string().min(1, { message: "Address is required" }),
});
