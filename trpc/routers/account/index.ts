import { createTRPCRouter } from "@/trpc/init";
import { vendorAccountRouter } from "./vendor";
import { customerAccountRouter } from "./customer";

export const accountRouter = createTRPCRouter({
  customer: customerAccountRouter,
  vendor: vendorAccountRouter
});
