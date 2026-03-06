"use client";

import Link from "next/link"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form-nextjs";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { ForgotPasswordOtpDialog } from "./forgot-password-otp-dialog";

export const VendorForgotPasswordContent = () => {
    const [open, setOpen] = useState(false)

    const vendorForgotPasswordForm = useForm({
        defaultValues: {
            email: "",
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
            <form className="flex flex-col gap-12.5 w-full max-w-100.5 mx-auto" onSubmit={(e) => {
                e.preventDefault()
                vendorForgotPasswordForm.handleSubmit()
            }}>
                <div className="text-center space-y-3 w-full max-w-153 mx-auto">
                    <h1 className="font-sora text-grey-dark-0 font-extrabold text-3xl md:text-[2.5rem]">Enter your Email</h1>
                    <div className="flex flex-col gap-1 text-sm text-grey-dark-3">
                        Please enter the email associated with your account
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
                    <Button type="submit">Verify Email</Button>
                </div>
            </form>

            <ForgotPasswordOtpDialog
                open={open}
                setOpen={setOpen}
            />
        </>
    )
}