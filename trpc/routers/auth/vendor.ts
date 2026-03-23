import { TRPCError } from "@trpc/server";

import { api, handleErrorMessage } from "@/trpc/helper";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { confirmOtpVendorFormSchema, forgotPasswordVendorFormSchema, loginVendorFormSchema, registerVendorFormSchema, resetPasswordVendorFormSchema } from "@/validations/vendor-auth";

type RegisterApiResponse = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  is_verified: boolean;
  created_at: Date | string;
}

export const vendorAuthRouter = createTRPCRouter({
    register: baseProcedure.input(registerVendorFormSchema).mutation(async ({ input }): Promise<RegisterApiResponse> => {
        try {
            const { terms, is_home_address, ...payload } = input
            const response = await api.post("cooks/auths/register", payload);
            return response.data;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: handleErrorMessage(error),
            });
        }
    }),
    login: baseProcedure.input(loginVendorFormSchema).mutation(async ({ input }): Promise<RegisterApiResponse> => {
        try {
            const { rememberMe: _rememberMe, ...payload } = input
            const response = await api.post("cooks/auths/login", payload);
            return response.data;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: handleErrorMessage(error),
            });
        }
    }),
    forgotPassword: baseProcedure.input(forgotPasswordVendorFormSchema).mutation(async ({ input }): Promise<RegisterApiResponse> => {
        try {
            const response = await api.post("cooks/auths/forgot-password", input);
            return response.data;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: handleErrorMessage(error),
            });
        }
    }),
    confirmOtp: baseProcedure.input(confirmOtpVendorFormSchema).mutation(async ({ input }): Promise<RegisterApiResponse> => {
        try {
            const response = await api.post("cooks/auths/confirm-otp", input);
            return response.data;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: handleErrorMessage(error),
            });
        }
    }),
    resetPassword: baseProcedure.input(resetPasswordVendorFormSchema).mutation(async ({ input }): Promise<RegisterApiResponse> => {
        try {
            const { confirm_new_password: _confirmNewPassword, ...payload } = input
            const response = await api.post("cooks/auths/reset-password", payload);
            return response.data;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: handleErrorMessage(error),
            });
        }
    }),
});
