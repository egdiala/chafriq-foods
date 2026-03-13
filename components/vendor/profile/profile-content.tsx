"use client";

import { Button } from "@/components/ui/button"
import { IconCheckmark, IconPencilSimple } from "@/components/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EditProfileContent } from "./edit-profile-content"
import { useState } from "react";

export const VendorProfileContent = () => {
    return (
        <div className="flex flex-col gap-8">
            <ProfileCard />
            <Tabs defaultValue="profile">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="subscription">Subscription</TabsTrigger>
                </TabsList>
                <TabsContent value="profile" className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,420px))]">
                    {
                        Array.from({ length: 6 }).map((_order, index) => (
                            <ProfileCard key={index} />
                        ))
                    }
                </TabsContent>
                <TabsContent value="subscription" className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,420px))]">
                    {
                        Array.from({ length: 10 }).map((_order, index) => (
                            <ProfileCard key={index} />
                        ))
                    }
                </TabsContent>
            </Tabs>
        </div>
    )
}

const ProfileCard = () => {
    const [openModal, setOpenModal] = useState(false)
    return (
        <>
            <div className="flex items-start sm:items-center gap-3 sm:gap-5 p-4 bg-grey-dark-4 rounded-xl">
                <div className="flex flex-col sm:flex-row sm:items-center flex-1 gap-3 sm:gap-10">
                    <div className="flex items-center gap-3 sm:gap-5">
                        <Avatar className="size-23.5 outline-1 outline-orange-2 rounded-2xl">
                            <AvatarImage src="/quality-2.webp" className="rounded-2xl" />
                            <AvatarFallback>SD</AvatarFallback>
                        </Avatar>
                        <div className="grid">
                            <h1 className="text-2xl font-extrabold text-grey-dark-0">Tunji Adams</h1>
                            <div className="flex items-center gap-1 bg-success-light text-xs text-success h-5 px-2 w-fit rounded-full">
                                <IconCheckmark />
                                ID Verified
                            </div>
                        </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-10">
                        <div className="flex flex-col">
                            <span className="text-xs text-grey-dark-2">Email</span>
                            <p className="font-medium text-sm text-grey-dark-2">example@email.com</p>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-grey-dark-2">Phone</span>
                            <p className="font-medium text-sm text-grey-dark-2">+234 801 234 5678</p>
                        </div>
                    </div>
                </div>
                <Button type="button" variant="tertiary" size="smallest" onClick={() => setOpenModal(true)}><IconPencilSimple />Edit</Button>
            </div>
            <EditProfileContent open={openModal} setOpen={setOpenModal} />
        </>
    )
}