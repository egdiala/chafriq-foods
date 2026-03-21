import { NextResponse } from "next/server";
import { appRouter } from "@/trpc/routers/_app";
import { createTRPCContext } from "@/trpc/init";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
        return NextResponse.redirect(new URL("/error?reason=missing-token", req.url));
    }

    try {
        const ctx = await createTRPCContext();
        const caller = appRouter.createCaller(ctx);

        await caller.auth.verifyEmailToken({ token });

        return NextResponse.redirect(new URL("/setup-pin", req.url));
    } catch (err) {
        return NextResponse.redirect(new URL("/error?reason=invalid-token", req.url));
    }
}
