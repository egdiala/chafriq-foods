import { useTRPC } from "@/trpc/client";
import { toast } from 'sonner';
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateVendorOrderStatus = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient()
    return useMutation(
        trpc.orders.vendor.updateOrderStatus.mutationOptions({
            onSuccess: async (data) => {
                await queryClient.invalidateQueries({ queryKey: trpc.orders.vendor.getOrders.queryKey() })
                await queryClient.invalidateQueries({ queryKey: trpc.orders.vendor.getOrder.queryKey() })
                fn?.(data.data);
                toast.success("Order status updated successfully")
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong");
            },
        })
    );
}