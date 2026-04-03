import { createTRPCRouter } from "@/trpc/init";
import { vendorOrdersRouter } from "./vendor";

export const ordersRouter = createTRPCRouter({
//   customer: customerAccountRouter,
  vendor: vendorOrdersRouter
});
