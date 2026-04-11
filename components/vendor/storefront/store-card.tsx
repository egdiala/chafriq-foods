"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useUser } from "@/context/use-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconMapPinLine, IconPencilSimple, IconStarFull } from "@/components/icons";
import { useRef, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useUploadBusinessLogo } from "@/services/mutations/use-account";
import { KycStatusBadge } from "../kyc-status-badge";


type Props = {
    className?: string;
}

export const StoreCard = ({ className }: Props) => {
    const { user: userObj } = useUser()
    const user = userObj as VendorProfileResponse;
    
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<File>()
    const { mutateAsync, isPending } = useUploadBusinessLogo()

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
        <div className={cn("rounded-2xl bg-white border border-outline overflow-hidden", className)}>
            <div className="hidden sm:block relative bg-orange-5 h-46">
                <Image src="/food-doodles.svg" alt="food-doodles" className="object-cover object-center" fill />
            </div>
            <div className="grid gap-3 px-3 sm:px-5 py-3 sm:py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex sm:flex-col items-start gap-2.5">
                        <div className="relative rounded-2xl sm:rounded-lg sm:outline-2 sm:outline-white overflow-hidden sm:-mt-18">
                            <Avatar className="size-14 sm:size-24.5 rounded-2xl sm:rounded-lg">
                                <AvatarImage src={user?.business_logo || preview} className="rounded-2xl sm:rounded-lg" />
                                <AvatarFallback className="rounded-2xl sm:rounded-lg">
                                    {user?.business_name.split(" ").map((char) => char?.[0]).join("").substring(0, 2)}
                                </AvatarFallback>
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
                        <div className="space-y-1">
                            <h1 className="text-sm sm:text-2xl font-semibold sm:font-extrabold text-grey-dark-0">{user?.business_name}</h1>
                            <KycStatusBadge status={user?.kyc_status} />
                            <div className="sm:hidden flex items-center gap-2 text-sm text-grey-dark-2 [&>svg]:text-yellow-2"><IconStarFull /> {user?.rating?.toFixed(1) || 0}</div>
                        </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 text-sm text-grey-dark-2 [&>svg]:text-yellow-2"><IconStarFull /> {user?.rating?.toFixed(1) || 0}</div>
                </div>
                <div className="flex items-center gap-3.5 flex-wrap">
                {
                    user?.dish_data.map((dish) => (
                        <span key={dish?.dish_type_id} className="h-4.5 flex items-center justify-center px-1 text-amber text-xs bg-amber-light rounded">{dish?.name}</span>
                    ))
                }
                </div>
                <div className="flex items-center gap-1 text-xs text-grey-dark-2 [&>svg]:size-3.5 [&>svg]:text-orange-2">
                    <IconMapPinLine />
                    {user?.business_address}
                </div>
            </div>
        </div>
    )
}