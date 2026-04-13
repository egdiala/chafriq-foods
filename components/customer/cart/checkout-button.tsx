import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { usePickupDetailsForm } from "@/hooks/use-pickup-details";
import { useCheckout } from "@/services/mutations/use-orders";
import { useStore } from "@tanstack/react-form-nextjs";

type PickupForm = ReturnType<typeof usePickupDetailsForm>

type Props = {
    form: PickupForm;
}

export const CheckoutButton = ({ form }: Props) => {
    const isSubmitting = useStore(form.store, (state) => state.isSubmitting);

    const { isPending, variables } = useCheckout();

    const disabled = isSubmitting || isPending || variables?.cart_id === form.getFieldValue("cart_id");
    return (
        <Button type="submit" form="pickup-details-form" disabled={disabled}>
            Checkout
            {(disabled) && (<Spinner className="lg:absolute right-4 size-5" />)}
        </Button>
    )
}