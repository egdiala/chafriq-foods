
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "@tanstack/react-form-nextjs";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useChangeVendorPassword } from "@/services/mutations/use-account";
import { changePasswordVendorFormSchema } from "@/validations/vendor-account";
import { Dialog, DialogTitle, DialogHeader, DialogContent, DialogFooter, DialogClose } from "@/components/ui/dialog";

type Props = {
    open: boolean;
    setOpen: (v: boolean) => void;
}

export const ChangePassword = ({ open, setOpen }: Props) => {
    const [showPassword, setShowPassword] = useState(false)
    
    const changePasswordForm = useForm({
        defaultValues: {
            old_password: "",
            new_password: "",
            confirm_new_password: ""
        },
        validators: {
            onSubmit: changePasswordVendorFormSchema
        },
        onSubmit: async ({ value }) => {
            mutate(value)
        },
    })

    const closeDialog = (v: boolean) => {
        setOpen(v)
        changePasswordForm.reset()
    }

    const { mutate, isPending } = useChangeVendorPassword(() => closeDialog(false))
    
    return (
        <Dialog open={open} onOpenChange={closeDialog}>
            <DialogContent className="gap-5 sm:max-w-125" showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Reset Password</DialogTitle>
                </DialogHeader>
                <form id="change-password-form" onSubmit={(e) => {
                    e.preventDefault()
                    changePasswordForm.handleSubmit()
                }}>
                    <FieldGroup>
                        <changePasswordForm.Field name="old_password">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Old Password</FieldLabel>
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
                        </changePasswordForm.Field>
                        <changePasswordForm.Field name="new_password">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
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
                        </changePasswordForm.Field>
                        <changePasswordForm.Field name="confirm_new_password">
                            {(field) => {
                                const isInvalid = !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Confirm New Password</FieldLabel>
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
                        </changePasswordForm.Field>
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
                                    Update
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