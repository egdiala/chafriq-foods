import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import { baseProcedure, createTRPCRouter } from "../init";
import { authRouter } from "./auth";

export const appRouter = createTRPCRouter({
  auth: authRouter,
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
