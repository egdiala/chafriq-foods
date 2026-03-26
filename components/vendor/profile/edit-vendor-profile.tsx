"use client";

import { useUser } from "@/context/use-user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { PhoneInput } from "@/components/ui/phone-input";
import { Fragment, useMemo, useRef, useState } from "react";
import { useForm, useStore } from "@tanstack/react-form-nextjs";
import { editVendorProfileFormSchema } from "@/validations/vendor-account";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useCountryList, useSearchLocations } from "@/services/queries/use-explore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList, ComboboxStatus } from "@/components/ui/combobox";
import { useUpdateVendorProfile } from "@/services/mutations/use-account";

type Props = {
    open: boolean;
    setOpen: (v: boolean) => void;
}

export const EditVendorProfile = ({ open, setOpen }: Props) => {
    const { user } = useUser()
    const { data: countryList, isLoading: isLoadingCountryList } = useCountryList()

    const [searchValue, setSearchValue] = useState("");
    const trimmedSearchValue = searchValue?.trim();

    const abortControllerRef = useRef<AbortController | null>(null);

    const { data, isLoading, error } = useSearchLocations({ q: searchValue, country: "au" })

    const states = useMemo(() => {
        return countryList?.data?.[0]?.states?.filter((item) => item.type === "state") || []
    },[countryList?.data])
    
    const editProfileForm = useForm({
        defaultValues: {
            phone_number: `+${user?.phone_number}`,
            gender: user?.gender || "",
            year_exp: String(user?.year_exp || ""),
            home_address: user?.home_address || "",
            home_state: user?.home_state || "",
            home_city: user?.home_city || "",
            home_zip: user?.home_zip || "",
        },
        validators: {
            onSubmit: editVendorProfileFormSchema
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
    
    const { mutate, isPending } = useUpdateVendorProfile(() => closeDialog(false))

    const selectedValue = useStore(editProfileForm.store, (state) => state.values.home_address)

    function getStatus() {
        if (isLoading) {
            return (
                <Fragment><Spinner />Searching…</Fragment>
            );
        }

        if (error) {
            return <Fragment>An error occurred</Fragment>;
        }

        if (trimmedSearchValue === '') {
            return selectedValue ? null : 'Start typing to search…';
        }

        if (data?.data.length === 0) {
            return `No matches for "${trimmedSearchValue}".`;
        }

        return null;
    }

    return (
        <Dialog open={open} onOpenChange={closeDialog}>
            <DialogContent className="sm:max-w-lg" showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Edit Personal Profile</DialogTitle>
                </DialogHeader>
                <form id="edit-vendor-profile-form" onSubmit={(e) => {
                    e.preventDefault()
                    editProfileForm.handleSubmit()
                }}>
                    <FieldGroup className="grid lg:grid-cols-2">
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
                        <editProfileForm.Field name="year_exp">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Years of Experience</FieldLabel>
                                        <Input
                                            type="text"
                                            id={field.name}
                                            name={field.name}
                                            inputMode="decimal"
                                            pattern="[0-9]*"
                                            aria-invalid={isInvalid}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => {
                                                const raw = e.target.value.match(/^\d+/)?.[0] || "";
                                                const normalized = raw === "" ? "" : raw === "0" ? "0" : raw.replace(/^0+/, "");
                                                field.handleChange(normalized)
                                            }}
                                        />
                                        {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                    </Field>
                                )
                            }}
                        </editProfileForm.Field>
                        <editProfileForm.Field name="home_state">
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
                        <editProfileForm.Field name="home_city">
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
                        <editProfileForm.Field name="home_zip">
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
                        <editProfileForm.Field name="home_address">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid} className="lg:col-span-2">
                                        <FieldLabel htmlFor={field.name}>Home Address</FieldLabel>
                                        <Combobox
                                            filter={null}
                                            items={data?.data || []}
                                            value={field.state.value ? { id: "", name: field.state.value } : null}
                                            autoHighlight
                                            itemToStringLabel={(address: SearchLocationsResponse) => address.name}
                                            onValueChange={(value) => {
                                                field.handleChange(value?.name || "");
                                                setSearchValue('');
                                            }}
                                            onInputValueChange={(nextSearchValue, { reason }) => {
                                                setSearchValue(nextSearchValue);
                                                field.handleChange(nextSearchValue);

                                                const controller = new AbortController();
                                                abortControllerRef.current?.abort();
                                                abortControllerRef.current = controller;

                                                if (nextSearchValue === '') {
                                                    return;
                                                }

                                                if (reason === 'item-press') {
                                                    return;
                                                }

                                                if (controller.signal.aborted) {
                                                    return;
                                                }
                                            }}
                                        >
                                        <ComboboxInput 
                                            type="text"
                                            id={field.name}
                                            name={field.name} 
                                            aria-invalid={isInvalid}  
                                            onBlur={field.handleBlur} 
                                            placeholder="Search address..."
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        <ComboboxContent>
                                            <ComboboxStatus>{getStatus()}</ComboboxStatus>
                                            {/* <ComboboxEmpty>{getEmptyMessage()}</ComboboxEmpty> */}
                                            <ComboboxList>
                                            {(address) => (
                                                <ComboboxItem key={address.id} value={address}>
                                                {address.name}
                                                </ComboboxItem>
                                            )}
                                            </ComboboxList>
                                        </ComboboxContent>
                                        </Combobox>
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