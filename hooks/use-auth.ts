// import { useOnboarding } from "@/context/onboarding";
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
    // const updateStep = useOnboarding((s) => s.updateStep);
    
    async function handleLogout() {
        await clearCredentials()
        window.location.href = "/login";
    }

    // const { mutate, isPending, isSuccess } = useLogout({
    //     onUnauthorized: handleLogout,
    //     onSuccess: handleLogout
    // })

    const logoutUser = () => {
        // if (isPending) return;
        // mutate()
    }

    async function handleLogin(data: Partial<ConfirmOtpType>) {
        await setCredentials({
            access_token: data.token as string,
            refresh_token: data.token as string,
        })
    }

    return { logout: logoutUser, handleLogin }
}