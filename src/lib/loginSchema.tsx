import { z } from "zod";

export const LoginSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

// Optional: TypeScript type from schema
export type RegisterFormData = z.infer<typeof LoginSchema>;