import { Button } from "@/components/ui/button";
import { Dialog, DialogTitle, DialogDescription, DialogHeader, DialogContent, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useForm } from "@tanstack/react-form-nextjs";
import { useMemo, useState } from "react";

type Props = {
    open: boolean;
    setOpen: (v: boolean) => void;
}

export const DeleteAccount = ({ open, setOpen }: Props) => {
    const [step, setStep] = useState<"verify" | "password">("password")

    const content = useMemo(() => {
        switch (step) {
            case "verify":
                return <VerifyStep />;
            default:
                return <PasswordStep onComplete={setStep} />;
        }
    }, [step])
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="gap-5 sm:max-w-125" showCloseButton={step !== "password"}>
                {content}
            </DialogContent>
        </Dialog>
    )
}

const PasswordStep = ({ onComplete }: { onComplete: (value: "verify" | "password") => void; }) => {
    const deleteAccountForm = useForm({
        defaultValues: {
            password: "",
        },
        validators: {
            // onSubmit: loginFormSchema
        },
        onSubmit: async ({ value }) => {
            onComplete("verify")
        },
    })
    return (
        <>
            <DialogHeader>
                <DialogTitle>Delete your account</DialogTitle>
                <DialogDescription>
                    This action will delete your  account and this is irreversible
                </DialogDescription>
            </DialogHeader>
            <form id="delete-password-form" onSubmit={(e) => {
                e.preventDefault()
                deleteAccountForm.handleSubmit()
            }}>
                <deleteAccountForm.Field name="password">
                    {(field) => {
                        const isInvalid = !field.state.meta.isValid
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>Current Password</FieldLabel>
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
                </deleteAccountForm.Field>
            </form>
            <DialogFooter className="flex-row sm:justify-start [&>button]:flex-1">
                <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type="submit" form="delete-password-form">Continue</Button>
            </DialogFooter>
        </>
    )
}

const VerifyStep = () => {

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
        },
    })
    return (
        <>
            <DialogHeader>
                <DialogTitle>Verify Your Email</DialogTitle>
                <DialogDescription>
                    Enter the code sent to am *** **n@gmail.com
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={(e) => {
                e.preventDefault()
                verifyEmailForm.handleSubmit()
            }}>
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
            </form>
            <DialogFooter className="flex-row sm:justify-start [&>button]:flex-1">
                <Button type="button">Resend Code in 28s</Button>
            </DialogFooter>
        </>
    )
}