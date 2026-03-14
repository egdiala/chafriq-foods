"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DeleteAccount } from "./delete-account";
import { IconLock } from "@/components/icons/icon-lock";
import { EditOrderSettings } from "./edit-order-settings";
import { EditBusinessProfile } from "./edit-business-profile";
import { IconCopySimple, IconPencilSimple, IconTrashSimple } from "@/components/icons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const ProfileTabContent = () => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openBusinessModal, setOpenBusinessModal] = useState(false)
    const [openEditOrderModal, setOpenEditOrderModal] = useState(false)

    return (
        <>
            <Card className="sm:col-span-2 rounded-xl py-4">
                <div className="flex items-center justify-between pr-4">
                    <CardHeader className="flex-1 px-4">
                        <CardTitle className="font-medium text-xs text-neu">BUSINESS PROFILE</CardTitle>
                        <CardDescription>Manage your business parameters</CardDescription>
                    </CardHeader>
                    <Button type="button" variant="tertiary" size="smallest" onClick={() => setOpenBusinessModal(true)}>
                        <IconPencilSimple />Edit
                    </Button>
                </div>
                <CardContent className="grid sm:grid-cols-2 gap-4 px-4">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-grey-dark-2">Username</span>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="font-medium text-sm text-grey-dark-2">Increase</span>
                                <div className="flex items-center gap-2">
                                    <Link href="#" className="text-xs underline text-orange-2">https://chatfriq.com/cooks/[your-username]</Link>
                                    <IconCopySimple className="text-orange-2" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-grey-dark-2">Business Name</span>
                            <p className="font-medium text-sm text-grey-dark-2">African Jollof Kitchen</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-grey-dark-2">Business Address</span>
                            <p className="font-medium text-sm text-grey-dark-2">77 Maple Ave. Austin, Texas 73301</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-grey-dark-2">Type of Cuisine</span>
                            <div className="flex items-center gap-3.5 flex-wrap">
                            {
                                Array.from({ length: 3 }).map((_, index) => (
                                    <span key={index} className="h-5 flex items-center justify-center px-2 text-amber text-xs bg-amber-light rounded">Cuisine Type {index + 1}</span>
                                ))
                            }
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-xl py-4">
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
                            <p className="text-[0.625rem] text-grey-dark-3">Set how far in distance a customer can request for service. Up to 100 km</p>
                        </div>
                        <span className="font-medium text-xs text-grey-dark-2">50km</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <span className="font-medium text-xs text-grey-dark-2">Auto accept Orders</span>
                            <p className="text-[0.625rem] text-grey-dark-3">The system would auto accept orders when requested by a customer</p>
                        </div>
                        <Button size="default" variant="secondary" className="font-medium text-sm rounded-lg after:bg-orange-5 hover:text-orange-2" asChild>
                            <div>
                                Enabled
                                <Switch />
                            </div>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-xl py-4">
                <CardHeader className="px-4">
                    <CardTitle className="font-medium text-xs text-neu uppercase">Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <span className="font-medium text-xs text-grey-dark-2">Reset Password</span>
                            <p className="text-[0.625rem] text-grey-dark-3">This would reset your account login password</p>
                        </div>
                        <Button type="button" variant="tertiary" size="small" className="font-medium" onClick={() => setOpenDeleteModal(true)}>
                            <IconLock className="size-4" /> Reset Password
                        </Button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <span className="font-medium text-xs text-grey-dark-2">Delete Account</span>
                            <p className="text-[0.625rem] text-grey-dark-3">This would remove your organisation details and irreversible.</p>
                        </div>
                        <Button type="button" variant="tertiary" size="small" className="font-medium" onClick={() => setOpenDeleteModal(true)}>
                            <IconTrashSimple className="size-4" /> Delete Account
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <DeleteAccount open={openDeleteModal} setOpen={setOpenDeleteModal} />
            <EditOrderSettings open={openEditOrderModal} setOpen={setOpenEditOrderModal} />
            <EditBusinessProfile open={openBusinessModal} setOpen={setOpenBusinessModal} />
        </>
    )
}