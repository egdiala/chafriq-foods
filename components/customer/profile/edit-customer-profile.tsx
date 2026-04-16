"use client";

import { useUser } from "@/context/use-user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { PhoneInput } from "@/components/ui/phone-input";
import { useMemo } from "react";
import { useForm } from "@tanstack/react-form-nextjs";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useCountryList } from "@/services/queries/use-explore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useUpdateCustomerProfile } from "@/services/mutations/use-account";
import { editCustomerProfileFormSchema } from "@/validations/customer-account";

type Props = {
    open: boolean;
    setOpen: (v: boolean) => void;
}

export const EditCustomerProfile = ({ open, setOpen }: Props) => {
    const { user: userObj } = useUser()
    const user = userObj as CustomerProfileResponse;
    
    const { data: countryList, isLoading: isLoadingCountryList } = useCountryList()

    const states = useMemo(() => {
        return countryList?.data?.[0]?.states?.filter((item) => item.type === "state") || []
    },[countryList?.data])
    
    const editProfileForm = useForm({
        defaultValues: {
            full_name: user?.full_name || "",
            phone_number: `+${user?.phone_number}`,
            gender: user?.gender as unknown as "male" | "female",
            state: user?.state || "",
            city: user?.city || "",
            zipcode: user?.zipcode || "",
        },
        validators: {
            onSubmit: editCustomerProfileFormSchema
        },
        onSubmit: async ({ value }) => {
            if (isPending) return;
            const { phone_number, ...rest } = value
            mutate({ phone_number: phone_number?.replace(/^\+/, ""), ...rest })
        },
    })

    const closeDialog = (v: boolean) => {
        setOpen(v)
        editProfileForm.reset()
    }
    
    const { mutate, isPending } = useUpdateCustomerProfile(() => closeDialog(false))

    return (
        <Dialog open={open} onOpenChange={closeDialog}>
            <DialogContent className="sm:max-w-xl" showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Edit Personal Profile</DialogTitle>
                </DialogHeader>
                <form id="edit-vendor-profile-form" onSubmit={(e) => {
                    e.preventDefault()
                    editProfileForm.handleSubmit()
                }}>
                    <FieldGroup className="grid lg:grid-cols-2">
                        <editProfileForm.Field name="full_name">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Years of Experience</FieldLabel>
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
                        </editProfileForm.Field>
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
                                        <Select value={field.state.value} name={field.name} onValueChange={(v) => field.handleChange(v as unknown as "male" | "female")}>
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
                        <editProfileForm.Field name="state">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>State</FieldLabel>
                                        <Select value={field.state.value} name={field.name} disabled={isLoadingCountryList} onValueChange={field.handleChange}>
                                            <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                                                <SelectValue placeholder="Select state" />
                                            </SelectTrigger>
                                            <SelectContent position="popper" align="start">
                                                {
                                                    states?.map((state) => (
                                                        <SelectItem value={state.name} key={state.id}>{state.name}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                        {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                    </Field>
                                )
                            }}
                        </editProfileForm.Field>
                        <editProfileForm.Field name="city">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>City</FieldLabel>
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
                        </editProfileForm.Field>
                        <editProfileForm.Field name="zipcode">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Zip/Postal Code</FieldLabel>
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
                        </editProfileForm.Field>
                    </FieldGroup>
                </form>
                <DialogFooter className="flex-row sm:justify-start [&>button]:flex-1">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                                
                    <editProfileForm.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting, state.isDirty]}>
                        {([canSubmit, isSubmitting, isDirty]) => {
                            return (
                                <Button type="submit" form="edit-vendor-profile-form" disabled={!canSubmit || isSubmitting || !isDirty || isPending}>
                                    Update
                                    {(isPending || isSubmitting) && (<Spinner className="absolute right-4 size-5" />)}
                                </Button>
                            )
                        }}
                    </editProfileForm.Subscribe>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}