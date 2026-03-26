import * as z from "zod";

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
    gender: z.string().min(1, "Gender is required"),
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