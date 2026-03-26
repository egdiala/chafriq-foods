import { TRPCError } from "@trpc/server";

import { api, handleErrorMessage } from "@/trpc/helper";

import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { updateVendorProfileFormSchema } from "@/validations/vendor-account";

export const vendorAccountRouter = createTRPCRouter({
    getProfile: protectedProcedure.query(async ({ ctx }): Promise<{ status: string; data: VendorProfileResponse }> => {
        try {
            const response = await api.get("cooks/accounts", {
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
    updateProfile: protectedProcedure.input(updateVendorProfileFormSchema).mutation(async ({ ctx, input }): Promise<{ status: string; data: VendorProfileResponse }> => {
        try {
            const response = await api.post("cooks/accounts", input, {
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
