import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Your email address is required!")
    .nonempty("Email cannot be empty!"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long!")
    .max(32, "Password must be at most 32 characters long!")
    .nonempty("Password must be entered!"),
});

export const registerSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long!")
    .max(32, "Password must be at most 32 characters long!")
    .nonempty("Password is required"),
  name: z.string().nonempty("Full Name is required"),
  username: z
    .string()
    .nonempty("Username is required")
    .regex(/^\S*$/, "Username cannot contain spaces"),
});
