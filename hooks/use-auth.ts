// import { useOnboarding } from "@/context/onboarding";
import { useUser } from "@/context/use-user";
import { clearCredentials, setCredentials } from "@/lib/action";
// import { useLogout } from "@/services/mutations/use-auth";
import { useTRPC } from "@/trpc/client";
import { type ConfirmOtpType } from "@/trpc/routers/auth/vendor";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useAuth = () => {
    const trpc = useTRPC();
    const router = useRouter();
    const queryClient = useQueryClient();
    const updateType = useUser((s) => s.updateType);
    const updateUser = useUser((s) => s.updateUser);
    
    async function handleLogout(url?: string) {
        await clearCredentials()
        updateType(null)
        updateUser(null)
        window.location.href = url || "/";
    }

    // const { mutate, isPending, isSuccess } = useLogout({
    //     onUnauthorized: handleLogout,
    //     onSuccess: handleLogout
    // })

    const logoutUser = () => {
        // if (isPending) return;
        // mutate()
    }

    async function handleLogin(data: Partial<ConfirmOtpType>, userType: UserType) {
        await setCredentials({
            access_token: data.token as string,
            user_type: userType,
        })
        console.log("🔥🔥🔥🔥🔥", "credentials set")
        const [profile] = await Promise.all([
            userType === "customer" ? queryClient.fetchQuery(trpc.account.customer.getProfile.queryOptions()) : queryClient.fetchQuery(trpc.account.vendor.getProfile.queryOptions()),
        ]);
        console.log("🔥🔥🔥🔥🔥", "profile fetch initiated")

        if ((profile as { status: string; data: VendorProfileResponse | CustomerProfileResponse }).status === "ok") {
            console.log("🔥🔥🔥🔥🔥", "profile fetched")
            updateUser(profile.data)
            updateType(userType)
            console.log("🔥🔥🔥🔥🔥", "profile updated")
        }

        console.log("🔥🔥🔥🔥🔥", `about to route /${userType}`)
        router.push(`/${userType}`)
        console.log("🔥🔥🔥🔥🔥", `routed to /${userType}`)
    }

    return { logout: logoutUser, handleLogin, handleLogout }
}