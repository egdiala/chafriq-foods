"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form-nextjs";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useResetPasswordVendor } from "@/services/mutations/use-auth";
import { resetPasswordVendorFormSchema } from "@/validations/vendor-auth";
import { useUserAuth } from "@/context/use-user-auth";

export const VendorResetPasswordContent = () => {
    const { email, otp_code } = useUserAuth()
    const { mutate, isPending } = useResetPasswordVendor()
    
    const vendorForgotPasswordForm = useForm({
        defaultValues: {
            email: email,
            otp_code: otp_code,
            new_password: "",
            confirm_new_password: ""
        },
        validators: {
            onSubmit: resetPasswordVendorFormSchema
        },
        onSubmit: async ({ value }) => {
            if (isPending) return;
            mutate(value)
        },
    })
    
    return (
        <form className="flex flex-col gap-12.5 w-full max-w-100.5 mx-auto" onSubmit={(e) => {
            e.preventDefault()
            vendorForgotPasswordForm.handleSubmit()
        }}>
            <div className="text-center space-y-3 w-full max-w-153 mx-auto">
                <h1 className="font-sora text-grey-dark-0 font-extrabold text-3xl md:text-[2.5rem]">Reset Password</h1>
            </div>

            <FieldGroup>
                <vendorForgotPasswordForm.Field name="new_password">
                    {(field) => {
                        const isInvalid = !field.state.meta.isValid
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
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
                </vendorForgotPasswordForm.Field>

                <vendorForgotPasswordForm.Field name="confirm_new_password">
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
                </vendorForgotPasswordForm.Field>
            </FieldGroup>

            <div className="flex flex-col items-center gap-5">
                <Button type="submit" disabled={isPending}>Reset Password</Button>
            </div>
        </form>
    )
}