import { createTRPCRouter } from "@/trpc/init";
import { vendorAuthRouter } from "./vendor";

export const authRouter = createTRPCRouter({
  vendor: vendorAuthRouter
});
