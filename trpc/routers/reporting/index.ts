import { TRPCError } from "@trpc/server";
import { appendQueryParams } from "@/lib/utils";
import { api, handleErrorMessage } from "@/trpc/helper";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { getVendorReportsSchema } from "@/validations/reporting";

type ReportsRes = ReportsStatisticsResponse;

export const reportsRouter = createTRPCRouter({
    getReports: protectedProcedure.input(getVendorReportsSchema).query(async ({ ctx, input }): Promise<{ status: string; data: ReportsRes }> => {
        try {
            const response = await api.get(appendQueryParams("cooks/accounts/reports", input), {
                headers: {
                    "Authorization": `Bearer ${ctx.accessToken}`
                }
            });
            return response.data;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: handleErrorMessage(error),
            });
        }
    }),
});