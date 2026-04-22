import z from "zod";
import { TRPCError } from "@trpc/server";
import { api, handleErrorMessage } from "@/trpc/helper";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { customerNotificationsSchema } from "@/validations/customer-notifications";
import { appendQueryParams } from "@/lib/utils";

type CustomerNotificationsResponse = GetVendorNotificationResponse[] | GetNotificationCountResponse

export const vendorNotificationsRouter = createTRPCRouter({
    getNotifications: protectedProcedure.input(customerNotificationsSchema).query(async ({ ctx, input }): Promise<{ status: string; data: CustomerNotificationsResponse }> => {
        try {
            const response = await api.get(appendQueryParams("cooks/accounts/notifications", input), {
                headers: {
                    "Authorization": `Bearer ${ctx.accessToken}`
                }
            });
            return response.data;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: handleErrorMessage(error),
            });
        }
    }),
    readNotification: protectedProcedure.input(z.string().min(1, "Notification ID is required")).mutation(async ({ ctx, input }): Promise<{ status: string; data: GetVendorNotificationResponse }> => {
        try {
            const response = await api.put(`cooks/accounts/notifications/${input}`, {}, {
                headers: {
                    "Authorization": `Bearer ${ctx.accessToken}`
                }
            });
            return response.data;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: handleErrorMessage(error),
            });
        }
    }),
});