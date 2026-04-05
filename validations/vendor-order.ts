import * as z from "zod";

export const getVendorOrdersFormSchema = z.object({
    status: z.enum(["1", "2", "3", "4"]).optional(),
    item_per_page: z.string().optional(),
    page: z.string().optional(),
    component: z.enum(["count", "count-status"]).optional(),
})

export type GetVendorOrdersFormType = z.infer<typeof getVendorOrdersFormSchema>;

export const updateVendorOrderStatusSchema = z.object({
    order_id: z.string().min(1, "Order ID is required"),
    status: z.enum(["2", "3", "4"]), //	2 = ongoing, 3 = ready for pickup, 4 = cancelled
    reason: z.string().min(2, "Reason is required").max(200, "Reason cannot exceed 200 characters")
})