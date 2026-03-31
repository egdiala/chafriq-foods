import { TRPCError } from "@trpc/server";
import { api, handleErrorMessage } from "@/trpc/helper";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { registerCustomerFormSchema } from "@/validations/customer-auth";
import { confirmOtpVendorFormSchema, loginVendorFormSchema, resendOtpVendorFormSchema } from "@/validations/vendor-auth";
import { ConfirmOtpType } from "./vendor";

export const customerAuthRouter = createTRPCRouter({
    register: baseProcedure.input(registerCustomerFormSchema).mutation(async ({ input }): Promise<{ status: string; }> => {
        try {
            const { terms, ...payload } = input
            const response = await api.post("customers/auths/register", payload);
            return response.data;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: handleErrorMessage(error),
            });
        }
    }),
    login: baseProcedure.input(loginVendorFormSchema).mutation(async ({ input }): Promise<{ status: string; data: VendorLoginResponse; }> => {
        try {
            const { rememberMe: _rememberMe, ...payload } = input
            const response = await api.post("customers/auths/login", payload);
            return response.data;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: handleErrorMessage(error),
            });
        }
    }),
    confirmOtp: baseProcedure.input(confirmOtpVendorFormSchema).mutation(async ({ input }): Promise<{ status: string; data: ConfirmOtpType; }> => {
        try {
            const response = await api.post("customers/auths/confirm-otp", input);
            return response.data;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: handleErrorMessage(error),
            });
        }
    }),
    resendOtp: baseProcedure.input(resendOtpVendorFormSchema).mutation(async ({ input }): Promise<{ status: string; }> => {
        try {
            const response = await api.post("customers/auths/resend-otp", input);
            return response.data;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: handleErrorMessage(error),
            });
        }
    }),
})