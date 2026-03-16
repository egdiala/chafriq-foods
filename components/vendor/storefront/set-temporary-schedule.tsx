"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { useForm } from "@tanstack/react-form-nextjs";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Dialog, DialogTitle, DialogDescription, DialogHeader, DialogContent, DialogFooter, DialogClose } from "@/components/ui/dialog";

type Props = {
    open: boolean;
    setOpen: (isOpen: boolean) => void;
}

export const SetTemporarySchedule = ({ open, setOpen }: Props) => {

    const availabilityForm = useForm({
        defaultValues: {
            start: "",
            end: "",
            date: new Date() as Date | undefined
        },
        validators: {
            // onSubmit: loginFormSchema
        },
        onSubmit: async ({ value }) => {
            console.log(value)
        },
    })
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="gap-5 sm:max-w-125" showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Set your Temporary Schedule</DialogTitle>
                    <DialogDescription>Temporary schedules are one-off schedule outside your permanent regular schedule and they expire when the time elapses</DialogDescription>
                </DialogHeader>
                <form className="space-y-6" onSubmit={(e) => {
                    e.preventDefault()
                    availabilityForm.handleSubmit()
                }}>
                    <availabilityForm.Field name="date">
                        {(subField) => {
                            const isInvalid = !subField.state.meta.isValid
                            return (
                                <Field data-invalid={isInvalid}>
                                    <Calendar
                                        mode="single"
                                        selected={subField.state.value}
                                        onSelect={(selectedDate) => subField.handleChange(selectedDate)}
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
                        <availabilityForm.Field name="start">
                            {(subField) => {
                                const isInvalid = !subField.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={subField.name}>Start Time</FieldLabel>
                                        <Input
                                            type="text"
                                            id={subField.name}
                                            name={subField.name}
                                            aria-invalid={isInvalid}
                                            value={subField.state.value}
                                            onBlur={subField.handleBlur}
                                            onChange={(e) => subField.handleChange(e.target.value)}
                                        />
                                        {isInvalid && (<FieldError errors={subField.state.meta.errors} />)}
                                    </Field>
                                )
                            }}
                        </availabilityForm.Field>
                        <availabilityForm.Field name="end">
                            {(subField) => {
                                const isInvalid = !subField.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={subField.name}>End Time</FieldLabel>
                                        <Input
                                            type="text"
                                            id={subField.name}
                                            name={subField.name}
                                            aria-invalid={isInvalid}
                                            value={subField.state.value}
                                            onBlur={subField.handleBlur}
                                            onChange={(e) => subField.handleChange(e.target.value)}
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
                    <Button type="button">Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}