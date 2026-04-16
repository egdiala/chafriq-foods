import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { type TRPCQueryKeyWithoutPrefix } from "@trpc/tanstack-react-query";
import { GetVendorOrdersFormType } from "@/validations/vendor-order";
import { type GetCustomerOrdersFormType } from "@/validations/customer-order";
import { useUser } from "@/context/use-user";

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

export const useGetCart = (config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    const { type } = useUser()
    return useQuery({
        ...trpc.orders.customer.getCart.queryOptions(),
        enabled: !!type,
        ...config,
    });
}

export const useGetCustomerOrders = (params: GetCustomerOrdersFormType, config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    return useQuery({
        ...trpc.orders.customer.getOrders.queryOptions(params),
        ...config,
    });
}

export const useGetCustomerOrder = (id: string, config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    return useQuery({
        ...trpc.orders.customer.getOrder.queryOptions(id),
        enabled: !!id,
        ...config,
    });
}