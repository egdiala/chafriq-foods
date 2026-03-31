import { createTRPCRouter } from "@/trpc/init";
import { vendorAuthRouter } from "./vendor";
import { customerAuthRouter } from "./customer";

export const authRouter = createTRPCRouter({
  customer: customerAuthRouter,
  vendor: vendorAuthRouter
});
