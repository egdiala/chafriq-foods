"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "@tanstack/react-form-nextjs";
import { useLoginVendor } from "@/services/mutations/use-auth";
import { loginVendorFormSchema } from "@/validations/vendor-auth";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export const VendorLoginContent = () => {
    const { mutate, isPending } = useLoginVendor()
    const [showPassword, setShowPassword] = useState(false)

    const vendorLoginForm = useForm({
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        validators: {
            onSubmit: loginVendorFormSchema
        },
        onSubmit: async ({ value }) => {
            if (isPending) return;
            mutate(value)
        },
    })
    
    return (
        <form className="flex flex-col gap-12.5 w-full max-w-100.5 mx-auto" onSubmit={(e) => {
            e.preventDefault()
            vendorLoginForm.handleSubmit()
        }}>
            <div className="text-center space-y-3 w-full max-w-153 mx-auto">
                <h1 className="font-sora text-grey-dark-0 font-extrabold text-3xl md:text-[2.5rem]">Sign in</h1>
                <p className="text-sm text-grey-dark-3">Don’t have an account? <Link href="/vendor/register" className="font-medium text-grey-dark-0 hover:underline hover:underline-offset-1">Signup</Link></p>
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
                </vendorLoginForm.Field>

                <vendorLoginForm.Field name="rememberMe">
                    {(field) => {
                        const isInvalid = !field.state.meta.isValid
                        return (
                            <div className="flex items-center justify-between">
                                <Field data-invalid={isInvalid}>
                                    <div className="flex items-center space-x-1">
                                        <Checkbox id={field.name} checked={field.state.value} onCheckedChange={(value) => field.handleChange(!!value)} aria-label="Terms and Conditions" />
                                        <label htmlFor={field.name} className="font-medium gap-1 text-xs text-grey-dark-2">
                                            Remember me
                                        </label>
                                    </div>
                                    {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                </Field>
                                <Link href="/vendor/forgot-password" className="shrink-0 font-medium text-sm text-grey-dark-0 hover:underline hover:underline-offset-1">
                                    Forgotten Password?
                                </Link>
                            </div>
                        )
                    }}
                </vendorLoginForm.Field>
            </FieldGroup>

            <div className="flex flex-col items-center gap-5">
                <Button type="submit" disabled={isPending}>
                    Sign in
                    {(isPending) && (<Spinner />)}
                </Button>
                <p className="text-xs text-grey-dark-3 text-center">By clicking Sign in you agree to the terms and conditions of using this service</p>
            </div>
        </form>
    )
}