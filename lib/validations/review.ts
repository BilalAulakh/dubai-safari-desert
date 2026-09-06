import { z } from "zod";

export const reviewSchema = z.object({
  customer_name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name is too long"),
  country: z
    .string()
    .min(2, "Country is required")
    .max(60, "Country name is too long"),
  email: z
    .string()
    .email("Please provide a valid email")
    .optional()
    .or(z.literal("")),
  rating: z
    .number()
    .int()
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating cannot exceed 5"),
  comment: z
    .string()
    .min(10, "Review must be at least 10 characters long")
    .max(1000, "Review exceeds 1000 characters"),
  // Honeypot field for spam prevention - bots fill this in, humans don't
  website_honeypot: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;
