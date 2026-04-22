import z from "zod";

export const customerNotificationsSchema = z.object({
    page: z.string().optional(),
    item_per_page: z.string().optional(),
    component: z.enum(["count", "count-unread"]).optional(),
})

export type CustomerNotificationsQuery = z.infer<typeof customerNotificationsSchema>