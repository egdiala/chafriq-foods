"use client";

import Link from "next/link";
import { useState } from "react";
import { useUser } from "@/context/use-user";
import { Button } from "@/components/ui/button";
import { DeleteAccount } from "./delete-account";
import { IconLock } from "@/components/icons/icon-lock";
import { EditBusinessProfile } from "./edit-business-profile";
import { IconCheckmark, IconCopySimple, IconPencilSimple, IconTrashSimple } from "@/components/icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EditVendorProfile } from "./edit-vendor-profile";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import { useClipboard } from "@/hooks/use-clipboard";
import { AnimatePresence, motion } from "motion/react";
import { ChangePassword } from "./change-password";

export const ProfileTabContent = () => {
    const { user: userObj } = useUser()
    const user = userObj as VendorProfileResponse;
    
    const { isCopied, copyToClipboard } = useClipboard({})
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openBusinessModal, setOpenBusinessModal] = useState(false)
    const [openPersonalModal, setOpenPersonalModal] = useState(false)
    const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false)

    return (
        <>
            <Card className="rounded-xl py-4">
                <div className="flex items-center justify-between pr-4">
                    <CardHeader className="flex-1 px-4">
                        <CardTitle className="font-medium text-xs text-neu">PERSONAL PROFILE</CardTitle>
                        <CardDescription>Manage your personal details</CardDescription>
                    </CardHeader>
                    <Button type="button" variant="tertiary" size="smallest" onClick={() => setOpenPersonalModal(true)}>
                        <IconPencilSimple />Edit
                    </Button>
                </div>
                <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-grey-dark-2">Phone</span>
                        <p className="font-medium text-sm text-grey-dark-2">{formatPhoneNumberIntl(`+${user?.phone_number}` as string)}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-grey-dark-2">Gender</span>
                        <p className="font-medium text-sm text-grey-dark-2 capitalize">{user?.gender}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-grey-dark-2">Years of Experience</span>
                        <p className="font-medium text-sm text-grey-dark-2">{user?.year_exp}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-grey-dark-2">State</span>
                        <p className="font-medium text-sm text-grey-dark-2">{user?.home_state}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-grey-dark-2">City</span>
                        <p className="font-medium text-sm text-grey-dark-2">{user?.home_city}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-grey-dark-2">Zip Code</span>
                        <p className="font-medium text-sm text-grey-dark-2">{user?.home_zip}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-grey-dark-2">Address</span>
                        <p className="font-medium text-sm text-grey-dark-2">{user?.home_address}</p>
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-xl py-4">
                <div className="flex items-center justify-between pr-4">
                    <CardHeader className="flex-1 px-4">
                        <CardTitle className="font-medium text-xs text-neu">BUSINESS PROFILE</CardTitle>
                        <CardDescription>Manage your business parameters</CardDescription>
                    </CardHeader>
                    <Button type="button" variant="tertiary" size="smallest" onClick={() => setOpenBusinessModal(true)}>
                        <IconPencilSimple />Edit
                    </Button>
                </div>
                <CardContent className="grid lg:grid-cols-2 gap-4 px-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-grey-dark-2">Username</span>
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="font-medium text-sm text-grey-dark-2">{user?.business_username || "-"}</span>
                            <div className="flex items-center gap-2">
                                <Link href={!user?.business_username ? "#" : `/cooks/${user?.business_username}`} className="text-xs underline text-orange-2">
                                    https://chafriq.com/cooks/{user?.business_username || "[your-username]"}
                                </Link>
                                <button
                                    type="button" className="disabled:cursor-not-allowed"
                                    disabled={!user?.business_username} onClick={() => copyToClipboard(`https://chafriq.com/cooks/${user?.business_username}`)}
                                >
                                    <AnimatePresence mode="wait" initial={false}>
                                        {isCopied ? (
                                            <motion.span
                                                key="checkmark"
                                                variants={variants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden"
                                                className="grid place-content-center"
                                            >
                                                <IconCheckmark className="size-4 text-orange-2" />
                                            </motion.span>
                                        ) : (
                                            <motion.span
                                                key="copy"
                                                variants={variants}
                                                initial="hidden"
                                                animate="visible"
                                                exit="hidden"
                                                className="grid place-content-center"
                                            >
                                                <IconCopySimple className="size-4 text-orange-2" />
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-grey-dark-2">Business Name</span>
                        <p className="font-medium text-sm text-grey-dark-2">{user?.business_name}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-grey-dark-2">Business Address</span>
                        <p className="font-medium text-sm text-grey-dark-2">{user?.business_address}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-grey-dark-2">Order Distance</span>
                        <p className="font-medium text-sm text-grey-dark-2">{user?.order_distance || "0"}km</p>
                    </div>
                    <div className="flex flex-col gap-1 lg:col-span-2">
                        <span className="text-xs text-grey-dark-2">Type of Cuisine</span>
                        <div className="flex items-center gap-3.5 flex-wrap">
                        {
                            user?.dish_data.map((dish) => (
                                <span key={dish.dish_type_id} className="h-5 flex items-center justify-center px-2 text-amber text-xs bg-amber-light rounded">
                                    {dish.name}
                                </span>
                            ))
                        }
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* <Card className="rounded-xl py-4">
                <div className="flex items-center justify-between pr-4">
                    <CardHeader className="flex-1 px-4">
                        <CardTitle className="font-medium text-xs text-neu">ORDER SETTINGS</CardTitle>
                        <CardDescription>Manage your order preferences</CardDescription>
                    </CardHeader>
                    <Button type="button" variant="tertiary" size="smallest" onClick={() => setOpenEditOrderModal(true)}>
                        <IconPencilSimple />Edit
                    </Button>
                </div>
                <CardContent className="grid gap-6 px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <span className="font-medium text-xs text-grey-dark-2">Order Distance</span>
                            <p className="text-2xs text-grey-dark-3">Set how far in distance a customer can request for service. Up to 100 km</p>
                        </div>
                        <span className="font-medium text-xs text-grey-dark-2">{user?.order_distance || "0"}km</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <span className="font-medium text-xs text-grey-dark-2">Auto accept Orders</span>
                            <p className="text-2xs text-grey-dark-3">The system would auto accept orders when requested by a customer</p>
                        </div>
                        <Button size="default" variant="secondary" className="font-medium text-sm rounded-lg after:bg-orange-5 hover:text-orange-2" asChild>
                            <div>
                                Enabled
                                <Switch />
                            </div>
                        </Button>
                    </div>
                </CardContent>
            </Card> */}

            <Card className="rounded-xl py-4 md:col-span-2">
                <CardHeader className="px-4">
                    <CardTitle className="font-medium text-xs text-neu uppercase">Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <span className="font-medium text-xs text-grey-dark-2">Reset Password</span>
                            <p className="text-2xs text-grey-dark-3">This would reset your account login password</p>
                        </div>
                        <Button type="button" variant="tertiary" size="small" className="font-medium" onClick={() => setOpenChangePasswordModal(true)}>
                            <IconLock className="size-4" /> Reset Password
                        </Button>
                    </div>
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

            <ChangePassword open={openChangePasswordModal} setOpen={setOpenChangePasswordModal} />
            <DeleteAccount open={openDeleteModal} setOpen={setOpenDeleteModal} />
            <EditVendorProfile open={openPersonalModal} setOpen={setOpenPersonalModal} />
            <EditBusinessProfile open={openBusinessModal} setOpen={setOpenBusinessModal} />
        </>
    )
}

const variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};