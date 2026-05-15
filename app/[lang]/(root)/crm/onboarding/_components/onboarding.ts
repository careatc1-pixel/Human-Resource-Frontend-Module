import { onboardingFormSchema } from "./onboarding.schema";
import { z } from "zod";

export type OnboardingFormData = z.infer<typeof onboardingFormSchema>;

export const initialOnboardingData: OnboardingFormData = {
  // Step 1 — Personal Info
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: new Date(),
  gender: "Male",

  // Step 2 — Work Info
  role: "",
  department: "",
  manager: "",
  salary: "",
  joiningDate: new Date(),

  // Step 3 — Documents
  aadhaar: "",
  pan: "",
  photo: "",
  resume: "",

  // Step 4 — Assets
  laptop: "No",
  sim: "No",
  idCard: "No",

  // Step 5 — Account Setup
  password: "",
  confirmPassword: "",
  inviteEmail: "",

  // Meta
  currentStep: 1,
};
