import * as z from "zod";
import { evaluatePasswordRequirements } from "./vendor-auth";

export const updateVendorProfileFormSchema = z.object({
    home_address: z.string().optional(),
    home_state: z.string().optional(),
    home_city: z.string().optional(),
    home_zip: z.string().optional(),
    business_address_id: z.string().optional(),
    year_exp: z.string().optional(),
    gender: z.string().optional(),
    business_username: z.string().optional(),
    dish_list: z.array(z.string()).optional(),
    order_distance: z.string().optional(),
    phone_number: z.string().optional(),
})

export const editVendorProfileFormSchema = z.object({
    home_address: z.string().min(1, "Address is required"),
    home_state: z.string().min(1, "State is required"),
    home_city: z.string().min(1, "City is required"),
    home_zip: z.string().min(1, "Zip code is required"),
    phone_number: z.string().min(1, "Phone number is required"),
    gender: z.enum(["male", "female"]),
    year_exp: z.string().min(1, "Years of experience is required"),
})

export const editVendorBusinessFormSchema = z.object({
    business_username: z.string().min(1, "Username is required"),
    business_address_id: z.string().min(1, "Business location is required"),
    dish_list: z.array(z.string().min(1, "Cuisine cannot be empty")).min(1, "At least one cuisine is required"),
    order_distance: z.string().transform((val) => Number(val)).refine((val) => !isNaN(val) && val >= 0 && val <= 100, {
        message: "Order distance must be a number between 0 and 100 km"
    })
})

export const deleteVendorFormSchema = z.object({
    password: z.string().min(6, 'Password must be at least 6 characters').refine(
      (value) => {
        const { length, uppercase, lowercase, specialChar } = evaluatePasswordRequirements(value);
        return length && uppercase && lowercase && specialChar;
      },
      {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, and one special character'
      }
    )
})

export const changePasswordVendorFormSchema = z.object({
    old_password: z.string().min(1, "Password is required"),
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

export type ChangePasswordVendorFormType = z.infer<typeof changePasswordVendorFormSchema>;

export const stateApprovalEvidenceFormSchema = z.object({
  file: z.string().min(1, "State Approval Evidence is required"),
  issuer: z.string().min(1, "Issuer is required"),
  issuer_num: z.string().min(1, "Issuer Number is required"),
  expiry_date: z.date().min(1, "Expiry Date is required"),
})

export const publicLiabilityFormSchema = z.object({
  file: z.string().min(1, "State Approval Evidence is required"),
  issuer: z.string().min(1, "Issuer is required"),
  issuer_num: z.string().min(1, "Issuer Number is required"),
  expiry_date: z.date().min(1, "Expiry Date is required"),
  coverage_amount: z.string().min(1, "Coverage amount is required")
})