"use client";

import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm, useStore } from "@tanstack/react-form-nextjs";
import { PhoneInput } from "@/components/ui/phone-input";
import { registerCustomerFormSchema } from "@/validations/customer-auth";
import { VerifyEmailOnRegisterDialog } from "./verify-email-on-register-dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useRegisterCustomer } from "@/services/mutations/use-auth";
import { Eye, EyeOff } from "lucide-react";
import { PasswordRules } from "@/components/password-rules";


export const CustomerRegisterContent = () => {

    return (
        <AnimatePresence>
            <PersonalInformation />
        </AnimatePresence>
    )
}

const PersonalInformation = () => {
    const [open, setOpen] = useState(false)
    const { mutate, isPending } = useRegisterCustomer(() => setOpen(true))
    const [showPassword, setShowPassword] = useState(false)

    const customerPersonalInfoForm = useForm({
        defaultValues: {
            full_name: "",
            email: "",
            phone_number: "",
            password: "",
            terms: false
        },
        validators: {
            onSubmit: registerCustomerFormSchema
        },
        onSubmit: async ({ value }) => {
            if (isPending) return;
            const { phone_number, ...payload } = value;
            mutate({
                phone_number: phone_number?.replace(/^\+/, ""),
                ...payload
            })
        },
    })

    const email = useStore(customerPersonalInfoForm.store, (state) => state.values.email)
    
    return (
        <>
            <form className="flex flex-col gap-12.5 w-full max-w-164.5 mx-auto" onSubmit={(e) => {
                e.preventDefault()
                customerPersonalInfoForm.handleSubmit()
            }}>
                <div className="text-center space-y-3 w-full max-w-153 mx-auto">
                    <h1 className="font-sora text-grey-dark-0 font-extrabold text-3xl md:text-[2.5rem]">Get Started</h1>
                    <p className="text-grey-dark-3 font-normal text-sm">Join Chafriq today and discover authentic homemade meals from cooks in your community. Signing up is fast and free!</p>
                </div>

                <FieldGroup>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <customerPersonalInfoForm.Field name="full_name">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
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
                        </customerPersonalInfoForm.Field>
                        <customerPersonalInfoForm.Field name="email">
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
                        </customerPersonalInfoForm.Field>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <customerPersonalInfoForm.Field name="phone_number">
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
                        </customerPersonalInfoForm.Field>
                        <customerPersonalInfoForm.Field name="password">
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
                        </customerPersonalInfoForm.Field>
                    </div>

                    <customerPersonalInfoForm.Field name="terms">
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
                    </customerPersonalInfoForm.Field>
                </FieldGroup>

                <div className="flex flex-col items-center gap-5">
                    <Button type="submit" disabled={isPending}>Signup</Button>
                    <p className="text-sm text-grey-dark-3">Already have an account? <Link href="/customer/login" className="font-medium text-grey-dark-0 hover:underline hover:underline-offset-1">Sign in instead</Link></p>
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