import { useTRPC } from "@/trpc/client";
import { SearchLocationsFormType } from "@/validations/explore";
import { useQuery } from "@tanstack/react-query";
import { type TRPCQueryKeyWithoutPrefix } from "@trpc/tanstack-react-query";

export const useCountryList = (config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    return useQuery({
        ...trpc.explore.getCountries.queryOptions(),
        ...config,
    });
}

export const useDishList = (config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    return useQuery({
        ...trpc.explore.getDishList.queryOptions(),
        ...config,
    });
}

export const useSearchLocations = (params: SearchLocationsFormType, config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    return useQuery({
        ...trpc.explore.searchLocations.queryOptions(params),
        enabled: !!params.q,
        ...config,
    });
}