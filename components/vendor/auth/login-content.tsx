"use client";

import Link from "next/link"
import { useForm } from "@tanstack/react-form-nextjs"
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export const VendorLoginContent = () => {

    const vendorLoginForm = useForm({
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false
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
            vendorLoginForm.handleSubmit()
        }}>
            <div className="text-center space-y-3 w-full max-w-153 mx-auto">
                <h1 className="font-sora text-grey-dark-0 font-extrabold text-3xl md:text-[2.5rem]">Sign in</h1>
                <p className="text-sm text-grey-dark-3">Don’t have an account? <Link href="/vendor/register" className="font-medium text-grey-dark-0 hover:underline hover:underline-offset-1">Sign up instead</Link></p>
            </div>

            <FieldGroup>
                <vendorLoginForm.Field name="email">
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
                </vendorLoginForm.Field>
                
                <vendorLoginForm.Field name="password">
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
                </vendorLoginForm.Field>

                <vendorLoginForm.Field name="rememberMe">
                    {(field) => {
                        const isInvalid = !field.state.meta.isValid
                        return (
                            <Field data-invalid={isInvalid}>
                                <div className="flex items-center space-x-1">
                                    <Checkbox id={field.name} checked={field.state.value} onCheckedChange={(value) => field.handleChange(!!value)} aria-label="Terms and Conditions" />
                                    <label htmlFor={field.name} className="font-medium gap-1 text-xs text-grey-dark-2">
                                        Remember me
                                    </label>
                                </div>
                                {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                            </Field>
                        )
                    }}
                </vendorLoginForm.Field>
            </FieldGroup>

            <div className="flex flex-col items-center gap-5">
                <Button type="submit">Sign in</Button>
                <Link href="/vendor/login" className="font-medium text-sm text-grey-dark-0 hover:underline hover:underline-offset-1">Reset Password</Link>
                <p className="text-xs text-grey-dark-3 text-center">By clicking Sign in you agree to the terms and conditions of using this service</p>
            </div>
        </form>
    )
}