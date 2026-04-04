import * as z from "zod";

const currentYear = new Date().getFullYear();

export const getVendorReportsSchema = z.object({
  timezone: z
    .string()
    .min(1, "timezone is required")
    .refine(
      (tz) => Intl.supportedValuesOf("timeZone").includes(tz),
      "Invalid IANA timezone"
    ),

  year: z
    .string()
    .regex(/^\d{4}$/, "Year must be in YYYY format")
    .refine((val) => {
      const yearNum = Number(val);
      return yearNum >= 2000 && yearNum <= currentYear;
    }, `Year must be between 2000 and ${currentYear}`)
    .optional(),

  request_type: z
    .enum(["1", "2", "3", "4", "5", "6", "7"])
    .optional(),
});

export type GetVendorReportsType = z.infer<typeof getVendorReportsSchema>;

// then map to backend values
export const requestTypeMap = {
  KPI: "1",
  ORDER_TREND: "2",
  EARNINGS: "3",
  TOP_MEALS: "4",
  FULFILLMENT: "5",
  PREP_TIME: "6",
  RATING: "7",
};