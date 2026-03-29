import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import { baseProcedure, createTRPCRouter } from "../init";
import { authRouter } from "./auth";
import { exploreRouter } from "./explore";
import { accountRouter } from "./account";
import { schedulesRouter } from "./schedules";
import { menuRouter } from "./menu";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  account: accountRouter,
  explore: exploreRouter,
  menu: menuRouter,
  schedules: schedulesRouter,
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
