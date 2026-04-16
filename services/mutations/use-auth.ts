import { useTRPC } from "@/trpc/client";
import { toast } from 'sonner';
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/context/use-user-auth";

export const useRegisterVendor = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    return useMutation(
        trpc.auth.vendor.register.mutationOptions({
            onSuccess: (data) => {
                if (data.status === "ok") {
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
    return useMutation(
        trpc.auth.vendor.login.mutationOptions({
            onSuccess: (data) => {
                if (data.status === "ok") {
                    handleLogin(data.data, "vendor")
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
    const { handleLogin } = useAuth()
    return useMutation(
        trpc.auth.vendor.confirmOtp.mutationOptions({
            onSuccess: (data) => {
                if (data.status === "ok") {
                    fn?.(data);
                    handleLogin(data.data, "vendor")
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

export const useRegisterCustomer = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    return useMutation(
        trpc.auth.customer.register.mutationOptions({
            onSuccess: (data) => {
                if (data.status) {
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

export const useLoginCustomer = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    const { handleLogin } = useAuth()
    const { clearAll } = useUserAuth()
    return useMutation(
        trpc.auth.customer.login.mutationOptions({
            onSuccess: (data) => {
                clearAll()
                if (data.status === "ok") {
                    handleLogin(data.data, "customer")
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

export const useForgotPasswordCustomer = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    return useMutation(
        trpc.auth.customer.forgotPassword.mutationOptions({
            onSuccess: (data) => {
                if (data.status === "ok") {
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

export const useConfirmOtpCustomer = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    return useMutation(
        trpc.auth.customer.confirmOtp.mutationOptions({
            onSuccess: (data) => {
                fn?.(data);
                toast.success("Otp confirmed");
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong");
            },
        })
    );
}

export const useResetPasswordCustomer = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    const router = useRouter()
    return useMutation(
        trpc.auth.customer.resetPassword.mutationOptions({
            onSuccess: (data) => {
                if (data.status === "ok") {
                    fn?.(data);
                    router.push("/customer/login")
                    toast.success("Password reset successfully")
                }
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong");
            },
        })
    );
}

export const useResendOtpCustomer = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    return useMutation(
        trpc.auth.customer.resendOtp.mutationOptions({
            onSuccess: (data) => {
                fn?.(data);
                toast.success("Otp sent successfully")
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong");
            },
        })
    );
}