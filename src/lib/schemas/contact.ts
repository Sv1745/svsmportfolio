import { z } from 'zod';

export const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required").optional(),
  message: z.string().min(10, "Message must be at least 10 characters long"),
  phone: z.string().optional(),
  company: z.string().optional(),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;