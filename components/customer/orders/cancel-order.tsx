import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form-nextjs";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useCancelCustomerOrder } from "@/services/mutations/use-orders";
import { cancelCustomerOrderFormSchema } from "@/validations/customer-order";
import { Dialog, DialogTitle, DialogDescription, DialogHeader, DialogContent, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";

type Props = {
    open: boolean;
    orderId: string | null;
    setOpen: (value: boolean) => void;
}

export const CancelOrder = ({ open, orderId, setOpen }: Props) => {
    const cancelForm = useForm({
        defaultValues: {
            reason: "",
            order_id: orderId as string
        },
        validators: {
            onSubmit: cancelCustomerOrderFormSchema
        },
        onSubmit: async ({ value }) => {
            mutate(value)
        },
    })

    const handleClose = (v: boolean) => {
        cancelForm.reset()
        setOpen(v)
    }

    const { mutate, isPending } = useCancelCustomerOrder(() => handleClose(false))

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="gap-5 sm:max-w-98.5" showCloseButton={false}>
                <div className="relative size-14">
                    <Image src="/caution.gif" alt="caution" fill />
                </div>
                <DialogHeader className="gap-0">
                    <DialogTitle className="font-bold text-xl">Cancel order?</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to cancel this order? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader> 
                <form id="cancel-order-form" className="space-y-5 [&_button]:w-1/3! [&_button]:mt-5! [&_button]:mx-auto!" onSubmit={(e) => {
                    e.preventDefault()
                    cancelForm.handleSubmit()
                }}>
                    <cancelForm.Field name="reason">
                        {(field) => {
                            const isInvalid = !field.state.meta.isValid
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>Reason</FieldLabel>
                                    <Textarea
                                        id={field.name}
                                        name={field.name}
                                        aria-invalid={isInvalid}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                    {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                </Field>
                            )
                        }}
                    </cancelForm.Field>
                </form>
                <DialogFooter className="flex-row sm:justify-start [&>button]:flex-1">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Back</Button>
                    </DialogClose>
                    <Button type="submit" disabled={isPending} form="cancel-order-form">
                        Cancel Order
                        {(isPending) && (<Spinner />)}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}