import { z } from "zod";

export const commentSchema = z.object({
  post_id: z.string().min(1, "Post identifier required"),
  customer_name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name is too long"),
  email: z.string().email("Valid email address required"),
  comment: z
    .string()
    .min(5, "Comment must be at least 5 characters")
    .max(800, "Comment is too long"),
  website_honeypot: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export type CommentFormData = z.infer<typeof commentSchema>;
