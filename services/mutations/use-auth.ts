import { useTRPC } from "@/trpc/client";
import { toast } from 'sonner';
import { useMutation } from "@tanstack/react-query";

export const useRegisterVendor = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    return useMutation(
        trpc.auth.vendor.register.mutationOptions({
            onSuccess: (data) => {
                if (data.id) {
                    fn?.(data);
                    toast.success("Account created")
                }
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong");
            },
        })
    );
}

export const useLoginVendor = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    return useMutation(
        trpc.auth.vendor.login.mutationOptions({
            onSuccess: (data) => {
                if (data.id) {
                    fn?.(data);
                    toast.success("Login successful")
                }
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong");
            },
        })
    );
}

export const useForgotPasswordVendor = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    return useMutation(
        trpc.auth.vendor.forgotPassword.mutationOptions({
            onSuccess: (data) => {
                if (data.id) {
                    fn?.(data);
                    toast.success("Check your email")
                }
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong");
            },
        })
    );
}

export const useConfirmOtpVendor = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    return useMutation(
        trpc.auth.vendor.confirmOtp.mutationOptions({
            onSuccess: (data) => {
                if (data.id) {
                    fn?.(data);
                    toast.success("Otp confirmed")
                }
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong");
            },
        })
    );
}

export const useResetPasswordVendor = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    return useMutation(
        trpc.auth.vendor.resetPassword.mutationOptions({
            onSuccess: (data) => {
                if (data.id) {
                    fn?.(data);
                    toast.success("Password reset successfully")
                }
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong");
            },
        })
    );
}