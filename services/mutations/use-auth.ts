import { useTRPC } from "@/trpc/client";
import { toast } from 'sonner';
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { useUser } from "@/context/use-user";

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
    const { handleLogin } = useAuth()
    const { updateType, updateUser } = useUser()
    return useMutation(
        trpc.auth.vendor.login.mutationOptions({
            onSuccess: (data) => {
                if (data.status === "ok") {
                    handleLogin(data.data)
                    fn?.(data);
                    updateType("vendor")
                    updateUser(data.data)
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
                if (data.status === "ok") {
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

export const useResendOtpVendor = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    return useMutation(
        trpc.auth.vendor.resendOtp.mutationOptions({
            onSuccess: (data) => {
                if (data.id) {
                    fn?.(data);
                    toast.success("Otp sent successfully")
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