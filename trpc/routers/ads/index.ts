import { createTRPCRouter } from "@/trpc/init";
import { vendorAdsRouter } from "./vendor";
import { customerAdsRouter } from "./customer";

export const adsRouter = createTRPCRouter({
  customer: customerAdsRouter,
  vendor: vendorAdsRouter
});