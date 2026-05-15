import { z } from "zod";

export const onboardingFormSchema = z
  .object({
    // Step 1 — Personal Info
    firstName: z.string().trim().min(2, "First name must be at least 2 characters"),
    lastName: z.string().trim().min(2, "Last name must be at least 2 characters"),
    email: z.string().trim().email("Invalid email address"),
    phone: z.string().trim().regex(/^[0-9]{10}$/, "Phone must be 10 digits"),
    dateOfBirth: z.date({ message: "Date of birth is required" }),
    gender: z.enum(["Male", "Female", "Other"], { errorMap: () => ({ message: "Please select a gender" }) }),

    // Step 2 — Work Info
    role: z.string().trim().min(2, "Role is required"),
    department: z.string().trim().min(2, "Department is required"),
    manager: z.string().trim().min(2, "Manager is required"),
    salary: z.string().trim().regex(/^[0-9]+$/, "Salary must be a number"),
    joiningDate: z.date({ message: "Joining date is required" }),

    // Step 3 — Documents
    aadhaar: z.string().trim().regex(/^[0-9]{12}$/, "Aadhaar must be 12 digits").optional().or(z.literal("")),
    pan: z.string().trim().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format").optional().or(z.literal("")),
    photo: z.string().trim().optional().or(z.literal("")),
    resume: z.string().trim().optional().or(z.literal("")),

    // Step 4 — Assets
    laptop: z.enum(["Yes", "No"], { errorMap: () => ({ message: "Please select laptop allocation" }) }),
    sim: z.enum(["Yes", "No"], { errorMap: () => ({ message: "Please select SIM allocation" }) }),
    idCard: z.enum(["Yes", "No"], { errorMap: () => ({ message: "Please select ID card allocation" }) }),

    // Step 5 — Account Setup
    password: z.string().trim().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().trim().min(1, "Confirm password is required"),
    inviteEmail: z.string().trim().email("Invalid email address"),

    // Meta
    currentStep: z.number().int().min(1).max(5),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.joiningDate >= data.dateOfBirth, {
    message: "Joining date must be after date of birth",
    path: ["joiningDate"],
  });

export type OnboardingFormData = z.infer<typeof onboardingFormSchema>;
