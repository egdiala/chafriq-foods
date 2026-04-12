"use client";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { useForm } from "@tanstack/react-form-nextjs";
import { Field, FieldError } from "@/components/ui/field";
import { useAddToCart } from "@/services/mutations/use-orders";
import { addToCartFormSchema } from "@/validations/customer-order";
import { Dialog, DialogTitle, DialogHeader, DialogContent, DialogFooter, DialogClose } from "@/components/ui/dialog";

type Props = {
    open: boolean;
    quantity: number;
    meal: GetMealResponse | undefined;
    setOpen: (isOpen: boolean) => void;
}

export const OrderFoodDialog = ({ meal, open, quantity, setOpen }: Props) => {
    const orderFoodForm = useForm({
        defaultValues: {
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            menu_id: meal?.menu_id || "",
            quantity_size: quantity.toString(),
            order_date: ""
        },
        validators: {
            onSubmit: addToCartFormSchema
        },
        onSubmit: async ({ value }) => {
            if (isPending) return;
            mutate(value)
        },
    })

    const closeDialog = (v: boolean) => {
        setOpen(v)
        orderFoodForm.reset()
    }

    const { mutate, isPending } = useAddToCart(() => closeDialog(false))

    const menuImage = (meal?.img_data?.filter((item) => item.mime_type.startsWith("image")) || [])?.[0]?.file_url

    return (
        <Dialog open={open} onOpenChange={closeDialog}>
            <DialogContent className="gap-5 sm:max-w-125 rounded-2xl" showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Order Food</DialogTitle>
                </DialogHeader>
                <div className="flex items-center gap-4 p-3 bg-grey-dark-4 rounded-xl">
                    <div className="flex items-center gap-3 flex-1">
                        <Avatar className="size-13 rounded">
                            <AvatarImage src={menuImage} className="size-13 rounded" />
                        </Avatar>
                        <div className="flex flex-col gap-1">
                            <span className="font-medium text-xs text-grey-dark-2">{meal?.menu_name}</span>
                            <p className="text-xs text-grey-dark-3 line-clamp-1">{meal?.menu_content}</p>
                        </div>
                    </div>
                    <span className="font-semibold text-base text-grey-dark-0">
                        {Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 }).format(quantity * (meal?.menu_amount || 0))}
                    </span>
                </div>
                <form id="temporary-availability-form" className="space-y-6" onSubmit={(e) => {
                    e.preventDefault()
                    orderFoodForm.handleSubmit()
                }}>
                    <orderFoodForm.Field name="order_date">
                        {(subField) => {
                            const isInvalid = !subField.state.meta.isValid
                            return (
                                <Field data-invalid={isInvalid}>
                                    <Calendar
                                        mode="single"
                                        selected={subField.state.value as unknown as Date}
                                        onSelect={(selectedDate) => subField.handleChange(format(selectedDate as unknown as Date, "yyyy-MM-dd"))}
                                        className="bg-transparent"
                                        captionLayout="label"
                                        disabled={{ before: new Date() }}
                                    />
                                    {isInvalid && (<FieldError errors={subField.state.meta.errors} />)}
                                </Field>
                            )
                        }}
                    </orderFoodForm.Field>
                </form>
                <DialogFooter className="flex-row sm:justify-start [&>button]:flex-1">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <orderFoodForm.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => {
                            return (
                                <Button type="submit" form="temporary-availability-form" disabled={!canSubmit || isSubmitting || isPending}>
                                    Add to Cart
                                    {(isPending || isSubmitting) && (<Spinner className="absolute right-4 size-5" />)}
                                </Button>
                            )
                        }}
                    </orderFoodForm.Subscribe>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}