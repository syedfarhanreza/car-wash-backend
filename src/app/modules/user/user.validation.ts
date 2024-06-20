import { z } from "zod";

const userValidationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).trim(),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" })
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  phone: z.string({ message: "Phone number is require-String" }),
  role: z.enum(["admin", "user"]),
  address: z.string().min(1, { message: "Address is required" }),
});
const loginValidationSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" })
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});
export const UserValidation = {
  userValidationSchema,
  loginValidationSchema,
};
