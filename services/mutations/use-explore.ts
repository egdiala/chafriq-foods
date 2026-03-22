import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSearchLocations = (fn?: (value: unknown) => void) => {
    const trpc = useTRPC();
    return useMutation(
        trpc.explore.searchLocations.mutationOptions({
            onSuccess: (data) => {
                if (data) {
                    fn?.(data);
                    toast.success("Search complete")
                }
            },
            onError: (error) => {
                toast.error(error.message || "Something went wrong");
            },
        })
    );
}