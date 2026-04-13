import z from "zod";

export const addToCartFormSchema = z.object({
    timezone: z.string().min(1, "Timezone is required"),
    menu_id: z.string().min(1, "Menu ID is required"),
    quantity_size: z.string().min(1, "Quantity is required"),
    order_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Order date is required")
})

export const pickupDetailsFormSchema = z.object({
    timezone: z.string().min(1, "Timezone is required"),
    cart_id: z.string().min(1, "Cart ID is required"),
    receiver_phone: z.string().min(1, "Phone number is required"),
    receiver_name: z.string().min(1, "Recipient name is required"),
    pickup_note: z.string().min(1, "Pickup note is required").max(200, "Pickup note cannot exceed 200 characters")
})

export type PickupDetailsFormValues = z.infer<typeof pickupDetailsFormSchema>