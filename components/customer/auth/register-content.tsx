"use client";

import { useState } from "react"
import { AnimatePresence } from "motion/react"
import { useForm } from "@tanstack/react-form-nextjs"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { VerifyEmailOnRegisterDialog } from "./verify-email-on-register-dialog";


export const CustomerRegisterContent = () => {

    return (
        <AnimatePresence>
            <PersonalInformation />
        </AnimatePresence>
    )
}

const PersonalInformation = () => {
    const [open, setOpen] = useState(false)

    const customerPersonalInfoForm = useForm({
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            password: "",
            terms: false
        },
        validators: {
            // onSubmit: loginFormSchema
        },
        onSubmit: async ({ value }) => {
            console.log(value)
            setOpen(true)
        },
    })
    
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
                        <customerPersonalInfoForm.Field name="fullName">
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
                        <customerPersonalInfoForm.Field name="phone">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Phone (optional)</FieldLabel>
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
                        <customerPersonalInfoForm.Field name="password">
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
                    <Button type="submit">Verify Email</Button>
                    <p className="text-sm text-grey-dark-3">Already have an account? <Link href="/customer/login" className="font-medium text-grey-dark-0 hover:underline hover:underline-offset-1">Sign in instead</Link></p>
                </div>
            </form>
            <VerifyEmailOnRegisterDialog
                open={open}
                setOpen={setOpen}
            />
        </>
    )
}