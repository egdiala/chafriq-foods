import { createTRPCRouter } from "@/trpc/init";
import { vendorNotificationsRouter } from "./vendor";
import { customerNotificationsRouter } from "./customer";

export const notificationsRouter = createTRPCRouter({
  customer: customerNotificationsRouter,
  vendor: vendorNotificationsRouter
});