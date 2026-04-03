import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { type TRPCQueryKeyWithoutPrefix } from "@trpc/tanstack-react-query";

export const useVendorAds = (config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    return useQuery({
        ...trpc.ads.vendor.getAds.queryOptions("web"),
        ...config,
    });
}

export const useCustomerAds = (config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    return useQuery({
        ...trpc.ads.customer.getAds.queryOptions("web"),
        ...config,
    });
}