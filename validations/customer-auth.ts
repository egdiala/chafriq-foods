import * as z from "zod";
import { evaluatePasswordRequirements } from "./vendor-auth";

export const registerCustomerFormSchema = z.object({
    full_name: z.string().min(1, "Full name is required").max(100, "Full name must be at most 100 characters").regex(/^[\p{L}\s'-]+$/u, "Invalid characters in name").refine((value) => {
        const parts = value.trim().split(/\s+/);
        return parts.length >= 2 && parts.length <= 3;
    }, "Enter a valid full name (first and last name)"),
    email: z.email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(6, 'Password must be at least 6 characters').refine(
      (value) => {
        const { length, uppercase, lowercase, specialChar } = evaluatePasswordRequirements(value);
        return length && uppercase && lowercase && specialChar;
      },
      {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, and one special character'
      }
    ),
    phone_number: z.string().min(1, "Phone number is required"),
    terms: z.boolean().refine((val) => val, {
        message: 'Please read and accept the terms and conditions'
    })
})

export type RegisterCustomerFormType = z.infer<typeof registerCustomerFormSchema>;