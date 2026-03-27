import { TRPCError } from "@trpc/server";
import { api, handleErrorMessage } from "@/trpc/helper";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import z from "zod";
import { appendQueryParams } from "@/lib/utils";
import { createAvailabilityFormSchema } from "@/validations/schedule";

export const schedulesRouter = createTRPCRouter({
    /*
    * 1 = permanent, 2 = temporary
    */
    getAvailability: protectedProcedure.input(z.object({ avail_type: z.enum(["1", "2"]).optional() })).query(async ({ ctx, input }): Promise<{ status: string; data: GetSchedulesResponse[] }> => {
        try {
            const response = await api.get(appendQueryParams("cooks/accounts/schedules", input), {
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
    createAvailability: protectedProcedure.input(createAvailabilityFormSchema).mutation(async ({ ctx, input }): Promise<{ status: string; }> => {
        try {
            const response = await api.post("cooks/accounts/schedules", input, {
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