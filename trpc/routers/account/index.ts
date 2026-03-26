import { createTRPCRouter } from "@/trpc/init";
import { vendorAccountRouter } from "./vendor";

export const accountRouter = createTRPCRouter({
  customer: vendorAccountRouter,
  vendor: vendorAccountRouter
});
