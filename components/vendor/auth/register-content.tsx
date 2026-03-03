"use client";

import { useState } from "react"
import { AnimatePresence } from "motion/react"
import { useForm } from "@tanstack/react-form-nextjs"
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Steps = "personal-information" | "other-information"

export const VendorRegisterContent = () => {
    const [step, setStep] = useState<Steps>("personal-information")

    return (
        <AnimatePresence>
        {
            step === "personal-information" ? (
                <PersonalInformation />
            ) : null
        }
        </AnimatePresence>
    )
}

const PersonalInformation = () => {

    const vendorPersonalInfoForm = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            phone: "",
            gender: "",
            address: "",
            state: "",
            city: "",
            zip: "",
            businessName: "",
            cuisineType: "",
            businessLocation: "",
            yearExp: "",
            abn: "",
            email: "",
            password: "",
            terms: false
        },
        validators: {
            // onSubmit: loginFormSchema
        },
        onSubmit: async ({ value }) => {
            console.log(value)
        },
    })
    
    return (
        <form className="flex flex-col gap-12.5 w-full max-w-164.5 mx-auto" onSubmit={(e) => {
            e.preventDefault()
            vendorPersonalInfoForm.handleSubmit()
        }}>
            <div className="text-center space-y-3 w-full max-w-153 mx-auto">
                <h1 className="font-sora text-grey-dark-0 font-extrabold text-3xl md:text-[2.5rem]">Join Our Culinary Team</h1>
                <p className="text-grey-dark-3 font-normal text-sm">Become a Chafiq cook today! Share your passion for food and earn money doing what you love. Quick signup, flexible hours!</p>
            </div>
            <FieldSet>
                <FieldLegend>Personal Info</FieldLegend>
                <FieldGroup>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <vendorPersonalInfoForm.Field name="firstName">
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
                        <vendorPersonalInfoForm.Field name="lastName">
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
                                        <FieldLabel htmlFor={field.name}>Gender (optional)</FieldLabel>
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
                        <vendorPersonalInfoForm.Field name="phone">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
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
                        <vendorPersonalInfoForm.Field name="address">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Home Address</FieldLabel>
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
                        <vendorPersonalInfoForm.Field name="state">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>State</FieldLabel>
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
                        <vendorPersonalInfoForm.Field name="city">
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
                        <vendorPersonalInfoForm.Field name="zip">
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
                        </vendorPersonalInfoForm.Field>
                    </div>
                </FieldGroup>
            </FieldSet>

            <FieldSet>
                <FieldLegend>Business Information</FieldLegend>
                <FieldGroup>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <vendorPersonalInfoForm.Field name="businessName">
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
                        <vendorPersonalInfoForm.Field name="cuisineType">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Type of Cuisine</FieldLabel>
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

                    <vendorPersonalInfoForm.Field name="businessLocation">
                        {(field) => {
                            const isInvalid = !field.state.meta.isValid
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>Business location (This would be shown to customers) </FieldLabel>
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <vendorPersonalInfoForm.Field name="yearExp">
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
                        </vendorPersonalInfoForm.Field>
                        <vendorPersonalInfoForm.Field name="abn">
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
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
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
                <Button type="submit">Verify Email</Button>
                <p className="text-sm text-grey-dark-3">Already have an account? <Link href="/vendor/login" className="font-medium text-grey-dark-0 hover:underline hover:underline-offset-1">Sign in instead</Link></p>
            </div>
        </form>
    )
}