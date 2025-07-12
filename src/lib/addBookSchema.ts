import { z } from "zod";

const currentYear = new Date().getFullYear();

export const AddBookSchema = z.object({
  title: z.string().min(1, "Ttile is required"),
  author: z.string().min(1, "Author is required"),
  year: z.string()
  .length(4, { message: "Year must be exactly 4 digits" })
  .regex(/^\d{4}$/, { message: "Year must contain only digits" })
  .refine((val) => parseInt(val) <= currentYear, {
      message: "Year cannot be in the future",
    })
});

// Optional: TypeScript type from schema
export type RegisterFormData = z.infer<typeof AddBookSchema>;