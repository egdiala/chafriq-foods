import { createTRPCRouter } from "@/trpc/init";
import { vendorNotificationsRouter } from "./vendor";

export const notificationsRouter = createTRPCRouter({
//   customer: customerAccountRouter,
  vendor: vendorNotificationsRouter
});