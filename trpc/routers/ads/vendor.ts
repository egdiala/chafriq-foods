import { appendQueryParams } from "@/lib/utils";
import { api, handleErrorMessage } from "@/trpc/helper";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import z from "zod";

export const vendorAdsRouter = createTRPCRouter({
    getAds: protectedProcedure.input(z.enum(["web", "mobile"])).query(async ({ ctx, input }): Promise<{ status: string; data: VendorAdsResponse[] }> => {
        try {
            const response = await api.get(appendQueryParams("cooks/accounts/banner-ads", { platform: input }), {
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