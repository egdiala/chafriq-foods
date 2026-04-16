"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCountdown } from "@/hooks/use-countdown";
import { useForm } from "@tanstack/react-form-nextjs";
import { Field, FieldError } from "@/components/ui/field";
import { confirmOtpVendorFormSchema } from "@/validations/vendor-auth";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useConfirmOtpVendor, useForgotPasswordVendor } from "@/services/mutations/use-auth";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Props = {
    open: boolean;
    email: string;
    setOpen: (v: boolean) => void;
}

export const ForgotPasswordOtpDialog = ({ email, open, setOpen }: Props) => {
    const { mutate, isPending: isResending } = useForgotPasswordVendor()
    const { seconds, isFinished, start, reset } = useCountdown({
        initialSeconds: 30,
    });
    const { mutate: verifyOtp, isPending } = useConfirmOtpVendor(() => {
        setOpen(false)
    })

    const verifyEmailForm = useForm({
        defaultValues: {
            email: email,
            otp_code: ""
        },
        listeners: {
            onChange: ({ formApi }) => {
                const otpCode = formApi.getFieldValue("otp_code")
                if (otpCode && (otpCode.length === 4)) {
                    formApi.handleSubmit()
                }
            },
        },
        validators: {
            onSubmit: confirmOtpVendorFormSchema
        },
        onSubmit: async ({ value }) => {
            if (isPending) return;
            verifyOtp({ ...value })
        },
    })

    useEffect(() => {
        if (open) {
            reset(30);
            start();
        }
    }, [open]);

    const handleResend = () => {
        if (!isFinished || isResending) return;

        mutate({ email });
        reset(30);
        start();
    };

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
                            Enter the code sent to {email}
                        </DialogDescription>
                    </DialogHeader>
                    <verifyEmailForm.Field name="otp_code">
                        {(field) => {
                            const isInvalid = !field.state.meta.isValid
                            return (
                                <Field className="mb-6" data-invalid={isInvalid}>
                                    <InputOTP id={field.name} name={field.name} value={field.state.value} onBlur={field.handleBlur} maxLength={4} onChange={field.handleChange}>
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
                                    </InputOTP>
                                    {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                </Field>
                            )
                        }}
                    </verifyEmailForm.Field>
                    <DialogFooter className="gap-4">
                        <div className="flex items-center justify-center gap-1 text-sm text-grey-dark-3">Already have an account? <Link href="/vendor/login" className="font-medium text-grey-dark-0 hover:underline hover:underline-offset-1">Sign in instead</Link></div>
                        <Button type="button" className="w-full" disabled={isResending || seconds > 0} onClick={handleResend}>
                            {isResending ? "Sending..." : seconds > 0 ? `Resend Code in ${seconds}s` : "Resend Code"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
