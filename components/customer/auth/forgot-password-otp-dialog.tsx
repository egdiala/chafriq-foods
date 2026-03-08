"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useForm } from "@tanstack/react-form-nextjs"
import { Field, FieldError } from "@/components/ui/field"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Props = {
    open: boolean;
    setOpen: (v: boolean) => void;
}

export const ForgotPasswordOtpDialog = ({ open, setOpen }: Props) => {

    const verifyEmailForm = useForm({
        defaultValues: {
            code: ""
        },
        listeners: {
            onChange: ({ formApi }) => {
                const otpCode = formApi.getFieldValue("code")
                if (otpCode && (otpCode.length === 6)) {
                    formApi.handleSubmit()
                }
            },
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
        <Dialog open={open} onOpenChange={setOpen}>
            <form onSubmit={(e) => {
                e.preventDefault()
                verifyEmailForm.handleSubmit()
            }}>
                <DialogContent className="sm:max-w-125">
                    <DialogHeader>
                        <DialogTitle>Verify Your Email</DialogTitle>
                        <DialogDescription>
                            Enter the code sent to am *** **n@gmail.com
                        </DialogDescription>
                    </DialogHeader>
                    <verifyEmailForm.Field name="code">
                        {(field) => {
                            const isInvalid = !field.state.meta.isValid
                            return (
                                <Field className="mb-6" data-invalid={isInvalid}>
                                    <InputOTP id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} maxLength={6} onChange={field.handleChange}>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                        </InputOTPGroup>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={1} />
                                        </InputOTPGroup>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={2} />
                                        </InputOTPGroup>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={3} />
                                        </InputOTPGroup>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={4} />
                                        </InputOTPGroup>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                    {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                </Field>
                            )
                        }}
                    </verifyEmailForm.Field>
                    <DialogFooter className="gap-4">
                        <div className="flex items-center justify-center gap-1 text-sm text-grey-dark-3">Already have an account? <Link href="/vendor/login" className="font-medium text-grey-dark-0 hover:underline hover:underline-offset-1">Sign in instead</Link></div>
                        <Button type="submit" className="w-full">Resend Code in 28s</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
