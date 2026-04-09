import { useTRPC } from "@/trpc/client";
import { ExploreCooksType, ExploreCookType, ExploreMealType, GetRatingsType, SearchLocationsFormType } from "@/validations/explore";
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

export const useGetAllergies = (config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    return useQuery({
        ...trpc.explore.getAllergies.queryOptions(),
        ...config,
    });
}

export const useGetCooks = (params: ExploreCooksType, config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    return useQuery({
        ...trpc.explore.getCooks.queryOptions(params),
        ...config,
    });
}

export const useGetCook = (params: ExploreCookType, config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    return useQuery({
        ...trpc.explore.getCook.queryOptions(params),
        enabled: !!params.cook_id,
        ...config,
    });
}

export const useGetMeals = (params: ExploreCooksType, config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    return useQuery({
        ...trpc.explore.getMeals.queryOptions(params),
        ...config,
    });
}

export const useGetMeal = (params: ExploreMealType, config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    return useQuery({
        ...trpc.explore.getMeal.queryOptions(params),
        enabled: !!params.meal_id,
        ...config,
    });
}

export const useGetRatings = (params: GetRatingsType, config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    return useQuery({
        ...trpc.explore.getRatings.queryOptions(params),
        ...config,
    });
}