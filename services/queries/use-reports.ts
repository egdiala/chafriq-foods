import { useTRPC } from "@/trpc/client";
import { GetVendorReportsType } from "@/validations/reporting";
import { useQuery } from "@tanstack/react-query";
import { type TRPCQueryKeyWithoutPrefix } from "@trpc/tanstack-react-query";

export const useReports = (queryOpts: GetVendorReportsType, config?: TRPCQueryKeyWithoutPrefix) => {
    const trpc = useTRPC();
    return useQuery({
        ...trpc.reports.getReports.queryOptions(queryOpts),
        ...config,
    });
}