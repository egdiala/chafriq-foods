import { createTRPCRouter } from "@/trpc/init";
import { vendorOrdersRouter } from "./vendor";
import { customerOrdersRouter } from "./customer";

export const ordersRouter = createTRPCRouter({
  customer: customerOrdersRouter,
  vendor: vendorOrdersRouter
});