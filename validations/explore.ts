import * as z from "zod";

export const searchLocationsFormSchema = z.object({
    q: z.string().min(1, "Search parameter is required"),
    country: z.string().length(2, "County ISO is required").optional(),
})

export type SearchLocationsFormType = z.infer<typeof searchLocationsFormSchema>;