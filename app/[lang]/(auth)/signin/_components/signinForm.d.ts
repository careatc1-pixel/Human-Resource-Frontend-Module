import { signinFormDataSchema } from "./signinform.schema";

export type signInFormData = z.infer<typeof signinFormDataSchema>;
