import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { GetMenuListType } from "@/validations/menu";
import { type TRPCQueryKeyWithoutPrefix } from "@trpc/tanstack-react-query";

export const useGetMenuList = (params: GetMenuListType, config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    return useQuery({
        ...trpc.menu.getMenuList.queryOptions(params),
        ...config,
    });
}

export const useGetSingleMenu = (id: string, config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    return useQuery({
        ...trpc.menu.getSingleMenu.queryOptions(id),
        enabled: !!id,
        ...config,
    });
}