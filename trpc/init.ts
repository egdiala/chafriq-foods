import { cache } from "react";
import { cookies, headers } from "next/headers";
import { initTRPC, TRPCError } from "@trpc/server";

const createTRPCContextInner = async () => {
  return {};
};

export const createTRPCContext = cache(createTRPCContextInner);
export const createTRPCContextForRoute = createTRPCContextInner;

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;

// Infer the context type from createTRPCContextInner
type Context = Awaited<ReturnType<typeof createTRPCContextInner>>;

export const baseProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async ({ next }) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!accessToken || !refreshToken) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({ ctx: { accessToken, refreshToken } });
});