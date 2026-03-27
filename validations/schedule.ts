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

export const updateAvailabilityFormSchema = z
  .object({
    schedule_id: z.string().min(1, "Schedule ID is required"),
    ...baseFields,
    day_week: z.string().min(1).max(7).optional(),
    day_date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
      .optional(),
  })
  .superRefine((data, ctx) => {
    // ✅ enforce "exactly one"
    if (!data.day_week && !data.day_date) {
      ctx.addIssue({
        code: "custom",
        message: "Either day_week or day_date is required",
        path: ["day_week"],
      });
      return;
    }

    if (data.day_week && data.day_date) {
      ctx.addIssue({
        code: "custom",
        message: "Provide only one of day_week or day_date",
        path: ["day_week"],
      });
    }

    // ✅ validate date only if present
    if (data.day_date) {
      const today = new Date();
      const inputDate = new Date(data.day_date);

      if (inputDate < new Date(today.toDateString())) {
        ctx.addIssue({
          code: "custom",
          message: "Date cannot be in the past",
          path: ["day_date"],
        });
      }
    }

    // ✅ validate time properly
    const [startH, startM] = data.start_time.split(":").map(Number);
    const [endH, endM] = data.end_time.split(":").map(Number);

    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    if (endMinutes <= startMinutes) {
      ctx.addIssue({
        code: "custom",
        message: "End time must be greater than start time",
        path: ["end_time"],
      });
    }
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

export const temporaryAvailabilityFormSchema = z.object({
    avail_type: z.literal("2"),
    ...baseFields,
    day_date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
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
})
.refine((data) => {
    const today = new Date();
    const inputDate = new Date(data.day_date);

    return inputDate >= new Date(today.toDateString());
}, {
    message: "Date cannot be in the past",
    path: ["day_date"],
});

export const editPermanentAvailabilityFormSchema = z.object({
    schedule_id: z.string().min(1, "Schedule ID is required"),
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

export const editTemporaryAvailabilityFormSchema = z.object({
    schedule_id: z.string().min(1, "Schedule ID is required"),
    ...baseFields,
    day_date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
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
})
.refine((data) => {
    const today = new Date();
    const inputDate = new Date(data.day_date);

    return inputDate >= new Date(today.toDateString());
}, {
    message: "Date cannot be in the past",
    path: ["day_date"],
});