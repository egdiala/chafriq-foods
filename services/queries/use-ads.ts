import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { type TRPCQueryKeyWithoutPrefix } from "@trpc/tanstack-react-query";

export const useVendorAds = (platform: "web" | "mobile", config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    return useQuery({
        ...trpc.ads.vendor.getAds.queryOptions(platform),
        ...config,
    });
}

export const useCustomerAds = (platform: "web" | "mobile", config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    return useQuery({
        ...trpc.ads.customer.getAds.queryOptions(platform),
        ...config,
    });
}