import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { type TRPCQueryKeyWithoutPrefix } from "@trpc/tanstack-react-query";

export const useGetAvailability = (queryOpts?: GetSchedulesQuery, config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    return useQuery({
        ...trpc.schedules.getAvailability.queryOptions(queryOpts || {}),
        ...config,
    });
}