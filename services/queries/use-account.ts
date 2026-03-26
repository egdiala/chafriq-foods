import { useUser } from "@/context/use-user";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { type TRPCQueryKeyWithoutPrefix } from "@trpc/tanstack-react-query";

export const useVendorProfile = (config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    const { updateType, updateUser } = useUser();
    
    const { data, ...res } = useQuery({
        ...trpc.account.vendor.getProfile.queryOptions(),
        ...config,
    });

    if (data?.status === "ok") {
        updateUser(data.data)
        updateType("vendor")
    }

    return { data, ...res }
}