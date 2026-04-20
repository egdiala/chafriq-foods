import { appendQueryParams } from "@/lib/utils";
import { api, handleErrorMessage } from "@/trpc/helper";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { contactUsFormSchema, exploreCookSchema, exploreCooksSchema, exploreMealSchema, getRatingsSchema, searchLocationsFormSchema } from "@/validations/explore";
import { TRPCError } from "@trpc/server";

export const exploreRouter = createTRPCRouter({
    searchLocations: baseProcedure.input(searchLocationsFormSchema).query(async ({ input }): Promise<{ status: string; data: SearchLocationsResponse[] }> => {
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
    getDishList: baseProcedure.query(async (): Promise<{ status: string; data: DishListResponse[] }> => {
        try {
            const response = await api.post("customers/requests/dish-lists");
            return response.data;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: handleErrorMessage(error),
            });
        }
    }),
    getAllergies: baseProcedure.query(async (): Promise<{ status: string; data: AllergiesResponse[] }> => {
        try {
            const response = await api.post("customers/requests/allergies");
            return response.data;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: handleErrorMessage(error),
            });
        }
    }),
    getCooks: baseProcedure.input(exploreCooksSchema).query(async ({ input }): Promise<{ status: string; data: GetCooksResponse[] }> => {
        try {
            const response = await api.post("customers/requests/available-cooks", input);
            return response.data;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: handleErrorMessage(error),
            });
        }
    }),
    getCook: baseProcedure.input(exploreCookSchema).query(async ({ input }): Promise<{ status: string; data: GetCookResponse }> => {
        try {
            const { cook_id, ...rest } = input
            const response = await api.get(appendQueryParams(`customers/requests/available-cooks/${cook_id}`, rest));
            return response.data;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: handleErrorMessage(error),
            });
        }
    }),
    getMeals: baseProcedure.input(exploreCooksSchema).query(async ({ input }): Promise<{ status: string; data: GetMealsResponse[] }> => {
        try {
            const response = await api.post("customers/requests/available-meals", input);
            return response.data;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: handleErrorMessage(error),
            });
        }
    }),
    getMeal: baseProcedure.input(exploreMealSchema).query(async ({ input }): Promise<{ status: string; data: GetMealResponse }> => {
        try {
            const { meal_id, ...rest } = input
            const response = await api.get(appendQueryParams(`customers/requests/available-meals/${meal_id}`, rest));
            return response.data;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: handleErrorMessage(error),
            });
        }
    }),
    getRatings: baseProcedure.input(getRatingsSchema).query(async ({ input }): Promise<{ status: string; data: GetRatingResponse[] }> => {
        try {
            const response = await api.post("customers/requests/rating-lists", input);
            return response.data;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: handleErrorMessage(error),
            });
        }
    }),
    contactUs: baseProcedure.input(contactUsFormSchema).mutation(async ({ input }): Promise<{ status: string }> => {
        try {
            const response = await api.post("customers/requests/contact-us", input);
            return response.data;
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: handleErrorMessage(error),
            });
        }
    }),
});
