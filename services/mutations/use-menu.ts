import { useTRPC } from "@/trpc/client";
import { toast } from 'sonner';
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateMenu = (fn?: (value: CreateMenuResponse) => void) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient()
    return useMutation(
        trpc.menu.createMenu.mutationOptions({
            onSuccess: async (data) => {
                await queryClient.invalidateQueries({ queryKey: trpc.menu.getMenuList.queryKey() })
                fn?.(data.data);
                toast.success("Meal added successfully")
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong");
            },
        })
    );
}

export const useEditMenu = (fn?: (value: CreateMenuResponse) => void) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient()
    return useMutation(
        trpc.menu.editMenu.mutationOptions({
            onSuccess: async (data) => {
                await queryClient.invalidateQueries({ queryKey: trpc.menu.getMenuList.queryKey() })
                fn?.(data.data);
                toast.success("Meal edited successfully")
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong");
            },
        })
    );
}

export const useUploadMenuMedia = (fn?: (value: unknown) => void) => {
    return useMutation({
        mutationFn: async (payload: { formData: FormData; menuId: string; }) => {
            const res = await fetch(`/api/vendor/upload-menu-files/${payload.menuId}`, {
                method: "PUT",
                body: payload.formData,
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error?.error || "Upload failed");
            }

            return res.json();
        },
        onSuccess: async (data) => {
            fn?.(data);
            toast.success("Files uploaded successfully");
        },
        onError: (error) => {
            toast.error(error.message || "Something went wrong");
        },
    });
}

export const useDeleteMenu = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient()
    return useMutation(
        trpc.menu.deleteMenu.mutationOptions({
            onSuccess: async (data) => {
                await queryClient.invalidateQueries({ queryKey: trpc.menu.getMenuList.queryKey() })
                fn?.(data.data);
                toast.success("Meal deleted successfully")
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong");
            },
        })
    );
}

export const useDeleteMediaFile = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient()
    return useMutation(
        trpc.menu.deleteMediaFile.mutationOptions({
            onSuccess: async (data) => {
                await queryClient.invalidateQueries({ queryKey: trpc.menu.getSingleMenu.queryKey() })
                fn?.(data);
                toast.success("File deleted successfully")
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong");
            },
        })
    );
}