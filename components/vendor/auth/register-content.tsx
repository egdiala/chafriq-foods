"use client";

import Link from "next/link";
import { ChevronDownIcon, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Checkbox } from "@/components/ui/checkbox";
import { PhoneInput } from "@/components/ui/phone-input";
import { useForm, useStore } from "@tanstack/react-form-nextjs";
import { useRegisterVendor } from "@/services/mutations/use-auth";
import { registerVendorFormSchema } from "@/validations/vendor-auth";
import { Activity, Fragment, useMemo, useRef, useState } from "react";
import { VerifyEmailOnRegisterDialog } from "./verify-email-on-register-dialog";
import { useCountryList, useDishList, useSearchLocations } from "@/services/queries/use-explore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxStatus, ComboboxTrigger, ComboboxValue } from "@/components/ui/combobox";
import { PasswordRules } from "@/components/password-rules";

export const VendorRegisterContent = () => {
    return (
        <PersonalInformation />
    )
}

const PersonalInformation = () => {
    const [open, setOpen] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const { mutate, isPending: isRegistering } = useRegisterVendor(() => {
        setOpen(true)
    })
    const { data: dishList, isLoading: isLoadingDishList } = useDishList()
    const { data: countryList, isLoading: isLoadingCountryList } = useCountryList()

    const [searchValue, setSearchValue] = useState('');
    const trimmedSearchValue = searchValue.trim();

    const [searchBusinessValue, setSearchBusinessValue] = useState('');
    const trimmedBusinessValue = searchBusinessValue.trim();

    const abortControllerRef = useRef<AbortController | null>(null);

    const { data, isLoading, error } = useSearchLocations({ q: searchValue, country: "au" })
    const { data: businessLocations, isLoading: isLoadingBusinessLocations, error: businessLocationsError } = useSearchLocations({ q: searchBusinessValue, country: "au" })
    const [defaultValue, setDefaultValue] = useState<SearchLocationsResponse | null>(null);
    const [businessValue, setBusinessValue] = useState<SearchLocationsResponse | null>(null);

    const states = useMemo(() => {
        return countryList?.data?.[0]?.states?.filter((item) => item.type === "state") || []
    },[countryList?.data])

    const vendorPersonalInfoForm = useForm({
        defaultValues: {
            first_name: "",
            last_name: "",
            home_address: "",
            home_state: "",
            home_city: "",
            home_zip: "",
            business_name: "",
            business_address_id: "",
            is_home_address: false,
            business_abn: "",
            year_exp: "",
            dish_list: [] as string[],
            gender: "",
            phone_number: "",
            email: "",
            password: "",
            terms: false
        },
        validators: {
            onSubmit: registerVendorFormSchema
        },
        onSubmit: async ({ value }) => {
            if (isRegistering) return;
            const { business_address_id, is_home_address, home_address, phone_number, ...rest } = value
            mutate({
                business_address_id: is_home_address ? defaultValue?.id as string : businessValue?.id as string,
                home_address: defaultValue?.name as string,
                is_home_address,
                phone_number: phone_number?.replace(/^\+/, ""),
                ...rest
            })
        },
    })

    const selectedValue = useStore(vendorPersonalInfoForm.store, (state) => state.values.home_address)
    const isHomeAddress = useStore(vendorPersonalInfoForm.store, (state) => state.values.is_home_address)
    const email = useStore(vendorPersonalInfoForm.store, (state) => state.values.email)

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

    function getBusinessStatus() {
        if (isLoadingBusinessLocations) {
            return (
                <Fragment><Spinner />Searching…</Fragment>
            );
        }

        if (businessLocationsError) {
            return <Fragment>An error occurred</Fragment>;
        }

        if (trimmedBusinessValue === '') {
            return selectedValue ? null : 'Start typing to search…';
        }

        if (businessLocations?.data.length === 0) {
            return `No matches for "${trimmedSearchValue}".`;
        }

        return null;
    }

    return (
        <>
            <form className="flex flex-col gap-12.5 w-full max-w-164.5 mx-auto" onSubmit={(e) => {
                e.preventDefault()
                vendorPersonalInfoForm.handleSubmit()
            }}>
                <div className="text-center space-y-3 w-full max-w-153 mx-auto">
                    <h1 className="font-sora text-grey-dark-0 font-extrabold text-3xl md:text-[2.5rem]">Join Our Culinary Team</h1>
                    <p className="text-grey-dark-3 font-normal text-sm">Become a Chafriq cook today! Share your passion for food and earn money doing what you love. Quick signup, flexible hours!</p>
                </div>
                <FieldSet>
                    <FieldLegend>Personal Information </FieldLegend>
                    <FieldGroup>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <vendorPersonalInfoForm.Field name="first_name">
                                {(field) => {
                                    const isInvalid = !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>First Name</FieldLabel>
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
                            </vendorPersonalInfoForm.Field>
                            <vendorPersonalInfoForm.Field name="last_name">
                                {(field) => {
                                    const isInvalid = !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
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
                            </vendorPersonalInfoForm.Field>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <vendorPersonalInfoForm.Field name="gender">
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
                            </vendorPersonalInfoForm.Field>
                            <vendorPersonalInfoForm.Field name="phone_number">
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
                            </vendorPersonalInfoForm.Field>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <vendorPersonalInfoForm.Field name="home_address">
                                {(field) => {
                                    const isInvalid = !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>Home Address</FieldLabel>
                                            <Combobox
                                                filter={null}
                                                items={data?.data || []}
                                                value={defaultValue}
                                                autoHighlight
                                                itemToStringLabel={(address: SearchLocationsResponse) => address.name}
                                                onValueChange={(value) => {
                                                    setDefaultValue(value);
                                                    setSearchValue('');
                                                }}
                                                onInputValueChange={(nextSearchValue, { reason }) => {
                                                    setSearchValue(nextSearchValue);

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
                            </vendorPersonalInfoForm.Field>
                            <vendorPersonalInfoForm.Field name="home_state">
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
                            </vendorPersonalInfoForm.Field>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <vendorPersonalInfoForm.Field name="home_city">
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
                            </vendorPersonalInfoForm.Field>
                            <vendorPersonalInfoForm.Field name="home_zip">
                                {(field) => {
                                    const isInvalid = !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>Postal code</FieldLabel>
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
                            </vendorPersonalInfoForm.Field>
                        </div>
                    </FieldGroup>
                </FieldSet>

                <FieldSet>
                    <FieldLegend>Business Information</FieldLegend>
                    <FieldGroup>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <vendorPersonalInfoForm.Field name="business_name">
                                {(field) => {
                                    const isInvalid = !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>Kitchen/Business Name (if any)</FieldLabel>
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
                            </vendorPersonalInfoForm.Field>
                            <vendorPersonalInfoForm.Field name="dish_list">
                                {(field) => {
                                    const isInvalid = !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>Type of Cuisine</FieldLabel>
                                            <Combobox
                                                multiple
                                                disabled={isLoadingDishList}
                                                items={dishList?.data || []}
                                                value={field.state.value}
                                                autoHighlight
                                                itemToStringLabel={(dish: string) => dish}
                                                onValueChange={(value) => {
                                                    field.handleChange(value);
                                                }}
                                                onInputValueChange={(nextSearchValue, { reason }) => {
                                                    setSearchValue(nextSearchValue);

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
                                            <ComboboxTrigger render={
                                                <button type="button" className="relative flex items-center justify-between h-12 text-left bg-input-field w-full rounded pl-3 pr-8.5 py-1 text-sm text-grey-dark-0 transition-colors inset-ring-1 inset-ring-outline data-popup-open:inset-ring-orange-2 data-popup-open:bg-orange-5 active:scale-99">
                                                    <ComboboxValue
                                                        placeholder={
                                                        <span className="text-left">
                                                            Select a cuisine
                                                        </span>
                                                        }
                                                    >
                                                        {(item: string[]) => (
                                                        <>
                                                            {item.length === 0 ? (
                                                            <span className="text-contrast-low">
                                                                Select a cuisine
                                                            </span>
                                                            ) : item.length > 1 ? (
                                                            <span className="line-clamp-1 text-ellipsis">{item.map((itm) => {
                                                                return dishList?.data?.find((dishItm) => dishItm.dish_type_id === itm)?.name
                                                            }).join(", ")}</span>
                                                            ) : (
                                                            <span className="line-clamp-1 text-ellipsis">{dishList?.data?.find((itm) => itm.dish_type_id === item[0])?.name}</span>
                                                            )}
                                                        </>
                                                        )}
                                                    </ComboboxValue>
                                                    <ChevronDownIcon className="absolute right-3 text-muted-foreground size-4 pointer-events-none" />
                                                </button>
                                            } />
                                            <ComboboxContent>
                                                <ComboboxEmpty>No data found</ComboboxEmpty>
                                                <ComboboxList>
                                                {(dish) => (
                                                    <ComboboxItem key={dish.dish_type_id} value={dish.dish_type_id}>
                                                    {dish.name}
                                                    </ComboboxItem>
                                                )}
                                                </ComboboxList>
                                            </ComboboxContent>
                                            </Combobox>
                                            {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                        </Field>
                                    )
                                }}
                            </vendorPersonalInfoForm.Field>
                        </div>
                        
                        <div className="space-y-2">
                            <vendorPersonalInfoForm.Field name="business_address_id">
                                {(field) => {
                                    const isInvalid = !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>Business location (This would be shown to customers) </FieldLabel>
                                            <Combobox
                                                filter={null}
                                                items={businessLocations?.data || []}
                                                value={businessValue}
                                                autoHighlight
                                                readOnly={isHomeAddress}
                                                itemToStringLabel={(address: SearchLocationsResponse) => address.name}
                                                onValueChange={(value) => {
                                                    setBusinessValue(value);
                                                    setSearchBusinessValue('');
                                                }}
                                                onInputValueChange={(nextSearchValue, { reason }) => {
                                                    setSearchBusinessValue(nextSearchValue);

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
                                                <ComboboxStatus>{getBusinessStatus()}</ComboboxStatus>
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
                            </vendorPersonalInfoForm.Field>
                            
                            <Activity mode={selectedValue ? "visible" : "hidden"}>
                                <vendorPersonalInfoForm.Field name="is_home_address">
                                    {(field) => {
                                        return (
                                            <div className="flex items-center space-x-1">
                                                <Checkbox
                                                    id={field.name}
                                                    checked={field.state.value}
                                                    onCheckedChange={(value) => {
                                                        field.handleChange(!!value)
                                                        if (value) {
                                                            vendorPersonalInfoForm.setFieldValue("business_address_id", (defaultValue as SearchLocationsResponse)?.name)
                                                            setBusinessValue(defaultValue)
                                                        } else {
                                                            vendorPersonalInfoForm.setFieldValue("business_address_id", "")
                                                            setBusinessValue(null)
                                                        }
                                                    }}
                                                    aria-label="Same as home address"
                                                />
                                                <label htmlFor={field.name} className="font-normal gap-1 text-xs text-grey-dark-3">
                                                    Same as home address
                                                </label>
                                            </div>
                                        )
                                    }}

                                </vendorPersonalInfoForm.Field>
                            </Activity>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <vendorPersonalInfoForm.Field name="year_exp">
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
                            </vendorPersonalInfoForm.Field>
                            <vendorPersonalInfoForm.Field name="business_abn">
                                {(field) => {
                                    const isInvalid = !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>ABN (Australia Business Number)</FieldLabel>
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
                            </vendorPersonalInfoForm.Field>
                        </div>
                    </FieldGroup>
                </FieldSet>

                <FieldSet>
                    <FieldLegend>Account Information</FieldLegend>
                    <FieldGroup>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <vendorPersonalInfoForm.Field name="email">
                                {(field) => {
                                    const isInvalid = !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
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
                            </vendorPersonalInfoForm.Field>
                            <vendorPersonalInfoForm.Field name="password">
                                {(field) => {
                                    const isInvalid = !field.state.meta.isValid
                                    return (
                                        <div className="grid gap-2">
                                            <Field data-invalid={isInvalid}>
                                                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                                <div className="relative">
                                                    <Input
                                                        type={showPassword ? "text" : "password"}
                                                        id={field.name}
                                                        name={field.name}
                                                        aria-invalid={isInvalid}
                                                        value={field.state.value}
                                                        onBlur={field.handleBlur}
                                                        onChange={(e) => field.handleChange(e.target.value)}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute inset-y-0 right-2 text-grey-dark-2 [&>svg]:size-4"
                                                    >
                                                        {showPassword ? <EyeOff /> : <Eye />}
                                                    </button>
                                                </div>
                                                {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                            </Field>
                                            <PasswordRules value={field.state.value} />
                                        </div>
                                    )
                                }}
                            </vendorPersonalInfoForm.Field>
                        </div>

                        <vendorPersonalInfoForm.Field name="terms">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <div className="flex items-center space-x-1">
                                            <Checkbox id={field.name} checked={field.state.value} onCheckedChange={(value) => field.handleChange(!!value)} aria-label="Terms and Conditions" />
                                            <label htmlFor={field.name} className="font-normal gap-1 text-xs text-grey-dark-3">
                                                By clicking signup, you confirm that you&apos;re +18yrs and agree to chafriq <Link href="/terms-and-conditions" className="underline underline-offset-1 text-orange-2">terms & condition</Link>
                                            </label>
                                        </div>
                                        {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                    </Field>
                                )
                            }}
                        </vendorPersonalInfoForm.Field>
                    </FieldGroup>
                </FieldSet>

                <div className="flex flex-col items-center gap-5">
                    <Button type="submit" disabled={isRegistering}>Verify Email</Button>
                    <p className="text-sm text-grey-dark-3">Already have an account? <Link href="/vendor/login" className="font-medium text-grey-dark-0 hover:underline hover:underline-offset-1">Sign in instead</Link></p>
                </div>
            </form>
            <VerifyEmailOnRegisterDialog
                open={open}
                email={email}
                setOpen={setOpen}
            />
        </>
    )
}