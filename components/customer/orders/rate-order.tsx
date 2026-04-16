import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form-nextjs";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { useRateCustomerOrder } from "@/services/mutations/use-orders";
import { rateCustomerOrderFormSchema, RateCustomerOrdersFormType } from "@/validations/customer-order";
import { Dialog, DialogTitle, DialogHeader, DialogContent, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { IconStarFull } from "@/components/icons";
import { cn } from "@/lib/utils";

type Props = {
    open: boolean;
    orderId: string | null;
    setOpen: (value: boolean) => void;
}

export const RateOrder = ({ open, orderId, setOpen }: Props) => {
    const rateOrderForm = useForm({
        defaultValues: {
            comment: "",
            rating: "" as RateCustomerOrdersFormType["rating"],
            order_id: orderId as string
        },
        validators: {
            onSubmit: rateCustomerOrderFormSchema
        },
        onSubmit: async ({ value }) => {
            mutate(value)
        },
    })

    const handleClose = (v: boolean) => {
        rateOrderForm.reset()
        setOpen(v)
    }

    const { mutate, isPending } = useRateCustomerOrder(() => handleClose(false))

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="gap-5 sm:max-w-98.5" showCloseButton={false}>
                <DialogHeader className="gap-0">
                    <DialogTitle className="font-bold text-xl">Rate Cook</DialogTitle>
                </DialogHeader> 
                <form id="cancel-order-form" className="space-y-5" onSubmit={(e) => {
                    e.preventDefault()
                    rateOrderForm.handleSubmit()
                }}>
                    <rateOrderForm.Field name="rating">
                        {(field) => {
                            const isInvalid = !field.state.meta.isValid
                            return (
                                <Field data-invalid={isInvalid}>
                                    <div className="flex items-center justify-around">
                                    {
                                        Array.from({ length: 5 }).map((_, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                className={cn(
                                                    "grid place-content-center h-16! [&>svg]:size-16",
                                                    parseInt(field.state.value) >= (index + 1) ? "text-yellow-2" : "text-outline"
                                                )}
                                                onClick={() => field.handleChange((index + 1).toString() as RateCustomerOrdersFormType["rating"])}
                                            >
                                                <IconStarFull />
                                            </button>
                                        ))
                                    }
                                    </div>
                                    {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                </Field>
                            )
                        }}
                    </rateOrderForm.Field>

                    <rateOrderForm.Field name="comment">
                        {(field) => {
                            const isInvalid = !field.state.meta.isValid
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>Review</FieldLabel>
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
                    </rateOrderForm.Field>
                </form>
                <DialogFooter className="flex-row sm:justify-start [&>button]:flex-1">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" disabled={isPending} form="cancel-order-form">
                        Submit
                        {(isPending) && (<Spinner />)}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}