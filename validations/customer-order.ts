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

export const getCustomerOrdersFormSchema = z.object({
    status: z.enum(["1", "2", "3", "4", "5"]).optional(), // 1=New | 2=Ongoing | 3=Ready for Pickup | 4=Completed | 5=Cancelled
    item_per_page: z.string().optional(),
    page: z.string().optional(),
    component: z.enum(["count"]).optional(),
})

export type GetCustomerOrdersFormType = z.infer<typeof getCustomerOrdersFormSchema>;