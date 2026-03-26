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
    dish_list: z.string().optional(),
    order_distance: z.string().optional(),
    phone_number: z.string().optional(),
})