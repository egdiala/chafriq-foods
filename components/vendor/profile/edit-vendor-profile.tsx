"use client";

import { Button } from "@/components/ui/button"
import { useForm } from "@tanstack/react-form-nextjs"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PhoneInput } from "@/components/ui/phone-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUser } from "@/context/use-user";

type Props = {
    open: boolean;
    setOpen: (v: boolean) => void;
}

export const EditVendorProfile = ({ open, setOpen }: Props) => {
    const { user } = useUser()
    const editProfileForm = useForm({
        defaultValues: {
            phone_number: `+${user?.phone_number}`,
            gender: user?.gender as unknown as string
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
                    <DialogTitle>Edit profile</DialogTitle>
                </DialogHeader>
                <form id="edit-vendor-profile-form" onSubmit={(e) => {
                    e.preventDefault()
                    editProfileForm.handleSubmit()
                }}>
                    <FieldGroup>
                        <editProfileForm.Field name="phone_number">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                                        <PhoneInput
                                            placeholder="Enter a phone number"
                                            id={field.name}
                                            name={field.name}
                                            aria-invalid={isInvalid}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            defaultCountry="AU"
                                            onChange={(value) => field.handleChange(value)}
                                        />
                                        {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                    </Field>
                                )
                            }}
                        </editProfileForm.Field>
                        <editProfileForm.Field name="gender">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Gender</FieldLabel>
                                        <Select value={field.state.value} name={field.name} onValueChange={field.handleChange}>
                                            <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                                                <SelectValue placeholder="Select gender" />
                                            </SelectTrigger>
                                            <SelectContent position="popper" align="start">
                                                {
                                                    ["Male", "Female"]?.map((gender) => (
                                                        <SelectItem value={gender.toLowerCase()} key={gender.toLowerCase()}>{gender}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                    </Field>
                                )
                            }}
                        </editProfileForm.Field>
                    </FieldGroup>
                </form>
                <DialogFooter className="flex-row sm:justify-start [&>button]:flex-1">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" form="edit-vendor-profile-form">Update</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}