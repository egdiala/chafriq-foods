import z from "zod";

export const addToCartFormSchema = z.object({
    timezone: z.string().min(1, "Timezone is required"),
    menu_id: z.string().min(1, "Menu ID is required"),
    quantity_size: z.string().min(1, "Quantity is required"),
    order_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Order date is required")
})