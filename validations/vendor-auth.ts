import * as z from "zod";

type PasswordRequirement = {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    // number: boolean;
    specialChar: boolean;
};

/**
 * Evaluates password requirements based on the given password
 * @param password The password to evaluate
 * @returns Object containing boolean values for each requirement
 */
export const evaluatePasswordRequirements = (password: string): PasswordRequirement => {
    return {
        length: password.length >= 6,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        // number: /[0-9]/.test(password),
        specialChar: /[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(password)
    };
};

export const loginVendorFormSchema = z.object({
    email: z.email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(6, 'Password must be at least 6 characters').refine(
      (value) => {
        const { length, uppercase, lowercase, specialChar } = evaluatePasswordRequirements(value);
        return length && uppercase && lowercase && specialChar;
      },
      {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      }
    ),
    rememberMe: z.boolean()
})

export type LoginVendorFormType = z.infer<typeof loginVendorFormSchema>;

export const registerVendorFormSchema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    // middle_name: z.string().optional(),
    home_address: z.string().min(1, "Address is required"),
    home_state: z.string().min(1, "State is required"),
    home_city: z.string().min(1, "City is required"),
    home_zip: z.string().min(1, "Zip code is required"),
    business_name: z.string().min(1, "Business name is required"),
    business_address_id: z.string().min(1, "Business location is required"),
    is_home_address: z.boolean(),
    business_abn: z.string().min(1, "ABN is required"),
    year_exp: z.string().min(1, "Years of experience is required"),
    dish_list: z.array(z.string().min(1, "Cuisine cannot be empty")).min(1, "At least one cuisine is required"),
    gender: z.string().min(1, "Gender is required"),
    phone_number: z.string().min(1, "Phone number is required"),
    email: z.email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(6, ' ').refine(
      (value) => {
        const { length, uppercase, lowercase, specialChar } = evaluatePasswordRequirements(value);
        return length && uppercase && lowercase && specialChar;
      },
      {
        message:
          ' '
      }
    ),
    terms: z.boolean().refine((val) => val, {
        message: 'Please read and accept the terms and conditions'
    })
})

export type RegisterVendorFormType = z.infer<typeof registerVendorFormSchema>;

export const forgotPasswordVendorFormSchema = z.object({
    email: z.email("Invalid email address").min(1, "Email is required"),
})

export type ForgotPasswordVendorFormType = z.infer<typeof forgotPasswordVendorFormSchema>;

export const confirmOtpVendorFormSchema = z.object({
    email: z.email("Invalid email address").min(1, "Email is required"),
    otp_code: z.string().length(4, "Otp code is required"),
})

export type ConfirmOtpVendorFormType = z.infer<typeof confirmOtpVendorFormSchema>;

export const resendOtpVendorFormSchema = z.object({
    email: z.email("Invalid email address").min(1, "Email is required"),
    request_type: z.enum(["register", "reset"]),
})

export type ResendOtpVendorFormType = z.infer<typeof resendOtpVendorFormSchema>;

export const resetPasswordVendorFormSchema = z.object({
    email: z.email("Invalid email address").min(1, "Email is required"),
    otp_code: z.string().length(4, "Otp code is required"),
    new_password: z.string().min(6, 'Password must be at least 6 characters').refine(
      (value) => {
        const { length, uppercase, lowercase, specialChar } = evaluatePasswordRequirements(value);
        return length && uppercase && lowercase && specialChar;
      },
      {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, and one special character'
      }
    ),
    confirm_new_password: z.string()
}).refine((data) => data.new_password === data.confirm_new_password, {
  message: 'Passwords do not match',
  path: ['confirm_new_password']
});

export type ResetPasswordVendorFormType = z.infer<typeof resetPasswordVendorFormSchema>;