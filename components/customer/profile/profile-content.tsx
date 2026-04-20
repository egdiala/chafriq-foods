"use client";

import { IconLock, IconPencilSimple, IconTrashSimple } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useUser } from "@/context/use-user";
import { cn } from "@/lib/utils";
import { useUpdateCustomerProfile, useUploadCustomerAvatar } from "@/services/mutations/use-account";
import { useRef, useState } from "react";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import { ChangePassword } from "./change-password";
import { DeleteAccount } from "./delete-account";
import { EditCustomerProfile } from "./edit-customer-profile";
import { ChangeEmail } from "./change-email";

export const CustomerProfileContent = () => {
    const { user: userObj } = useUser()
    const user = userObj as CustomerProfileResponse;
    
    const [file, setFile] = useState<File>()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openPersonalModal, setOpenPersonalModal] = useState(false)
    const [openChangeEmailModal, setOpenChangeEmailModal] = useState(false)
    const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false)

    const { mutateAsync, isPending } = useUploadCustomerAvatar()
    const { mutate, isPending: isUpdating, variables } = useUpdateCustomerProfile()

    const handleClick = () => fileInputRef?.current?.click();

    const handleFileChange = async (files: FileList | null) => {
        if (!files) return

        const file = files[0];
        if (!file) return;

        const validImage = file.type.startsWith("image/") && file.size <= 2 * 1024 * 1024;
        if (!validImage) return;

        setFile(file)
        await mutateAsync(file)
    }

    const preview = file ? URL.createObjectURL(file) : ""
    return (
        <div className="flex flex-col gap-8">
            <h1 className="font-extrabold text-2xl font-sora">Profile</h1>
            <div className="grid items-start gap-8 lg:grid-cols-12">
                <div className="flex lg:flex-col items-center lg:items-start p-4 gap-3 lg:gap-5 rounded-xl bg-grey-dark-4 lg:col-span-3">
                    <div className="relative rounded-lg sm:rounded-2xl outline-1 outline-orange-2 overflow-hidden size-11 sm:size-23.5">
                        <Avatar className="size-11 sm:size-23.5 rounded-lg sm:rounded-2xl">
                            <AvatarImage src={user?.avatar || preview} className="rounded-lg sm:rounded-2xl" />
                            <AvatarFallback className={cn(isPending && "text-orange-5", "rounded-lg sm:rounded-2xl uppercase text-xl")}>{user?.full_name?.[0]?.[0]}{user?.full_name?.[1]?.[0]}</AvatarFallback>
                        </Avatar>
                        <button type="button" className="absolute grid place-content-center-safe size-3 bg-white rounded-full top-0.5 sm:top-2 right-0.5 sm:right-2" disabled={isPending} onClick={handleClick}>
                            <IconPencilSimple className="size-2 text-orange-2" />
                        </button>
                        <input ref={fileInputRef} type="file" onChange={(e) => handleFileChange(e.target.files)} hidden accept="image/png, image/jpeg" capture="environment" />
                        {
                            isPending && (
                                <div className="grid place-content-center absolute inset-0 bg-grey-dark-0/10">
                                    <Spinner className="size-5 text-grey-dark-0" />
                                </div>
                            )
                        }
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold text-grey-dark-0 text-base">{user?.full_name}</span>
                        <p className="font-medium text-grey-dark-2 text-sm capitalize">{user?.gender}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-6 lg:col-span-9">
                    <div className="flex flex-col sm:flex-row sm:justify-between p-5 gap-4 rounded-xl bg-grey-dark-4 w-full">
                        <div className="grid grid-cols-2 flex-1 gap-4">
                            <div className="flex flex-col">
                                <span className="text-2xs md:text-xs text-grey-dark-2">Email</span>
                                <div className="flex items-center gap-2">
                                    <p className="font-medium text-xs md:text-sm text-grey-dark-2">{user?.email}</p>
                                    <Button type="button" variant="tertiary" size="icon-xs" onClick={() => setOpenChangeEmailModal(true)}><IconPencilSimple /></Button>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xs md:text-xs text-grey-dark-2">Phone</span>
                                <p className="font-medium text-xs md:text-sm text-grey-dark-2">{formatPhoneNumberIntl(`+${user?.phone_number}` as string)}</p>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xs md:text-xs text-grey-dark-2">City</span>
                                <p className="font-medium text-xs md:text-sm text-grey-dark-2">{user?.city}</p>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xs md:text-xs text-grey-dark-2">State</span>
                                <p className="font-medium text-xs md:text-sm text-grey-dark-2">{user?.state}</p>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xs md:text-xs text-grey-dark-2">Postal Code</span>
                                <p className="font-medium text-xs md:text-sm text-grey-dark-2">{user?.zipcode}</p>
                            </div>
                        </div>
                        <Button type="button" variant="tertiary" size="smallest" className="w-fit" onClick={() => setOpenPersonalModal(true)}>
                            <IconPencilSimple />Edit
                        </Button>
                    </div>
                    <Card className="rounded-xl py-4 md:col-span-2">
                        <CardHeader className="px-4">
                            <CardTitle className="font-medium text-xs text-neu uppercase">Account Settings</CardTitle>
                            <CardDescription>Manage your account preferences</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-8 px-4">
                            <div className="flex flex-col gap-3">
                                <div className="grid gap-1">
                                    <span className="font-medium text-xs text-grey-dark-2">Notification Preferences</span>
                                    <p className="text-2xs text-grey-dark-3">Manage the kind of notifications you want to receive</p>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Checkbox
                                        id="order-updates"
                                        aria-label="Order Updates"
                                        checked={!!user?.alert_settings?.orders}
                                        disabled={isUpdating && !!variables.order_update}
                                        onCheckedChange={(value) => mutate({ order_update: !value ? "0" : "1" })}
                                    />
                                    <label htmlFor="order-updates" className="flex items-center font-medium gap-1 text-xs text-grey-dark-2">
                                        Order Updates
                                        {(isUpdating && !!variables.order_update) && (<Spinner />)}
                                    </label>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Checkbox
                                        id="promotions"
                                        aria-label="Promotions and offers"
                                        checked={!!user?.alert_settings?.promos}
                                        disabled={isUpdating && !!variables.promo_update}
                                        onCheckedChange={(value) => mutate({ promo_update: !value ? "0" : "1" })}
                                    />
                                    <label htmlFor="promotions" className="flex items-center font-medium gap-1 text-xs text-grey-dark-2">
                                        Promotions and offers
                                        {(isUpdating && !!variables.promo_update) && (<Spinner />)}
                                    </label>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <Checkbox
                                        id="platforms"
                                        aria-label="System announcement"
                                        checked={!!user?.alert_settings?.platforms}
                                        disabled={isUpdating && !!variables.platform_update}
                                        onCheckedChange={(value) => mutate({ platform_update: !value ? "0" : "1" })}
                                    />
                                    <label htmlFor="platforms" className="flex items-center font-medium gap-1 text-xs text-grey-dark-2">
                                        System announcement
                                        {(isUpdating && !!variables.platform_update) && (<Spinner />)}
                                    </label>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <span className="font-medium text-xs text-grey-dark-2">Reset Password</span>
                                    <p className="text-2xs text-grey-dark-3">This would reset your account login password</p>
                                </div>
                                <Button type="button" variant="tertiary" size="small" className="font-medium" onClick={() => setOpenChangePasswordModal(true)}>
                                    <IconLock className="size-4" /> Reset Password
                                </Button>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <span className="font-medium text-xs text-grey-dark-2">Delete Account</span>
                                    <p className="text-2xs text-grey-dark-3">This would remove your organisation details and irreversible.</p>
                                </div>
                                <Button type="button" variant="tertiary" size="small" className="font-medium" onClick={() => setOpenDeleteModal(true)}>
                                    <IconTrashSimple className="size-4" /> Delete Account
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <DeleteAccount open={openDeleteModal} setOpen={setOpenDeleteModal} />
            <ChangeEmail open={openChangeEmailModal} setOpen={setOpenChangeEmailModal} />
            <EditCustomerProfile open={openPersonalModal} setOpen={setOpenPersonalModal} />
            <ChangePassword open={openChangePasswordModal} setOpen={setOpenChangePasswordModal} />
        </div>
    )
}