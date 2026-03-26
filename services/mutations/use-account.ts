import { useTRPC } from "@/trpc/client";
import { toast } from 'sonner';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/trpc/helper";

export const useUpdateVendorProfile = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient()
    return useMutation(
        trpc.account.vendor.updateProfile.mutationOptions({
            onSuccess: async (data) => {
                await queryClient.invalidateQueries({ queryKey: trpc.account.vendor.getProfile.queryKey() })
                fn?.(data);
                toast.success("Account updated successfully")
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong");
            },
        })
    );
}

export const useUploadVendorAvatar = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/vendor/upload-avatar", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error?.message || "Upload failed");
            }

            return res.json();
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: trpc.account.vendor.getProfile.queryKey() })
            fn?.(data);
            toast.success("Avatar updated successfully")
        },
        onError: (error) => {
            toast.error(error.message || "Something went wrong");
        },
    });
}

export const useUploadBusinessLogo = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/vendor/upload-business-logo", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error?.message || "Upload failed");
            }

            return res.json();
        },
        onSuccess: async (data) => {
            await queryClient.invalidateQueries({ queryKey: trpc.account.vendor.getProfile.queryKey() })
            fn?.(data);
            toast.success("Business logo updated successfully")
        },
        onError: (error) => {
            toast.error(error.message || "Something went wrong");
        },
    });
}

export const useChangeVendorPassword = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    const { handleLogout } = useAuth()
    return useMutation(
        trpc.account.vendor.changePassword.mutationOptions({
            onSuccess: async (data) => {
                fn?.(data);
                toast.success("Password updated successfully")
                handleLogout("/vendor/login")
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong");
            },
        })
    );
}

export const useDeleteVendorProfile = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    const { handleLogout } = useAuth()
    return useMutation(
        trpc.account.vendor.deleteProfile.mutationOptions({
            onSuccess: async (data) => {
                fn?.(data);
                toast.success("Account deleted successfully")
                handleLogout("/vendor/login")
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong");
            },
        })
    );
}