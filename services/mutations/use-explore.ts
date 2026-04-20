import { toast } from 'sonner';
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";

export const useContactUs = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    return useMutation(
        trpc.explore.contactUs.mutationOptions({
            onSuccess: async (data) => {
                fn?.(data);
                toast.success("Message sent successfully")
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong");
            },
        })
    );
}