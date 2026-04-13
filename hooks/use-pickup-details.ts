import { useForm } from "@tanstack/react-form-nextjs";
import { useCheckout } from "@/services/mutations/use-orders";
import { pickupDetailsFormSchema } from "@/validations/customer-order";

export const usePickupDetailsForm = (cartId: string) => {
    const { mutateAsync, isPending } = useCheckout();

    return useForm({
        defaultValues: {
            cart_id: cartId,
            receiver_phone: "",
            receiver_name: "",
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