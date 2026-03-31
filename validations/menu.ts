import * as z from "zod";

export const getMenuListSchema = z.object({
    component: z.enum(["count"]).optional()
})

export type GetMenuListType = z.infer<typeof getMenuListSchema>;

export const createMenuFormSchema = z.object({
  menu_name: z
    .string()
    .min(1, "Menu name is required")
    .max(50, "Maximum 50 characters")
    .regex(/^[a-zA-Z0-9\s]+$/, "No special characters allowed"),
  menu_content: z
    .string()
    .min(1, "Description is required")
    .max(2000, "Maximum 2000 characters"),
  menu_amount: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Price must be a valid number greater than 0",
    }),
  cooking_hour: z
    .string()
    .min(1, "Cooking time is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Cooking time must be a valid number greater than 0",
    }),
  quantity_size: z.string(),
  quantity_unit: z
    .string()
    .max(30, "Maximum 30 characters"),
  min_order: z
    .string()
    .trim()
    .refine((val) => {
      if (!val) return true;
      return !isNaN(Number(val)) && Number(val) > 0;
    }, {
      message: "Minimum order must be a valid number greater than 0",
    }),
  additional_note: z
    .string().trim()
    .max(500, "Maximum 500 characters"),
  allegen_note: z
    .string().trim()
    .max(500, "Maximum 500 characters"),
  allegen_list: z.array(z.string().trim()),
  allegen_trace: z.array(z.string().trim()),
  dish_list: z.array(z.string().trim()),
});

export type CreateMenuFormSchemaType = z.infer<typeof createMenuFormSchema>;

export const editMenuFormSchema = z.object({
  menu_id: z.string().min(1, "Menu ID is required"),
  menu_name: z
    .string()
    .min(1, "Menu name is required")
    .max(50, "Maximum 50 characters")
    .regex(/^[a-zA-Z0-9\s]+$/, "No special characters allowed"),
  menu_content: z
    .string()
    .min(1, "Description is required")
    .max(2000, "Maximum 2000 characters"),
  menu_amount: z
    .string()
    .min(1, "Price is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Price must be a valid number greater than 0",
    }),
  cooking_hour: z
    .string()
    .min(1, "Cooking time is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Cooking time must be a valid number greater than 0",
    }),
  quantity_size: z.string(),
  quantity_unit: z
    .string()
    .max(30, "Maximum 30 characters"),
  min_order: z
    .string()
    .trim()
    .refine((val) => {
      if (!val) return true;
      return !isNaN(Number(val)) && Number(val) > 0;
    }, {
      message: "Minimum order must be a valid number greater than 0",
    }),
  additional_note: z
    .string().trim()
    .max(500, "Maximum 500 characters"),
  allegen_note: z
    .string().trim()
    .max(500, "Maximum 500 characters"),
  allegen_list: z.array(z.string().trim()),
  allegen_trace: z.array(z.string().trim()),
  dish_list: z.array(z.string().trim()),
});

export type EditMenuFormSchemaType = z.infer<typeof editMenuFormSchema>;