"use client";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "@tanstack/react-form-nextjs"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch";

type Props = {
    open: boolean;
    setOpen: (v: boolean) => void;
}

export const EditOrderSettings = ({ open, setOpen }: Props) => {

    const editOrderSettingsForm = useForm({
        defaultValues: {
            distance: "",
            autoAccept: true
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
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Edit Order Settings</DialogTitle>
                </DialogHeader>
                <form className="space-y-5 [&_button]:w-1/3! [&_button]:mt-5! [&_button]:mx-auto!" onSubmit={(e) => {
                    e.preventDefault()
                    editOrderSettingsForm.handleSubmit()
                }}>
                    <FieldGroup>
                        <editOrderSettingsForm.Field name="distance">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Order Distance</FieldLabel>
                                        <Input
                                            type="text"
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
                        </editOrderSettingsForm.Field>
                        <editOrderSettingsForm.Field name="autoAccept">
                            {(field) => {
                                return (
                                    <div className="flex items-center justify-between bg-orange-5 p-3 gap-3 rounded-lg">
                                        <div className="grid">
                                            <span className="font-medium text-xs text-orange-2">Auto accept orders</span>
                                            <p className="font-normal text-[0.625rem] text-orange-2">The system would auto accept orders when requested by a customer </p>
                                        </div>
                                        <Switch
                                            id={field.name}
                                            name={field.name}
                                            onBlur={field.handleBlur}
                                            className="-translate-y-1/2"
                                            checked={field.state.value}
                                            onCheckedChange={field.handleChange}
                                        />
                                    </div>
                                )
                            }}
                        </editOrderSettingsForm.Field>
                    </FieldGroup>
                </form>
                <DialogFooter className="flex-row sm:justify-start [&>button]:flex-1">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button type="button">Update</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}