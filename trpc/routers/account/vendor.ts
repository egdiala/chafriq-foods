import { TRPCError } from "@trpc/server";

import { api, handleErrorMessage } from "@/trpc/helper";

import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { changePasswordVendorFormSchema, deleteVendorFormSchema, updateVendorProfileFormSchema } from "@/validations/vendor-account";
import z from "zod";

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
    changePassword: protectedProcedure.input(changePasswordVendorFormSchema).mutation(async ({ ctx, input }): Promise<{ status: string; data: VendorProfileResponse }> => {
        try {
            const response = await api.put("cooks/accounts", input, {
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
    getDocument: protectedProcedure.input(z.string().min(1, "Document type is required")).query(async ({ ctx, input }): Promise<{ status: string; data: { file_link: string; } }> => {
        try {
            const response = await api.get(`cooks/accounts/documents?document_type=${input}`, {
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
    deleteProfile: protectedProcedure.input(deleteVendorFormSchema).mutation(async ({ ctx, input }): Promise<{ status: string; data: VendorProfileResponse }> => {
        try {
            const response = await api.patch("cooks/accounts", input, {
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
