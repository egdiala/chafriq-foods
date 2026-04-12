import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { type TRPCQueryKeyWithoutPrefix } from "@trpc/tanstack-react-query";

export const useGetVendorNotifications = (config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    return useQuery({
        ...trpc.notifications.vendor.getNotifications.queryOptions(),
        ...config,
    });
}

export const useGetCustomerNotifications = (config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    return useQuery({
        ...trpc.notifications.customer.getNotifications.queryOptions(),
        ...config,
    });
}