"use client";

import Link from "next/link"
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form-nextjs";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { ForgotPasswordOtpDialog } from "./forgot-password-otp-dialog";
import { forgotPasswordCustomerFormSchema } from "@/validations/customer-auth";
import { useForgotPasswordCustomer } from "@/services/mutations/use-auth";
import { Spinner } from "@/components/ui/spinner";
import { useUserAuth } from "@/context/use-user-auth";

export const CustomerForgotPasswordContent = () => {
    const { clearAll } = useUserAuth()
    const [open, setOpen] = useState(false)
    const { mutate, isPending } = useForgotPasswordCustomer(() => {
        setOpen(true)
    })

    const customerForgotPasswordForm = useForm({
        defaultValues: {
            email: "",
        },
        validators: {
            onSubmit: forgotPasswordCustomerFormSchema
        },
        onSubmit: async ({ value }) => {
            if (isPending) return;
            mutate(value)
        },
    })

    useEffect(() => {
        clearAll()
    },[])
    
    return (
        <>
            <form className="flex flex-col gap-12.5 w-full max-w-100.5 mx-auto" onSubmit={(e) => {
                e.preventDefault()
                customerForgotPasswordForm.handleSubmit()
            }}>
                <div className="text-center space-y-3 w-full max-w-153 mx-auto">
                    <h1 className="font-sora text-grey-dark-0 font-extrabold text-3xl md:text-[2.5rem]">Enter your Email</h1>
                    <div className="flex flex-col gap-1 text-sm text-grey-dark-3">
                        Please enter the email associated with your account
                        <Link href="/customer/login" className="font-medium text-grey-dark-0 hover:underline hover:underline-offset-1">Sign in instead</Link>
                    </div>
                </div>

                <customerForgotPasswordForm.Field name="email">
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
                </customerForgotPasswordForm.Field>

                <div className="flex flex-col items-center gap-5">      
                    <customerForgotPasswordForm.Subscribe selector={(state) => [state.canSubmit]}>
                        {([canSubmit]) => {
                            return (
                                <Button type="submit" disabled={!canSubmit || isPending}>
                                    Verify Email
                                    {(isPending) && (<Spinner />)}
                                </Button>
                            )
                        }}
                    </customerForgotPasswordForm.Subscribe>
                </div>
            </form>

            <ForgotPasswordOtpDialog
                open={open}
                email={customerForgotPasswordForm.getFieldValue("email")}
                setOpen={setOpen}
            />
        </>
    )
}