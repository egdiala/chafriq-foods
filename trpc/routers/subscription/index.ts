import { appendQueryParams } from "@/lib/utils";
import { api, handleErrorMessage } from "@/trpc/helper";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { getSubscriptionFormSchema, initSubscriptionFormSchema } from "@/validations/subscription";
import { TRPCError } from "@trpc/server";
import z from "zod";

type GeneralSubscriptionRes = SubscriptionSetupResponse[] | SubscriptionPlanResponse[] | SubscriptionPlanCountResponse;

export const subscriptionRouter = createTRPCRouter({
    getSubscription: protectedProcedure.input(getSubscriptionFormSchema).query(async ({ ctx, input }): Promise<{ status: string; data: GeneralSubscriptionRes }> => {
        try {
            const response = await api.get(appendQueryParams("cooks/accounts/subscriptions", input), {
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
    initSubscription: protectedProcedure.input(initSubscriptionFormSchema).mutation(async ({ ctx, input }): Promise<{ status: string; data: InitSubscriptionResponse }> => {
        try {
            const response = await api.post("cooks/accounts/subscriptions", input, {
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
    completeSubscription: protectedProcedure.input(z.string().min(1, "Payment ID is required")).mutation(async ({ ctx, input }): Promise<{ status: string; }> => {
        try {
            const response = await api.put(`cooks/accounts/subscriptions/${input}`, input, {
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