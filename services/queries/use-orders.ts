import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { type TRPCQueryKeyWithoutPrefix } from "@trpc/tanstack-react-query";
import { GetVendorOrdersFormType } from "@/validations/vendor-order";

export const useGetOrders = (params: GetVendorOrdersFormType, config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    return useQuery({
        ...trpc.orders.vendor.getOrders.queryOptions(params),
        ...config,
    });
}

export const useGetOrder = (id: string, config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    return useQuery({
        ...trpc.orders.vendor.getOrder.queryOptions(id),
        enabled: !!id,
        ...config,
    });
}