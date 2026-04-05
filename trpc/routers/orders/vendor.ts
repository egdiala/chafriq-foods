import z from "zod";
import { TRPCError } from "@trpc/server";
import { appendQueryParams } from "@/lib/utils";
import { api, handleErrorMessage } from "@/trpc/helper";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { getVendorOrdersFormSchema, updateVendorOrderStatusSchema } from "@/validations/vendor-order";

type GeneralOrderRes = GetOrderStatusCountResponse | GetVendorOrderResponse[]

export const vendorOrdersRouter = createTRPCRouter({
    getOrders: protectedProcedure.input(getVendorOrdersFormSchema).query(async ({ ctx, input }): Promise<{ status: string; data: GeneralOrderRes }> => {
        try {
            const response = await api.get(appendQueryParams("cooks/accounts/order-lists", input), {
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
    getOrder: protectedProcedure.input(z.string().min(1, "Order ID is required")).query(async ({ ctx, input }): Promise<{ status: string; data: GetSingleVendorOrderResponse }> => {
        try {
            const response = await api.get(`cooks/accounts/order-lists/${input}`, {
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
    updateOrderStatus: protectedProcedure.input(updateVendorOrderStatusSchema).mutation(async ({ ctx, input }): Promise<{ status: string; data: VendorProfileResponse }> => {
        try {
            const { order_id, ...payload } = input;
            const response = await api.put(`cooks/accounts/order-lists/${order_id}`, payload, {
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
    })
});