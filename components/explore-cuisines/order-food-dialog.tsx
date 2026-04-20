"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { useForm } from "@tanstack/react-form-nextjs";
import { Field, FieldError } from "@/components/ui/field";
import { useGetCook } from "@/services/queries/use-explore";
import { useAddToCart } from "@/services/mutations/use-orders";
import { addToCartFormSchema } from "@/validations/customer-order";
import { addDays, format, isSameDay, startOfWeek } from "date-fns";
import { Dialog, DialogTitle, DialogHeader, DialogContent, DialogFooter, DialogClose } from "@/components/ui/dialog";

type Props = {
    open: boolean;
    cookId: string;
    quantity: number;
    meal: GetMealResponse | undefined;
    setOpen: (isOpen: boolean) => void;
}

export const OrderFoodDialog = ({ cookId, meal, open, quantity, setOpen }: Props) => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(start, i)).map((item) => item.getDay());
    const { data } = useGetCook({ cook_id: cookId, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone })

    const inActivePermanentScheduleDays = useMemo(() => {
        const days = data?.data?.schedule_data?.filter((item) => item.avail_type === 1).map((item) => item.day_week) || []
        const activeDays = days.map((day) => day === 7 ? 0 : day)
        return weekDays.filter((weekDay) => !activeDays.includes(weekDay))
    }, [data?.data?.schedule_data, weekDays])

    const activeTemporaryScheduleDays = useMemo(() => {
        const days = data?.data?.schedule_data?.filter((item) => item.avail_type === 2) || []
        return days.map((day) => new Date(day.day_date))
    }, [data?.data?.schedule_data])

    const isDateDisabled = (date: Date) => {
        // 1. Disable past dates (if that's still required)
        const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
        if (isPast) return true;

        // 2. ENABLE if it's in the temporary active list (overrides permanent schedule)
        const isTemporarilyActive = activeTemporaryScheduleDays.some((tempDate) => 
            isSameDay(date, tempDate)
        );
        if (isTemporarilyActive) return false;

        // 3. DISABLE if it's in your permanent inactive days of the week
        const dayOfWeek = date.getDay();
        return inActivePermanentScheduleDays.includes(dayOfWeek);
    };
    
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

    const { mutate, isPending } = useAddToCart("", () => closeDialog(false))

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
                                        disabled={isDateDisabled}
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