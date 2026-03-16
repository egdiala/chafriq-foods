"use client";

import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form-nextjs";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Dialog, DialogTitle, DialogDescription, DialogHeader, DialogContent, DialogFooter, DialogClose } from "@/components/ui/dialog"

type Props = {
    day: string;
    open: boolean;
    setOpen: ({ day, isOpen }: { day: string; isOpen: boolean; }) => void;
}

export const SetDayAvailability = ({ day, open, setOpen }: Props) => {

    const availabilityForm = useForm({
        defaultValues: {
            availability: [{
                start: "",
                end: "",
            }]
        },
        validators: {
            // onSubmit: loginFormSchema
        },
        onSubmit: async ({ value }) => {
            console.log(value)
        },
    })
    return (
        <Dialog open={open} onOpenChange={(isOpen) => setOpen({ day: "", isOpen })}>
            <DialogContent className="gap-5 sm:max-w-125" showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Set your {day} Availability</DialogTitle>
                    <DialogDescription>Set the time you are available to take orders. You can only set a maximum of 2 time slots per day</DialogDescription>
                </DialogHeader>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    availabilityForm.handleSubmit()
                }}>
                    <availabilityForm.Field name="availability" mode="array">
                    {(field) => (
                        <div className="space-y-2"> 
                            {field.state.value.map((_, i) => {
                                return (
                                    <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <availabilityForm.Field name={`availability[${i}].start`}>
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
                                        <availabilityForm.Field name={`availability[${i}].end`}>
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
                                )
                            })}
                            <Button 
                                type="button" 
                                variant="secondary" 
                                size="smallest" 
                                className="text-sm font-medium float-right" 
                                onClick={() => field.pushValue({ start: '', end: '' })}
                            >
                                <Plus className="size-4!" />
                                <span className="sr-only sm:not-sr-only">Add New Slot</span>
                            </Button>
                        </div>
                    )}
                    </availabilityForm.Field>
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