
import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "@tanstack/react-form-nextjs";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { deleteVendorFormSchema } from "@/validations/vendor-account";
import { useDeleteVendorProfile } from "@/services/mutations/use-account";
import { Dialog, DialogTitle, DialogDescription, DialogHeader, DialogContent, DialogFooter, DialogClose } from "@/components/ui/dialog";

type Props = {
    open: boolean;
    setOpen: (v: boolean) => void;
}

export const DeleteAccount = ({ open, setOpen }: Props) => {
    const [showPassword, setShowPassword] = useState(false)
    
    const deleteAccountForm = useForm({
        defaultValues: {
            password: "",
        },
        validators: {
            onSubmit: deleteVendorFormSchema
        },
        onSubmit: async ({ value }) => {
            mutate(value)
        },
    })

    const closeDialog = (v: boolean) => {
        setOpen(v)
        deleteAccountForm.reset()
    }

    const { mutate, isPending } = useDeleteVendorProfile(() => closeDialog(false))
    
    return (
        <Dialog open={open} onOpenChange={closeDialog}>
            <DialogContent className="gap-5 sm:max-w-125" showCloseButton={false}>
                <div className="relative size-14">
                    <Image src="/caution.gif" alt="caution" fill />
                </div>
                <DialogHeader>
                    <DialogTitle>Delete your account</DialogTitle>
                    <DialogDescription>
                        Deleting your account is permanent; your account will be deleted after 7 days. You can cancel anytime within this period by logging in. After 7 days, all your data will be permanently removed and cannot be recovered.
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
                    </deleteAccountForm.Field>
                </form>
                <DialogFooter className="flex-row sm:justify-start [&>button]:flex-1">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <deleteAccountForm.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => {
                            return (
                                <Button type="submit" form="delete-password-form" disabled={!canSubmit || isSubmitting || isPending}>
                                    Delete
                                    {(isPending || isSubmitting) && (<Spinner className="absolute right-4 size-5" />)}
                                </Button>
                            )
                        }}
                    </deleteAccountForm.Subscribe>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}