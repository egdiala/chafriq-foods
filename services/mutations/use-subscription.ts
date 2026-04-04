import { useTRPC } from "@/trpc/client";
import { toast } from 'sonner';
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useInitSubscription = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    return useMutation(
        trpc.subscription.initSubscription.mutationOptions({
            onSuccess: async (data) => {
                fn?.(data);
                toast.success("Subscription initiated successfully")
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong");
            },
        })
    );
}

export const useCompleteSubscription = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient()
    return useMutation(
        trpc.subscription.completeSubscription.mutationOptions({
            onSuccess: async (data) => {
                await queryClient.invalidateQueries({ queryKey: trpc.account.vendor.getProfile.queryKey() })
                await queryClient.invalidateQueries({ queryKey: trpc.subscription.getSubscription.queryKey() })
                fn?.(data);
                toast.success("Subscription completed successfully")
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong");
            },
        })
    );
}