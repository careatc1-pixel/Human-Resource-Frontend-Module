import { z } from "zod";

export const registerFormDataSchema = z
  .object({
    companyName: z.string().trim().min(2, "Company name is required"),
    fullName: z.string().trim().min(2, "Full name is required"),
    industry: z.string().trim().min(2, "Industry is required"),
    gstNumber: z.string().trim().optional().or(z.literal("")),
    email: z.string().trim().email("Invalid email address"),
    password: z.string().trim().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().trim().min(1, "Confirm password is required"),
      couponCode: z.string().trim().min(1, "Coupon code is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
