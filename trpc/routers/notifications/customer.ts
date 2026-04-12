import z from "zod";
import { TRPCError } from "@trpc/server";
import { api, handleErrorMessage } from "@/trpc/helper";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const customerNotificationsRouter = createTRPCRouter({
    getNotifications: protectedProcedure.query(async ({ ctx }): Promise<{ status: string; data: GetVendorNotificationResponse[] }> => {
        try {
            const response = await api.get("customers/accounts/notifications", {
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
            const response = await api.put(`customers/accounts/notifications/${input}`, {}, {
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