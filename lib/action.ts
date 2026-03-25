"use server";

import { cookies } from "next/headers";

type SetCredentialsProps = {
  access_token: string;
  user_type: string;
}

export async function setCredentials({ access_token, user_type }: SetCredentialsProps): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set("access_token", access_token, {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    cookieStore.set("user_type", user_type, {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30, // 30 days
    });
}

export async function clearCredentials(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.getAll().forEach((cookie) => {
        cookieStore.delete(cookie.name);
    });
}
