import z from "zod";
import { TRPCError } from "@trpc/server";
import { appendQueryParams } from "@/lib/utils";
import { api, handleErrorMessage } from "@/trpc/helper";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { updateVendorOrderStatusSchema } from "@/validations/vendor-order";
import { addToCartFormSchema, getCustomerOrdersFormSchema, pickupDetailsFormSchema } from "@/validations/customer-order";

type GeneralOrderRes = GetOrderStatusCountResponse | GetCustomerOrderResponse[]

export const customerOrdersRouter = createTRPCRouter({
    getOrders: protectedProcedure.input(getCustomerOrdersFormSchema).query(async ({ ctx, input }): Promise<{ status: string; data: GeneralOrderRes }> => {
        try {
            const response = await api.get(appendQueryParams("customers/accounts/order-lists", input), {
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
            const response = await api.get(`customers/accounts/order-lists/${input}`, {
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
    rateOrder: protectedProcedure.input(updateVendorOrderStatusSchema).mutation(async ({ ctx, input }): Promise<{ status: string; data: VendorProfileResponse }> => {
        try {
            const { order_id, ...payload } = input;
            const response = await api.post(`customers/accounts/order-ratings/${order_id}`, payload, {
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
    disputeOrder: protectedProcedure.input(updateVendorOrderStatusSchema).mutation(async ({ ctx, input }): Promise<{ status: string; data: VendorProfileResponse }> => {
        try {
            const response = await api.post("customers/accounts/order-lists", input, {
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
    addToCart: protectedProcedure.input(addToCartFormSchema).mutation(async ({ ctx, input }): Promise<{ status: string; data: VendorProfileResponse }> => {
        try {
            const response = await api.post("customers/accounts/cart-lists", input, {
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
    getCart: protectedProcedure.query(async ({ ctx }): Promise<{ status: string; data: GetCartResponse }> => {
        try {
            const response = await api.get("customers/accounts/cart-lists", {
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
    proceedToCheckout: protectedProcedure.input(pickupDetailsFormSchema).mutation(async ({ ctx, input }): Promise<{ status: string; data: CheckoutResponse }> => {
        try {
            const response = await api.post("customers/accounts/cart-checkouts", input, {
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
    confirmPayment: protectedProcedure.input(z.string().min(1, "Transaction ID is required")).mutation(async ({ ctx, input }): Promise<{ status: string; data: CheckoutResponse }> => {
        try {
            const response = await api.put(`customers/accounts/cart-checkouts/${input}`, {}, {
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