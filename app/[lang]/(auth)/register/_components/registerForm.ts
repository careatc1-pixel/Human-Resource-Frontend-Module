import { registerFormDataSchema } from "./registerForm.schema";
import { z } from "zod";

export type registerFormData = z.infer<typeof registerFormDataSchema>;
