"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useForm } from "@tanstack/react-form-nextjs"
import { Field, FieldError } from "@/components/ui/field"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useCountdown } from "@/hooks/use-countdown";
import { useConfirmOtpCustomer, useForgotPasswordCustomer } from "@/services/mutations/use-auth";
import { useEffect } from "react";
import { confirmOtpCustomerFormSchema } from "@/validations/customer-auth";
import { useRouter } from "next/navigation";

type Props = {
    open: boolean;
    email: string;
    setOpen: (v: boolean) => void;
}

export const ForgotPasswordOtpDialog = ({ open, email, setOpen }: Props) => {
    const router = useRouter()
    const { mutate, isPending: isResending } = useForgotPasswordCustomer()
    const { seconds, isFinished, start, reset } = useCountdown({
        initialSeconds: 30,
    });
    const { mutate: verifyOtp, isPending } = useConfirmOtpCustomer(() => {
        setOpen(false)
        router.push("/customer/reset-password")
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
            onSubmit: confirmOtpCustomerFormSchema
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
