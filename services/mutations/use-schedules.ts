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

export const useUpdateAvailability = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient()
    return useMutation(
        trpc.schedules.updateAvailability.mutationOptions({
            onSuccess: async (data) => {
                await queryClient.invalidateQueries({ queryKey: trpc.schedules.getAvailability.queryKey() })
                fn?.(data);
                toast.success("Schedule updated successfully")
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong");
            },
        })
    );
}

export const useToggleAvailabilityStatus = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient()
    return useMutation(
        trpc.schedules.toggleAvailabilityStatus.mutationOptions({
            onSuccess: async (data) => {
                await queryClient.invalidateQueries({ queryKey: trpc.schedules.getAvailability.queryKey() })
                fn?.(data);
                toast.success("Status updated successfully")
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong");
            },
        })
    );
}

export const useDeleteAvailability = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient()
    return useMutation(
        trpc.schedules.deleteAvailability.mutationOptions({
            onSuccess: async (data) => {
                await queryClient.invalidateQueries({ queryKey: trpc.schedules.getAvailability.queryKey() })
                fn?.(data);
                toast.success("Schedule deleted successfully")
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong");
            },
        })
    );
}