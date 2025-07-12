import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.number().int().refine(val => [0, 1, 2].includes(val), {
    message: "Role must be selected",
  }),
});

// Optional: TypeScript type from schema
export type RegisterFormData = z.infer<typeof RegisterSchema>;
