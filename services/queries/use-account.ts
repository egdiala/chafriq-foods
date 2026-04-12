import { useUser } from "@/context/use-user";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { type TRPCQueryKeyWithoutPrefix } from "@trpc/tanstack-react-query";
import { useEffect } from "react";

export const useVendorProfile = (config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    const { updateType, updateUser } = useUser();
    
    const { data, ...res } = useQuery({
        ...trpc.account.vendor.getProfile.queryOptions(),
        ...config,
    });

    useEffect(() => {
        if (data?.status === "ok") {
            updateUser(data.data);
            updateType("vendor");
        }
    }, [data, updateUser, updateType]);

    return { data, ...res }
}

export const useGetVendorDocument = (documentType: VendorDocumentType, config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    return useQuery({
        ...trpc.account.vendor.getDocument.queryOptions(documentType),
        enabled: !!documentType,
        ...config,
    });
}

export const useCustomerProfile = (config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    const { updateType, updateUser } = useUser();
    
    const { data, ...res } = useQuery({
        ...trpc.account.customer.getProfile.queryOptions(),
        ...config,
    });

    useEffect(() => {
        if (data?.status === "ok") {
            updateUser(data.data);
            updateType("customer");
        }
    }, [data, updateUser, updateType]);

    return { data, ...res }
}