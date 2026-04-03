import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { type TRPCQueryKeyWithoutPrefix } from "@trpc/tanstack-react-query";
import { GetSubscriptionFormType } from "@/validations/subscription";

export const useGetSubscription = (params: GetSubscriptionFormType, config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    return useQuery({
        ...trpc.subscription.getSubscription.queryOptions(params),
        ...config,
    });
}