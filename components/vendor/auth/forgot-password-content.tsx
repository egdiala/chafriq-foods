"use client";

import Link from "next/link"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form-nextjs";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { ForgotPasswordOtpDialog } from "./forgot-password-otp-dialog";
import { useForgotPasswordVendor } from "@/services/mutations/use-auth";
import { forgotPasswordVendorFormSchema } from "@/validations/vendor-auth";

export const VendorForgotPasswordContent = () => {
    const [open, setOpen] = useState(false)
    const { mutate, isPending } = useForgotPasswordVendor(() => {
        setOpen(true)
    })

    const vendorForgotPasswordForm = useForm({
        defaultValues: {
            email: "",
        },
        validators: {
            onSubmit: forgotPasswordVendorFormSchema
        },
        onSubmit: async ({ value }) => {
            if (isPending) return;
            mutate(value)
        },
    })
    
    return (
        <>
            <form className="flex flex-col gap-12.5 w-full max-w-100.5 mx-auto" onSubmit={(e) => {
                e.preventDefault()
                vendorForgotPasswordForm.handleSubmit()
            }}>
                <div className="text-center space-y-3 w-full max-w-153 mx-auto">
                    <h1 className="font-sora text-grey-dark-0 font-extrabold text-3xl md:text-[2.5rem]">Forgot Password</h1>
                    <div className="flex flex-col gap-1 text-sm text-grey-dark-3">
                        Enter the email linked to your account, and we’ll send you a code to help you create a new password.
                        <Link href="/vendor/login" className="font-medium text-grey-dark-0 hover:underline hover:underline-offset-1">Sign in instead</Link>
                    </div>
                </div>

                <vendorForgotPasswordForm.Field name="email">
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
                </vendorForgotPasswordForm.Field>

                <div className="flex flex-col items-center gap-5">
                    <Button type="submit" disabled={isPending}>Verify Email</Button>
                </div>
            </form>

            <ForgotPasswordOtpDialog
                open={open}
                email={vendorForgotPasswordForm.getFieldValue("email")}
                setOpen={setOpen}
            />
        </>
    )
}