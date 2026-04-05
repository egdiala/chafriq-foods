import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import { authRouter } from "./auth";
import { menuRouter } from "./menu";
import { ordersRouter } from "./orders";
import { exploreRouter } from "./explore";
import { accountRouter } from "./account";
import { schedulesRouter } from "./schedules";
import { subscriptionRouter } from "./subscription";
import { baseProcedure, createTRPCRouter } from "../init";
import { adsRouter } from "./ads";
import { reportsRouter } from "./reporting";
import { notificationsRouter } from "./notifications";

export const appRouter = createTRPCRouter({
  ads: adsRouter,
  auth: authRouter,
  account: accountRouter,
  explore: exploreRouter,
  menu: menuRouter,
  notifications: notificationsRouter,
  orders: ordersRouter,
  reports: reportsRouter,
  schedules: schedulesRouter,
  subscription: subscriptionRouter,
  hello: baseProcedure.query(() => {
    return {
      message: "Hello, world!",
    };
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
