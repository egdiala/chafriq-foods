"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form-nextjs";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";

export const CustomerResetPasswordContent = () => {

    const customerForgotPasswordForm = useForm({
        defaultValues: {
            password: "",
            confirmPassword: ""
        },
        validators: {
            // onSubmit: loginFormSchema
        },
        onSubmit: async ({ value }) => {
            console.log(value)
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
                <customerForgotPasswordForm.Field name="password">
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
                </customerForgotPasswordForm.Field>

                <customerForgotPasswordForm.Field name="confirmPassword">
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