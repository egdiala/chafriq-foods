import * as z from "zod";

export const searchLocationsFormSchema = z.object({
    q: z.string().min(1, "Search parameter is required"),
    country: z.string().length(2, "County ISO is required").optional(),
})

export type SearchLocationsFormType = z.infer<typeof searchLocationsFormSchema>;

export const exploreCooksSchema = z.object({
    latitude: z.string().optional(),
    longitude: z.string().optional(),

    order_date: z.string().optional(),

    timezone: z.string().optional(),

    dish_type_id: z.string().optional(),
    q: z.string().optional(),

    req_type: z.enum(["1", "2"]).optional(),

    item_per_page: z
      .string()
      .refine((val) => !isNaN(Number(val)), "item_per_page must be a number")
      .refine((val) => Number(val) > 0, "item_per_page must be greater than 0")
      .refine((val) => Number(val) <= 200, "item_per_page max is 200")
      .optional(),
  })
  .superRefine((data, ctx) => {
    // latitude ↔ longitude dependency
    if (data.latitude && !data.longitude) {
      ctx.addIssue({
        code: "custom",
        message: "longitude is required when latitude is provided",
        path: ["longitude"],
      });
    }

    if (data.longitude && !data.latitude) {
      ctx.addIssue({
        code: "custom",
        message: "latitude is required when longitude is provided",
        path: ["latitude"],
      });
    }

    // order_date → timezone dependency
    if (data.order_date && !data.timezone) {
      ctx.addIssue({
        code: "custom",
        message: "timezone is required when order_date is provided",
        path: ["timezone"],
      });
      }
  });

export type ExploreCooksType = z.infer<typeof exploreCooksSchema>;

export const exploreCookSchema = z.object({
    latitude: z.string().optional(),
    longitude: z.string().optional(),
    cook_id: z.string().optional(),
    timezone: z.string().optional(),
})

export type ExploreCookType = z.infer<typeof exploreCookSchema>;

export const exploreMealSchema = z.object({
    latitude: z.string().optional(),
    longitude: z.string().optional(),
    meal_id: z.string().optional(),
    timezone: z.string().optional(),
})

export type ExploreMealType = z.infer<typeof exploreMealSchema>;

export const getRatingsSchema = z.object({
    cook_id: z.string().optional(),
    menu_id: z.string().optional(),
    page: z.string().optional(),
    item_per_page: z.string().optional(),
    component: z.enum(["count"]).optional()
})

export type GetRatingsType = z.infer<typeof getRatingsSchema>;