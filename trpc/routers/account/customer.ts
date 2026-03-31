import { TRPCError } from "@trpc/server";

import { api, handleErrorMessage } from "@/trpc/helper";

import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { changePasswordVendorFormSchema, deleteVendorFormSchema, updateVendorProfileFormSchema } from "@/validations/vendor-account";

export const customerAccountRouter = createTRPCRouter({
    getProfile: protectedProcedure.query(async ({ ctx }): Promise<{ status: string; data: CustomerProfileResponse }> => {
        try {
            const response = await api.get("customers/accounts", {
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
    // updateProfile: protectedProcedure.input(updateVendorProfileFormSchema).mutation(async ({ ctx, input }): Promise<{ status: string; data: CustomerProfileResponse }> => {
    //     try {
    //         const response = await api.post("customers/accounts", input, {
    //             headers: {
    //                 "Authorization": `Bearer ${ctx.accessToken}`
    //             }
    //         });
    //         return response.data;
    //     } catch (error) {
    //         throw new TRPCError({
    //             code: "INTERNAL_SERVER_ERROR",
    //             message: handleErrorMessage(error),
    //         });
    //     }
    // }),
    changePassword: protectedProcedure.input(changePasswordVendorFormSchema).mutation(async ({ ctx, input }): Promise<{ status: string; data: CustomerProfileResponse }> => {
        try {
            const response = await api.put("customers/accounts", input, {
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
    deleteProfile: protectedProcedure.input(deleteVendorFormSchema).mutation(async ({ ctx, input }): Promise<{ status: string; data: CustomerProfileResponse }> => {
        try {
            const response = await api.patch("customers/accounts", input, {
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