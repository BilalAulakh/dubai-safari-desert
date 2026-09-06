import { z } from "zod";

export const bookingSchema = z.object({
  customer_name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80, "Name is too long"),
  phone: z
    .string()
    .min(7, "Please enter a valid phone or WhatsApp number")
    .regex(/^[+0-9\s\-()]+$/, "Phone number can only contain digits, +, spaces, and dashes"),
  email: z
    .string()
    .email("Please provide a valid email address")
    .optional()
    .or(z.literal("")),
  package_id: z.string().min(1, "Please select a safari package"),
  booking_date: z
    .string()
    .min(1, "Preferred date is required")
    .refine((val) => {
      const selected = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected >= today;
    }, "Safari date cannot be in the past"),
  adults: z
    .number({ invalid_type_error: "Adults count is required" })
    .int()
    .min(1, "At least 1 adult guest is required")
    .max(50, "For groups larger than 50, please contact us for custom group rates"),
  children: z
    .number({ invalid_type_error: "Children count is required" })
    .int()
    .min(0, "Children cannot be negative")
    .max(30, "Maximum 30 children per booking request"),
  pickup_location: z.string().min(2, "Please select a pickup area"),
  hotel_name: z.string().max(120).optional(),
  special_requests: z.string().max(600).optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
