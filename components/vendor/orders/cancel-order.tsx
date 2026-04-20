import { Dialog, DialogTitle, DialogDescription, DialogHeader, DialogContent, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form-nextjs";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { cancelOrderFormSchema } from "@/validations/vendor-order";
import { useUpdateVendorOrderStatus } from "@/services/mutations/use-orders";
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
            status: "5" as const,
            order_id: orderId as string
        },
        validators: {
            onSubmit: cancelOrderFormSchema
        },
        onSubmit: async ({ value }) => {
            mutate(value)
        },
    })

    const handleClose = (v: boolean) => {
        cancelForm.reset()
        setOpen(v)
    }

    const { mutate, isPending } = useUpdateVendorOrderStatus(() => handleClose(false))

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="gap-5 sm:max-w-98.5" showCloseButton={false}>
                <DialogHeader className="gap-0">
                    <DialogTitle className="font-bold text-xl">Cancel order?</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to cancel this order?
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