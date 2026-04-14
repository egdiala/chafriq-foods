import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form-nextjs";
import { useCheckout } from "@/services/mutations/use-orders";
import { pickupDetailsFormSchema } from "@/validations/customer-order";
import { useUser } from "@/context/use-user";

export const usePickupDetailsForm = (cartId: string) => {
    const router = useRouter()
    const { user: userObj } = useUser()
    const user = userObj as CustomerProfileResponse;
    const { mutateAsync, isPending } = useCheckout(() => {
        router.push("/customer/checkout")
    });

    return useForm({
        defaultValues: {
            cart_id: cartId,
            receiver_phone: `+${user?.phone_number}`,
            receiver_name: user?.full_name || "",
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            pickup_note: "",
        },
        validators: {
            onSubmit: pickupDetailsFormSchema,
        },
        onSubmit: async ({ value }) => {
            if (isPending) return;

            const { receiver_phone, ...payload } = value;

            await mutateAsync({
                receiver_phone: receiver_phone?.replace(/^\+/, ""),
                ...payload,
            });
        },
    });
};