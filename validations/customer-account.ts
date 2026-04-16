import * as z from "zod";

export const updateCustomerProfileFormSchema = z.object({
    delivery_address: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    zipcode: z.string().optional(),
    full_name: z.string().optional(),
    phone_number: z.string().optional(),
    email: z.string().optional(),
    email_otp: z.string().optional(),
    gender: z.enum(["male", "female"]).optional(),
    order_update: z.enum(["0", "1"]).optional(),
    promo_update: z.enum(["0", "1"]).optional(),
    platform_update: z.enum(["0", "1"]).optional(),
})

export const editCustomerProfileFormSchema = z.object({
    full_name: z.string().min(1, "Full name is required").max(100, "Full name must be at most 100 characters").regex(/^[\p{L}\s'-]+$/u, "Invalid characters in name").refine((value) => {
        const parts = value.trim().split(/\s+/);
        return parts.length >= 2 && parts.length <= 3;
    }, "Enter a valid full name (first and last name)"),
    phone_number: z.string().min(1, "Phone number is required"),
    gender: z.enum(["male", "female"], "Please select a gender"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    zipcode: z.string().min(1, "Zip code is required"),
})

export const changeEmailFormSchema = z.object({
    email: z.email("Invalid email address").min(1, "Email is required"),
    email_otp: z.string(),
    shouldSendOtp: z.boolean()
}).superRefine((data, ctx) => {
    if (!data.shouldSendOtp) {
        if (!data.email_otp) {
            ctx.addIssue({
                path: ["email_otp"],
                code: "custom",
                message: "Otp code is required",
            });
        } else if (!/^\d{4}$/.test(data.email_otp)) {
            ctx.addIssue({
                path: ["email_otp"],
                code: "custom",
                message: "Otp must be 4 digits",
            });
        }
    }
});