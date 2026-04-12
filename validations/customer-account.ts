import * as z from "zod";

export const updateCustomerProfileFormSchema = z.object({
    delivery_address: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    zipcode: z.string().optional(),
    gender: z.enum(["male", "female"]).optional(),
    order_update: z.enum(["0", "1"]).optional(),
    promo_update: z.enum(["0", "1"]).optional(),
    platform_update: z.enum(["0", "1"]).optional(),
})