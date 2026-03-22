import * as z from "zod";

export const searchLocationsFormSchema = z.object({
    q: z.string().min(1, "Search parameter is required"),
    country: z.string().length(3, "County ISO is required").optional(),
})