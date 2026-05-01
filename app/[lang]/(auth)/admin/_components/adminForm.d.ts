import { signinFormDataSchema } from "./adminForm.schema";

export type signInFormData = z.infer<typeof signinFormDataSchema>;