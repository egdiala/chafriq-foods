import { useTRPC } from "@/trpc/client";
import { toast } from 'sonner';
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateMenu = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient()
    return useMutation(
        trpc.menu.createMenu.mutationOptions({
            onSuccess: async (data) => {
                await queryClient.invalidateQueries({ queryKey: trpc.menu.getMenuList.queryKey() })
                fn?.(data);
                toast.success("Cuisine added successfully")
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong");
            },
        })
    );
}