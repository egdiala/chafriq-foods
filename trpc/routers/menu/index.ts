import z from "zod";
import { TRPCError } from "@trpc/server";
import { appendQueryParams } from "@/lib/utils";
import { api, handleErrorMessage } from "@/trpc/helper";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { createMenuFormSchema, getMenuListSchema } from "@/validations/menu";

export const menuRouter = createTRPCRouter({
    getMenuList: protectedProcedure.input(getMenuListSchema).query(async ({ ctx, input }): Promise<{ status: string; data: GetMenuResponse[] }> => {
        try {
            const response = await api.get(appendQueryParams("cooks/accounts/menu-lists", input), {
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
    getSingleMenu: protectedProcedure.input(z.string().min(1, "Menu ID is required")).query(async ({ ctx, input }): Promise<{ status: string; data: GetSingleMenuResponse }> => {
        try {
            const response = await api.get(`cooks/accounts/menu-lists/${input}`, {
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
    createMenu: protectedProcedure.input(createMenuFormSchema).mutation(async ({ ctx, input }): Promise<{ status: string; data: CreateMenuResponse }> => {
        try {
            const response = await api.post("cooks/accounts/menu-lists", input, {
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
    deleteMenu: protectedProcedure.input(z.string().min(1, "Schedule ID is required")).mutation(async ({ ctx, input }): Promise<{ status: string; data: CreateMenuResponse }> => {
        try {
            const response = await api.delete(`cooks/accounts/menu-lists/${input}`, {
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