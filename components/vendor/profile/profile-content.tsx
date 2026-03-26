"use client";

import { useState } from "react";
import { useUser } from "@/context/use-user";
import { Button } from "@/components/ui/button";
import { EditVendorProfile } from "./edit-vendor-profile";
import { ProfileTabContent } from "./profile-tab-content";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import { SubscriptionTabContent } from "./subscription-tab-content";
import { IconCheckmark, IconPencilSimple } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const VendorProfileContent = () => {
    return (
        <div className="flex flex-col gap-8">
            <ProfileCard />
            <Tabs defaultValue="profile">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="subscription">Subscription</TabsTrigger>
                </TabsList>
                <TabsContent value="profile" className="grid sm:grid-cols-2 gap-x-4 sm:gap-x-10 gap-y-4 sm:gap-y-8">
                    <ProfileTabContent />
                </TabsContent>
                <TabsContent value="subscription" className="grid gap-6">
                    <SubscriptionTabContent />
                </TabsContent>
            </Tabs>
        </div>
    )
}

const ProfileCard = () => {
    const { user } = useUser()
    const [openModal, setOpenModal] = useState(false)
    return (
        <>
            <div className="flex items-start sm:items-center gap-3 sm:gap-5 p-4 bg-grey-dark-4 rounded-xl">
                <div className="flex flex-col sm:flex-row sm:items-center flex-1 gap-3 sm:gap-10">
                    <div className="flex items-center gap-3 sm:gap-5">
                        <Avatar className="size-10 sm:size-23.5 outline-1 outline-orange-2 rounded-lg sm:rounded-2xl">
                            <AvatarImage src={user?.avatar} className="rounded-lg sm:rounded-2xl" />
                            <AvatarFallback className="rounded-lg sm:rounded-2xl">{user?.first_name?.[0]}{user?.last_name?.[0]}</AvatarFallback>
                        </Avatar>
                        <div className="grid">
                            <h1 className="text-sm sm:text-2xl font-semibold sm:font-extrabold text-grey-dark-0">{user?.first_name} {user?.last_name}</h1>
                            <div className="flex items-center gap-1 bg-success-light text-xs text-success h-5 px-2 w-fit rounded-full">
                                <IconCheckmark />
                                <span className="line-clamp-1">ID Verified</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-10">
                        <div className="flex flex-col">
                            <span className="text-xs text-grey-dark-2">Email</span>
                            <p className="font-medium text-sm text-grey-dark-2">{user?.email}</p>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-grey-dark-2">Phone</span>
                            <p className="font-medium text-sm text-grey-dark-2">{formatPhoneNumberIntl(`+${user?.phone_number}` as string)}</p>
                        </div>
                    </div>
                </div>
                <Button type="button" variant="tertiary" size="smallest" onClick={() => setOpenModal(true)}><IconPencilSimple />Edit</Button>
            </div>
            <EditVendorProfile open={openModal} setOpen={setOpenModal} />
        </>
    )
}