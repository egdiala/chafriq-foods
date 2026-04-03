import { appendQueryParams } from "@/lib/utils";
import { api, handleErrorMessage } from "@/trpc/helper";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { getSubscriptionFormSchema } from "@/validations/subscription";
import { TRPCError } from "@trpc/server";

type GeneralSubscriptionRes = SubscriptionSetupResponse[];

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
});