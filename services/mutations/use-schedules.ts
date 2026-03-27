import { useTRPC } from "@/trpc/client";
import { toast } from 'sonner';
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateAvailability = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient()
    return useMutation(
        trpc.schedules.createAvailability.mutationOptions({
            onSuccess: async (data) => {
                await queryClient.invalidateQueries({ queryKey: trpc.schedules.getAvailability.queryKey() })
                fn?.(data);
                toast.success("Availability created successfully")
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong");
            },
        })
    );
}