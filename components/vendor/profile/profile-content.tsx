"use client";

import { useUser } from "@/context/use-user";
import { ProfileTabContent } from "./profile-tab-content";
import { SubscriptionTabContent } from "./subscription-tab-content";
import { IconCheckmark, IconPencilSimple } from "@/components/icons";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUploadVendorAvatar } from "@/services/mutations/use-account";
import { useRef, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

export const VendorProfileContent = () => {
    return (
        <div className="flex flex-col gap-8">
            <ProfileCard />
            <Tabs defaultValue="profile">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="subscription">Subscription</TabsTrigger>
                </TabsList>
                <TabsContent value="profile" className="grid md:grid-cols-2 gap-x-4 sm:gap-x-10 gap-y-4 sm:gap-y-8">
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
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<File>()
    const { mutateAsync, isPending } = useUploadVendorAvatar()

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
        <>
            <div className="flex items-start sm:items-center gap-3 sm:gap-5 p-4 bg-grey-dark-4 rounded-xl">
                <div className="flex flex-col sm:flex-row sm:items-center flex-1 gap-3 sm:gap-10">
                    <div className="flex items-center gap-3 sm:gap-5">
                        <div className="relative rounded-lg sm:rounded-2xl overflow-hidden">
                            <Avatar className="size-10 sm:size-23.5 outline-1 outline-orange-2 rounded-lg sm:rounded-2xl">
                                <AvatarImage src={user?.avatar || preview} className="rounded-lg sm:rounded-2xl" />
                                <AvatarFallback className={cn(isPending && "text-orange-5", "rounded-lg sm:rounded-2xl")}>{user?.first_name?.[0]}{user?.last_name?.[0]}</AvatarFallback>
                            </Avatar>
                            <button type="button" className="absolute grid place-content-center-safe size-3 bg-white rounded-full top-2 right-2" disabled={isPending} onClick={handleClick}>
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
                    </div>
                </div>
            </div>
        </>
    )
}