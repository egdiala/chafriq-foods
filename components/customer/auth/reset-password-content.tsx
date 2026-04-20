"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form-nextjs";
import { useUserAuth } from "@/context/use-user-auth";
import { useResetPasswordCustomer } from "@/services/mutations/use-auth";
import { resetPasswordCustomerFormSchema } from "@/validations/customer-auth";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";

export const CustomerResetPasswordContent = () => {
    const { email, otp_code } = useUserAuth()
    const [showPassword, setShowPassword] = useState(false)
    const { mutate, isPending } = useResetPasswordCustomer()

    const customerForgotPasswordForm = useForm({
        defaultValues: {
            email: email,
            otp_code: otp_code,
            new_password: "",
            confirm_new_password: ""
        },
        validators: {
            onSubmit: resetPasswordCustomerFormSchema
        },
        onSubmit: async ({ value }) => {
            if (isPending) return;
            mutate(value)
        },
    })
    
    return (
        <form className="flex flex-col gap-12.5 w-full max-w-100.5 mx-auto" onSubmit={(e) => {
            e.preventDefault()
            customerForgotPasswordForm.handleSubmit()
        }}>
            <div className="text-center space-y-3 w-full max-w-153 mx-auto">
                <h1 className="font-sora text-grey-dark-0 font-extrabold text-3xl md:text-[2.5rem]">Reset Password</h1>
            </div>

            <FieldGroup>
                <customerForgotPasswordForm.Field name="new_password">
                    {(field) => {
                        const isInvalid = !field.state.meta.isValid
                        return (
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
                        )
                    }}
                </customerForgotPasswordForm.Field>

                <customerForgotPasswordForm.Field name="confirm_new_password">
                    {(field) => {
                        const isInvalid = !field.state.meta.isValid
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                                <Input
                                    type="password"
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
            </FieldGroup>

            <div className="flex flex-col items-center gap-5">
                <Button type="submit">Reset Password</Button>
            </div>
        </form>
    )
}