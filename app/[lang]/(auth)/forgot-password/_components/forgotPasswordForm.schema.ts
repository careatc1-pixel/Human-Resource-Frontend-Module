import { z } from "zod";

export const forgotPasswordFormSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
});
