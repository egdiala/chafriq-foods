import * as z from "zod";

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const getSubscriptionFormSchema = z.object({
    request_type: z.enum(["1", "2"]),

    start_date: z
      .string()
      .regex(dateRegex, "Invalid start_date format (YYYY-MM-DD)")
      .optional(),

    end_date: z
      .string()
      .regex(dateRegex, "Invalid end_date format (YYYY-MM-DD)")
      .optional(),

    timezone: z
      .string()
      .min(1, "timezone is required")
      .refine(
        (tz) => Intl.supportedValuesOf("timeZone").includes(tz),
        "Invalid IANA timezone"
      ),

    page: z
      .string()
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, "page must be a positive number")
      .optional(),

    item_per_page: z
      .string()
      .refine(
        (val) => !isNaN(Number(val)) && Number(val) > 0,
        "item_per_page must be a positive number"
      )
      .optional(),

    component: z.enum(["count"]).optional(),
  })
  .superRefine((data, ctx) => {
    // Optional: ensure start_date <= end_date if both provided
    if (data.start_date && data.end_date) {
      const start = new Date(data.start_date);
      const end = new Date(data.end_date);

      if (start > end) {
        ctx.addIssue({
          code: "custom",
          message: "start_date cannot be after end_date",
          path: ["start_date"],
        });
      }
    }
  });

export type GetSubscriptionFormType = z.infer<typeof getSubscriptionFormSchema>;