"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { useForm } from "@tanstack/react-form-nextjs";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { temporaryAvailabilityFormSchema } from "@/validations/schedule";
import { Dialog, DialogTitle, DialogDescription, DialogHeader, DialogContent, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { format } from "date-fns";
import { useCreateAvailability } from "@/services/mutations/use-schedules";
import { Spinner } from "@/components/ui/spinner";

type Props = {
    open: boolean;
    setOpen: (isOpen: boolean) => void;
}

export const SetTemporarySchedule = ({ open, setOpen }: Props) => {
    const availabilityForm = useForm({
        defaultValues: {
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            start_time: "",
            end_time: "",
            avail_type: "2" as const,
            day_date: "" as unknown as string,
        },
        validators: {
            onSubmit: temporaryAvailabilityFormSchema
        },
        onSubmit: async ({ value }) => {
            if (isPending) return;
            mutate(value)
        },
    })

    const closeDialog = (v: boolean) => {
        setOpen(v)
        availabilityForm.reset()
    }

    const { mutate, isPending } = useCreateAvailability(() => closeDialog(false))

    return (
        <Dialog open={open} onOpenChange={closeDialog}>
            <DialogContent className="gap-5 sm:max-w-125 h-[78dvh]" showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Set your Temporary Schedule</DialogTitle>
                    <DialogDescription>Temporary schedules are one-off schedule outside your permanent regular schedule and they expire when the time elapses</DialogDescription>
                </DialogHeader>
                <form id="temporary-availability-form" className="space-y-6 overflow-scroll" onSubmit={(e) => {
                    e.preventDefault()
                    availabilityForm.handleSubmit()
                }}>
                    <availabilityForm.Field name="day_date">
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
                    </availabilityForm.Field>
                    <Separator />
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
                                <Button type="submit" form="temporary-availability-form" disabled={!canSubmit || isSubmitting || isPending}>
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