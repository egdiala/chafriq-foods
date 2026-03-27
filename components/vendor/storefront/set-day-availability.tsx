"use client";

import { useMemo } from "react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "@tanstack/react-form-nextjs";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { permanentAvailabilityFormSchema } from "@/validations/schedule";
import { useCreateAvailability } from "@/services/mutations/use-schedules";
import { Dialog, DialogTitle, DialogDescription, DialogHeader, DialogContent, DialogFooter, DialogClose } from "@/components/ui/dialog";

type Props = {
    day: Date;
    open: boolean;
    setOpen: ({ day, isOpen }: { day: Date; isOpen: boolean; }) => void;
}

export const SetDayAvailability = ({ day, open, setOpen }: Props) => {

    const dayWeek = useMemo(() => {
        if (!open) return;

        return day.getDay() === 0 ? "7" : day.getDay().toString();
    },[open, day])

    const availabilityForm = useForm({
        defaultValues: {
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            start_time: "",
            end_time: "",
            avail_type: "1" as const,
            day_week: dayWeek as unknown as string,
        },
        validators: {
            onSubmit: permanentAvailabilityFormSchema
        },
        onSubmit: async ({ value }) => {
            if (isPending) return;
            mutate(value)
        },
    })

    const closeDialog = (v: boolean) => {
        setOpen({ day: undefined as unknown as Date, isOpen: v })
        availabilityForm.reset()
    }

    const { mutate, isPending } = useCreateAvailability(() => closeDialog(false))

    return (
        <Dialog open={open} onOpenChange={closeDialog}>
            <DialogContent className="gap-5 sm:max-w-125" showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Set your {open ? format(day, "EEEE") : ""} Availability</DialogTitle>
                    <DialogDescription>Set the time you are available to take orders. You can only set a maximum of 2 time slots per day</DialogDescription>
                </DialogHeader>
                <form id="day-availability-form" onSubmit={(e) => {
                    e.preventDefault()
                    availabilityForm.handleSubmit()
                }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <availabilityForm.Field name="start_time">
                            {(subField) => {
                                const isInvalid = !subField.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={subField.name}>Start Time</FieldLabel>
                                        <Input
                                            type="time"
                                            id={subField.name}
                                            name={subField.name}
                                            aria-invalid={isInvalid}
                                            value={subField.state.value}
                                            onBlur={subField.handleBlur}
                                            onChange={(e) => subField.handleChange(e.target.value)}
                                            className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                        />
                                        {isInvalid && (<FieldError errors={subField.state.meta.errors} />)}
                                    </Field>
                                )
                            }}
                        </availabilityForm.Field>
                        <availabilityForm.Field name="end_time">
                            {(subField) => {
                                const isInvalid = !subField.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={subField.name}>End Time</FieldLabel>
                                        <Input
                                            type="time"
                                            id={subField.name}
                                            name={subField.name}
                                            aria-invalid={isInvalid}
                                            value={subField.state.value}
                                            onBlur={subField.handleBlur}
                                            onChange={(e) => subField.handleChange(e.target.value)}
                                            className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                        />
                                        {isInvalid && (<FieldError errors={subField.state.meta.errors} />)}
                                    </Field>
                                )
                            }}
                        </availabilityForm.Field>
                    </div>
                </form>
                <DialogFooter className="flex-row sm:justify-start [&>button]:flex-1">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <availabilityForm.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => {
                            return (
                                <Button type="submit" form="day-availability-form" disabled={!canSubmit || isSubmitting || isPending}>
                                    Submit
                                    {(isPending || isSubmitting) && (<Spinner className="absolute right-4 size-5" />)}
                                </Button>
                            )
                        }}
                    </availabilityForm.Subscribe>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}