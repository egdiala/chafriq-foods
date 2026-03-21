import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { type TRPCQueryKeyWithoutPrefix } from "@trpc/tanstack-react-query";

export const useGetMe = (config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    // return useQuery({
    //     ...trpc.auth.getMe.queryOptions(),
    //     ...config,
    // });
}