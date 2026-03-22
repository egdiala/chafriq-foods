import { api, handleErrorMessage } from "@/trpc/helper";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { searchLocationsFormSchema } from "@/validations/explore";
import { TRPCError } from "@trpc/server";

export const exploreRouter = createTRPCRouter({
    searchLocations: baseProcedure.input(searchLocationsFormSchema).mutation(async ({ input }): Promise<{ status: string; data: SearchLocationsResponse[] }> => {
        try {
            const response = await api.post("customers/requests/search-locations", input);
            return response.data;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: handleErrorMessage(error),
            });
        }
    }),
    getCountries: baseProcedure.query(async (): Promise<{ status: string; data: GetCountriesResponse[] }> => {
        try {
            const response = await api.get("customers/requests/country-lists");
            return response.data;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: handleErrorMessage(error),
            });
        }
    }),
    getDishList: baseProcedure.query(async (): Promise<{ status: string; data: SearchLocationsResponse[] }> => {
        try {
            const response = await api.get("customers/requests/dish-lists");
            return response.data;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: handleErrorMessage(error),
            });
        }
    }),
});
