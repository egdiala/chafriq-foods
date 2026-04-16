
import { Activity, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "@tanstack/react-form-nextjs";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useUpdateCustomerProfile } from "@/services/mutations/use-account";
import { Dialog, DialogTitle, DialogHeader, DialogContent, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { changeEmailFormSchema } from "@/validations/customer-account";

type Props = {
    open: boolean;
    setOpen: (v: boolean) => void;
}

export const ChangeEmail = ({ open, setOpen }: Props) => {
    const [showOtp, setShowOtp] = useState(false)
    
    const changePasswordForm = useForm({
        defaultValues: {
            email: "",
            shouldSendOtp: true,
            email_otp: ""
        },
        validators: {
            onSubmit: changeEmailFormSchema
        },
        onSubmit: async ({ value }) => {
            const { email, email_otp } = value;
            if (!email_otp) {
                mutate({ email })
            } else {
               mutate({ email_otp }) 
            }
        },
    })

    const closeDialog = (v: boolean) => {
        setOpen(v)
        changePasswordForm.reset()
    }

    const { mutate, isPending, variables } = useUpdateCustomerProfile(() => {
        if (!variables?.email_otp) {
            setShowOtp(true)
        } else {
            closeDialog(false)
        }
    })
    
    return (
        <Dialog open={open} onOpenChange={closeDialog}>
            <DialogContent className="gap-5 sm:max-w-125" showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Change Email</DialogTitle>
                </DialogHeader>
                <form id="change-password-form" onSubmit={(e) => {
                    e.preventDefault()
                    changePasswordForm.handleSubmit()
                }}>
                    <FieldGroup>
                        <Activity mode={!showOtp ? "visible" : "hidden"}>
                            <changePasswordForm.Field name="email">
                                {(field) => {
                                    const isInvalid = !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>New Email Address</FieldLabel>
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
                            </changePasswordForm.Field>
                        </Activity>

                        <Activity mode={showOtp ? "visible" : "hidden"}>
                            <changePasswordForm.Field name="email_otp">
                                {(field) => {
                                    const isInvalid = !field.state.meta.isValid
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor={field.name}>OTP Code</FieldLabel>
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
                            </changePasswordForm.Field>
                        </Activity>
                    </FieldGroup>
                </form>
                <DialogFooter className="flex-row sm:justify-start [&>button]:flex-1">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <changePasswordForm.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => {
                            return (
                                <Button type="submit" form="change-password-form" disabled={!canSubmit || isSubmitting || isPending}>
                                    {showOtp ? "Update" : "Verify"}
                                    {(isPending || isSubmitting) && (<Spinner className="absolute right-4 size-5" />)}
                                </Button>
                            )
                        }}
                    </changePasswordForm.Subscribe>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}