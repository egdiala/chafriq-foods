import { useTRPC } from "@/trpc/client";
import { CustomerNotificationsQuery } from "@/validations/customer-notifications";
import { useQuery } from "@tanstack/react-query";
import { type TRPCQueryKeyWithoutPrefix } from "@trpc/tanstack-react-query";

export const useGetVendorNotifications = (params: CustomerNotificationsQuery, config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    return useQuery({
        ...trpc.notifications.vendor.getNotifications.queryOptions(params),
        ...config,
    });
}

export const useGetCustomerNotifications = (params: CustomerNotificationsQuery, config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    return useQuery({
        ...trpc.notifications.customer.getNotifications.queryOptions(params),
        ...config,
    });
}