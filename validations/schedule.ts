import * as z from "zod";

const baseFields = {
    timezone: z.string().min(1, "Timezone is required"),
    start_time: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
    end_time: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
};

export const createAvailabilityFormSchema = z.discriminatedUnion("avail_type", [
    z.object({
        avail_type: z.literal("1"), // permanent
        ...baseFields,
        day_week: z.string().min(1).max(7),
    }),
    z.object({
        avail_type: z.literal("2"), // temporary
        ...baseFields,
        day_date: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
    }),
])
.refine((data) => data.end_time > data.start_time, {
    message: "End time must be greater than start time",
    path: ["end_time"],
})
.refine((data) => {
    if (data.avail_type !== "2") return true;

    const today = new Date();
    const inputDate = new Date(data.day_date);

    return inputDate >= new Date(today.toDateString());
}, {
    message: "Date cannot be in the past",
    path: ["day_date"],
});

export const permanentAvailabilityFormSchema = z.object({
    avail_type: z.literal("1"),
    ...baseFields,
    day_week: z.string().min(1).max(7),
})
.refine((data) => {
    const [startH, startM] = data.start_time.split(":").map(Number);
    const [endH, endM] = data.end_time.split(":").map(Number);

    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    return endMinutes > startMinutes;
}, {
    message: "End time must be greater than start time",
    path: ["end_time"],
});